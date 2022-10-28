import pandas as pd
import re

# df = pd.read_csv("resources/courses.csv", usecols=range(0, 26))

def get_first_digit(s):
    for _, c in enumerate(str(s)):
        if c.isdigit(): return int(c)

def df_search(search_term=None, df=None,
              min_course_level=None, max_course_level=None,
              faculty=None, department=None, major=None, minor=None):
    
    courses = pd.DataFrame()
    
    #Does the search term have any course codes?
    codes = re.findall('[a-zA-Z]{3}\d{3}[hH]?\d?', search_term)
    if codes:
        for code in codes:
            courses = courses.append(
                df[df['Code'].str.contains(code, case=False, na=False)]
            )
    
    #Now try keywords
    keywords = re.split('\s+', search_term)
    if keywords:
        for keyword in keywords:
            courses = courses.append(
                df[(df['Name'].str.contains(keyword, case=False, na=False)) | \
                    (df['Course Description'].str.contains(keyword, case=False, na=False))]
            )
    #now only keep courses that satisfy filters
    if min_course_level or max_course_level:
        courses['level'] = get_first_digit(courses['Code'])

    if min_course_level:
        courses = courses[courses['level']>=min_course_level]
    
    if max_course_level:
        courses = courses[courses['level']<=max_course_level]
        
    if faculty:
        courses = courses[courses['Division'].str.contains(faculty, case=False, na=False)]
        
    if department:
        courses = courses[courses['Department'].str.contains(department, case=False, na=False)]

    if major:
        courses = courses[courses['MajorsOutcomes'].str.contains(major, case=False, na=False)]

    if minor:
        courses = courses[courses['MinorsOutcomes'].str.contains(minor, case=False, na=False)]
        
    return courses