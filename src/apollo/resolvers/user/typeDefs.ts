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
    available: Boolean!
    subscription: String!
    verified: Boolean!
    bio: String
    username: String
    specialization: String
    phoneNumber: String
    website: String
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

  type EditProfileUser {
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

  type DeliveryAddress {
    _id: ID!
    user: ID!
    city: String!
    street: String!
    postalCode: String!
    houseNumber: String!
    telephone: String!
  }

  type Notification {
    _id: ID!
    user: ID!
    notificationType: String!
    summary: String!
    artWorks: [String]
  }

  input AddressInput {
    city: String!
    street: String!
    postalCode: String!
    houseNumber: String!
    telephone: String!
  }

  input RegisterInput {
    fullName: String!
    email: String!
    password: String!
    avatar: String
    username: String!
  }

  input EditProfileInput {
    fullName: String!
    avatar: String
    bio: String
    specialization: String
    phoneNumber: String
    website: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getMe: GetMeUser
    getFollowers(userId: ID!): FollowerCount!
    getFollowing(userId: ID!): FollowingCount!
    getUserByUsername(username: String!): User!
    getDeliveryAddress(userId: ID!): DeliveryAddress!
    getNotifications: [Notification!]!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    editProfile(editProfileInput: EditProfileInput): EditProfileUser!
    login(loginInput: LoginInput): LoginUser!
    follow(followedUser: ID!): Follow!
    unfollow(followedUser: ID!): Follow!
    becomeCreator: User!
    becomePremiumUser: User!
    verifyUser(userId: ID!): User!
    addDeliveryAddress(addressInput: AddressInput): DeliveryAddress!
  }
`;
