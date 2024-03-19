const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Course {
        _id: String!
        title: String!
        index: Int!
        description: String!
        videoLink: String! 
    } 

    input CourseInput {
        title: String!
        index: Int!
        description: String!
        videoLink: String! 
    }

    type User {
        _id: String!
        name: String!
        firstName: String!
        lastName: String!
        email: String!
        status: Boolean!
        role: Role
    }

    type Enrolment {
        _id: ID!
        user: User!
        course: Course!
    }

    enum Role {
        STUDENT
        INSTRUCTOR
        ADMIN
    }

    enum Status {
        ACTIVE
        INACTIVE
        ARCHIVED
    }

    type Query {
        courses: [Course!]!
        course(id: ID!): Course
        searchCourses(keyword: String!): [Book!]! 
        users: [User!]!
        user(id: ID!): User
        enrolments: [Enrolment!]!
    }

    type Mutation {
        createCourse(input: CourseInput): Course
        deleteCourse(id: ID!): Boolean
        updateCourse(id: ID!, input: CourseInput): Course
        updateCourse(id: ID!, input: CourseInput): Course
        updateCourse(id: ID!, input: CourseInput): Course
        createUser(input: UserInput): User
        enroll(userId: ID!, courseId: ID!): Enrolment 
        unenroll(userId: ID!, courseId: ID!): Boolean
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);