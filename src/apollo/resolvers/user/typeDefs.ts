import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    fullName: String!
    email: String!
    avatar: String!
    password: String!
    authType: String!
    userType: String!
    username: String!
    available: Boolean!
  }

  type LoginUser {
    user: User!
    token: String!
  }

  type GetMeUser {
    user: User!
  }

  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
    avatar: String
    username: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getMe: GetMeUser
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): LoginUser!
  }
`;
