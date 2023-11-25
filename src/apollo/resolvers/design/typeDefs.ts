import { gql } from 'apollo-server-express';    

export const designTypeDefs = gql`

type Designer {
    _id: ID!
    fullName: String!
    email: String!
    avatar: String!
    username: String!
    followers: Int!
    following: Int!
}

type User {
    _id: ID!
    fullName: String!
    email: String!
    avatar: String!
    username: String!
    followers: Int!
    following: Int!
}

type Design {
    _id: ID!
    designer: ID!
    preview: String!
    views: Int!
    saves: Int!
    description: String!
    designSubscription: String!
    designFiles: [String!]!
    createdAt: String!
    tags: [String!]!
    category: String!
}


type AllDesigns {
    _id: ID!
    designer: Designer!
    preview: String!
    views: Int!
    saves: Int!
    description: String!
    designSubscription: String!
    designFiles: [String!]!
    createdAt: String!
    tags: [String!]!
    category: String!
}

type Comment {
    _id: ID!
    comment: String!
    commentedBy: User!
    commentedAt: String!
    designId: String!
}

input CreateDesignInput {
    preview: String!
    description: String!
    designSubscription: String!
    designFiles: [String!]!
    tags: [String!]!
    category: String!
}

type Query {
    getAllDesigns: [AllDesigns!]!
    getUserDesigns(userId: String): [AllDesigns!]!
}

type Mutation {
    createDesign(createDesignInput: CreateDesignInput): Design!
    createComment(designId: String!, comment: String!): Comment!
}

type Subscription {
    newComment(designId: ID!): Comment!
}

`;
