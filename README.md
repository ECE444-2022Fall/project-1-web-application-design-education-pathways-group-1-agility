# ECE444 F2022 Project 1: Education Pathways
### App is deployed here: https://agility-education-pathways-app.herokuapp.com/
### User Guide: https://www.youtube.com/watch?v=433Gg5AhhAE
Authors: Group 1 (Team Agility)
<br />Nissar Ishtiak - https://github.com/ishtiakn
<br />Andrew Kim - https://github.com/AndrewMinyoungKim
<br />Abdullah A. Mohammed - https://github.com/abdullah578
<br />Chuanyang Qiao - https://github.com/FrankQQQQ
<br />Gaurav Ranganath - https://github.com/gauravranganath
<br /><br />
This respository started off as a clone of https://github.com/ECE444-2022Fall/Assignment_1_starter_template.
<br /><br />
We are using JIRA to manage this project: https://ece444-f2022-group1-project1.atlassian.net/jira/software/c/projects/EP/issues
## Technologies Used
Node.js, React for frontend, Express.js for backend, Mongodb for database, and Heroku cloud platform for deployment

-----
## Unit Test Functions:
Nissar Ishtiak ~ https://github.com/ECE444-2022Fall/project-1-web-application-design-education-pathways-group-1-agility/blob/main/Education_Pathways/backend/tests/course.test.js#L308-L327
<br />Andrew Kim ~ https://github.com/ECE444-2022Fall/project-1-web-application-design-education-pathways-group-1-agility/blob/85a73c5f01fee9f25d1426a8e58d659b7d6a77fb/Education_Pathways/backend/tests/course.test.js#L286-L306
<br />Abdullah A. Mohammed ~ https://github.com/ECE444-2022Fall/project-1-web-application-design-education-pathways-group-1-agility/blob/8d3788635671f944d130a1c4712f28611dfa5de6/Education_Pathways/backend/tests/course.test.js#L79-L280
<br />Chuanyang Qiao ~
<br />Gaurav Ranganath ~ https://github.com/ECE444-2022Fall/project-1-web-application-design-education-pathways-group-1-agility/blob/main/Education_Pathways/frontend/src/components/CourseDescription.test.js#L1-L134

# Pros and Cons of TDD - Gaurav Ranganath
Pros
<br/><br/>
Modular Design: TDD requires a developer to think about their code in small modular components. This is a direct result of TDD’s philosophy that requires developers to write the minimum amount of code required to pass a test case. Since code is built to be easily testable, this likely means that its interface is flexible enough to be used throughout the application wherever it is needed.
<br/><br/>
High Test Coverage: Since developers are only allowed to write code that passes previously written test cases, the application should have extremely high test coverage. In other words, every function of the application should be tested if TDD is consistently followed by all members of the team.
<br/><br/>
Easier to Refactor: If a codebase that was written using TDD ever needs to be refactored, developers do not need to worry about previously written code malfunctioning. This is extremely important as software projects are often built in large groups and developers new to the codebase do not need to worry about previous contributions interfering with their work.
<br/><br/>
Cons
<br/><br/>
Slow Process: Developers may find it tedious and time consuming to write features that are straightforward and do not need to be thoroughly tested. Therefore, the time consuming nature of TDD may not be feasible in situations where developers have short deadlines and development speed is a priority.
<br/><br/>
Tests Need to Be Maintained: There may be cases in a software project where requirements change abruptly. In order to change a feature, a developer has to first rewrite or refactor all of the affected test cases. This can take a long time to do and previous development time to write the initial tests may be considered wasted.
<br/><br/>
Tests May Introduce Bugs: Test cases are written to check for expected behaviour of production software. However, in TDD, if a developer misunderstands or incorrectly writes a test with faulty behaviour, this changes the production code that is written to pass the aforementioned test. This means that a developer needs to understand and ensure their tests are correct to prevent introducing bugs that pass their test cases. 
