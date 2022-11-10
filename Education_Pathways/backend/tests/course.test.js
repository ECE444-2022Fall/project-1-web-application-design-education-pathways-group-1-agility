const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../src/app.js");
const Course = require("../src/models/courses.js");
const User = require("../src/models/users");

const course1 = {
  Code: "ECE344H1",
  Name: "Operating Systems",
  Faculty: "Faculty1",
  Department: "Department1",
  "Course Description":
    "Operating system structures, concurrency, synchronization, deadlock, CPU scheduling, memory management, file systems. The laboratory exercises will require implementation of part of an operating system.",
  "Pre-requisites": ["ECE243H1", "ECE244H1"],
  "Course Level": 3,
  Campus: "Campus1",
  Term: ["2021 Fall", "2022 Winter"],
  Exclusion: [],
  Corequisite: [],
  "Recommended Preparation": [],
  MajorsOutcomes: [],
  MinorsOutcomes: [],
};

const course2 = {
  Code: "ARC399Y1",
  Name: "Research Opportunity Program",
  Faculty: "Faculty1",
  Department: "Department2",
  "Course Description":
    "An opportunity for degree students in their third year in the John H. Daniels Faculty of Architecture, Landscape, and Design to work on the research project of a professor in return for 399Y1 course credit.",
  "Pre-requisites": [],
  "Course Level": 2,
  Campus: "Campus1",
  Term: ["2020 Fall", "2021 Fall", "2021 Summer Y", "2020 Fall", "2021 Fall"],
  Exclusion: [],
  Corequisite: [],
  "Recommended Preparation": [],
  MajorsOutcomes: [],
  MinorsOutcomes: [],
};

const course3 = {
  Code: "ARC354Y1",
  Name: "Research Opportunity Program",
  Faculty: "Faculty2",
  Department: "Department2",
  "Course Description":
    "An opportunity for degree students in their third year in the John H. Daniels Faculty of Architecture, Landscape, and Design to work on the research project of a professor in return for 399Y1 course credit.",
  "Pre-requisites": [],
  "Course Level": 4,
  Campus: "Campus2",
  Term: ["2020 Fall", "2021 Fall", "2021 Summer Y", "2020 Fall", "2021 Fall"],
  Exclusion: [],
  Corequisite: [],
  "Recommended Preparation": [],
  MajorsOutcomes: [],
  MinorsOutcomes: [],
};

const testAdmin = {
  email: "test.admin@gmail.com",
  password: "testadminpassword",
};

beforeAll(async () => {
  await Course.deleteMany();
  await User.deleteMany();
  await new Course(course1).save();
  await new Course(course2).save();
  await new Course(course3).save();
  const user = {...testAdmin}
  user.password = await bcrypt.hash(user.password, 8);
  await new User(user).save();
});

test("Should test if user login works", async () => {
  const response = await request(app)
    .post("/users/login")
    .send(testAdmin)
    .expect(200);
  expect(response.body.token).not.toBeUndefined();
});

test("Should not login user with invalid credentials", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({ email: testAdmin.email, password: "Wrong password" })
    .expect(401);
  expect(response.body.token).toBeUndefined();
});

test("Should get all the courses", async () => {
  const response = await request(app).get("/courses").expect(200);
  expect(response.body.length).toBe(3);
  expect(response.body).toMatchObject([course1, course2, course3]);
});

// check if search by code works
test("Should get correct course by code", async () => {
  const response = await request(app).get("/courses?search=ece344").expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]).toMatchObject(course1);
});

test("Should get correct course by partial code match", async () => {
  const response = await request(app).get("/courses?search=ece").expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]).toMatchObject(course1);
});

//check if search by description term works
test("Should get correct course by description", async () => {
  const response = await request(app)
    .get("/courses?search=concurrency")
    .expect(200);
  expect(response.body[0]).toMatchObject(course1);
});

test("Should get multiple courses that match the description regex", async () => {
  const response = await request(app)
    .get("/courses?search=opportunity")
    .expect(200);
  expect(response.body.length).toBe(2);
  expect(response.body).toMatchObject([course2, course3]);
});

