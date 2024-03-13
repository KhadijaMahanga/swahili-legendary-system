const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Course {
        _id: String!
        title: String!
        description: String!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: String!
        firstName: String!
        lastName: String!
        email: String!
        role: Role
        createdAt: String!
        updatedAt: String!
    }

    type Enrolment {
        _id: ID!
        user: User!
        course: Course!
        createdAt: String!
        updatedAt: String!
    }

    enum Role {
        STUDENT
        INSTRUCTOR
        ADMIN
    }

    type RootQuery {
        courses: [Course!]!
        users: [User!]!
        enrolments: [Enrolment!]!
    }

    type RootMutation {
        createCourse(course: CourseInput): Course
        createUser(user: UserInput): User
        enroll(userId: ID!, courseId: ID!): Enrolment 
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);