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
    subscription: String!
    verified: Boolean!
  }

  type ClientUser {
    _id: ID!
    fullName: String!
    email: String!
    avatar: String!
    username: String!
    available: Boolean!
    subscription: String!
    verified: Boolean!
}

  type LoginUser {
    user: User!
    token: String!
  }

  type GetMeUser {
    user: User!
  }

  type Follow {
    followedBy: ID!
    followedUser: ID!
    followedAt: String!
  }

  type UserFollow {
    _id: ID!
    fullName: String!
    email: String!
    avatar: String!
    username: String!
    available: Boolean!
  }

  type Followers {
    followedBy: UserFollow!
    followedUser: ID!
    followedAt: String!
  }

  type FollowerCount {
    data: [Followers!]!
    numberOfFollowers: Int!
  }

  type Following {
    followedBy: ID!
    followedUser: UserFollow!
    followedAt: String!
  }

type FollowingCount {
    data: [Following!]!
    followingCount: Int!
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
    getFollowers(userId: ID!): FollowerCount!
    getFollowing(userId: ID!): FollowingCount!
    getUserByUsername(username: String!): ClientUser!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): LoginUser!
    follow(followedUser: ID!): Follow!
    unfollow(followedUser: ID!): Follow!
    becomeCreator: User!
    becomePremiumUser: User!
    verifyUser(userId: ID!): User!
  }
`;