//check if search by faculty works
test("Should get correct course by faculty", async () => {
  const response = await request(app)
    .get("/courses?faculty=Faculty1")
    .expect(200);
  expect(response.body.length).toBe(2);
  expect(response.body).toMatchObject([course1, course2]);
});

test("Should return no course if faculty dosent exist", async () => {
  await request(app).get("/courses?faculty=Faculty3").expect(404);
});

//check if search by department works
test("Should get correct course by department", async () => {
  const response = await request(app)
    .get("/courses?department=Department2")
    .expect(200);
  expect(response.body.length).toBe(2);
  expect(response.body).toMatchObject([course2, course3]);
});

test("Should return no course if department dosent exist", async () => {
  await request(app).get("/courses?department=Department3").expect(404);
});

//check if search by campus works
test("Should get correct course by campus", async () => {
  const response = await request(app)
    .get("/courses?campus=Campus1")
    .expect(200);
  expect(response.body.length).toBe(2);
  expect(response.body).toMatchObject([course1, course2]);
});

test("Should return no course if campus dosent exist", async () => {
  await request(app).get("/courses?campus=Campus3").expect(404);
});

//check if search by faculty and department works
test("Should get correct course by faculty and department", async () => {
  const response = await request(app)
    .get("/courses?department=Department2&faculty=Faculty1")
    .expect(200);
  expect(response.body[0]).toMatchObject(course2);
});

//check if search by department and campus works
test("Should get correct course by campus and department", async () => {
  const response = await request(app)
    .get("/courses?campus=Campus1&department=Department2")
    .expect(200);
  expect(response.body[0]).toMatchObject(course2);
});

//check if search by faculty / campus / department / search works
test("Should get correct course by faculty , department , campus , search ", async () => {
  const response = await request(app)
    .get(
      "/courses?campus=Campus1&department=Department1&faculty=Faculty1&search=ece"
    )
    .expect(200);
  expect(response.body[0]).toMatchObject(course1);
});

test("Should get no course for no match", async () => {
  const response = await request(app)
    .get(
      "/courses?campus=Campus1&department=Department1&faculty=Faculty2&search=ece"
    )
    .expect(404);
});

test("Should get no course for no match", async () => {
  const response = await request(app)
    .get(
      "/courses?campus=Campus1&department=Department2&faculty=Faculty1&search=ece"
    )
    .expect(404);
});

test("Should get no course for no match", async () => {
  const response = await request(app)
    .get(
      "/courses?campus=Campus2&department=Department1&faculty=Faculty1&search=ece"
    )
    .expect(404);
});

test("Should get no course for no match", async () => {
  const response = await request(app)
    .get(
      "/courses?campus=Campus1&department=Department1&faculty=Faculty1&search=arc"
    )
    .expect(404);
});

// check if search by min / max course level works
test("Should get correct course for min level", async () => {
  const response = await request(app).get("/courses?minLevel=3").expect(200);
  expect(response.body.length).toBe(2);
  expect(response.body).toMatchObject([course1, course3]);
});

test("Should get correct course for max level", async () => {
  const response = await request(app).get("/courses?maxLevel=3").expect(200);
  expect(response.body.length).toBe(2);
  expect(response.body).toMatchObject([course1, course2]);
});

test("Should get correct course for min and max level", async () => {
  const response = await request(app)
    .get("/courses?minLevel=3&maxLevel=3")
    .expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]).toMatchObject(course1);
});

// check if search by all criteria works
test("Should get correct course by all criteria ", async () => {
  const response = await request(app)
    .get(
      "/courses?campus=Campus1&department=Department1&faculty=Faculty1&search=ece&minLevel=3&maxLevel=4"
    )
    .expect(200);
  expect(response.body[0]).toMatchObject(course1);
});

test("Should get no course if no match for all criteria ", async () => {
  const response = await request(app)
    .get(
      "/courses?campus=Campus1&department=Department1&faculty=Faculty1&search=ece&minLevel=4"
    )
    .expect(404);
});
