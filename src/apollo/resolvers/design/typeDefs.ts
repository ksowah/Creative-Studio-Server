import { gql } from 'apollo-server-express';    

export const designTypeDefs = gql`

type Designer {
    _id: ID!
    fullName: String!
    email: String!
    avatar: String!
    username: String!
}

type DesignUser {
    _id: ID!
    fullName: String!
    email: String!
    avatar: String!
    username: String!
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
    commentedBy: ID!
    commentedAt: String!
    designId: String!
}

type UserComment {
    _id: ID!
    comment: String!
    commentedBy: DesignUser!
    commentedAt: String!
    designId: String!
}

type Like {
    _id: ID!
    designId: ID!
    likedBy: ID!
    likedAt: String!
}

type UserLike {
    _id: ID!
    designId: ID!
    likedBy: DesignUser!
    likedAt: String!
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
    likeDesign(designId: String!): Like!
}

type Subscription {
    newComment(designId: ID!): UserComment!
    newLike(designId: ID!): UserLike!
}

`;
