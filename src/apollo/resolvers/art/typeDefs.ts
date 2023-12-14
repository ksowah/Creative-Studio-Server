import { gql } from "apollo-server-express";

export const artTypeDefs = gql`
  input ArtInput {
    title: String!
    description: String!
    artImages: [String!]!
    category: String!
    dimensions: String!
    price: Float!
    artState: String!
    auctionStartPrice: Float!
  }

  type ArtPiece {
    _id: ID!
    title: String!
    description: String!
    artist: ID!
    artImages: [String!]!
    category: String!
    dimensions: String!
    price: Float!
    artState: String!
    auctionStartPrice: Float!
    auctionStartDate: String!
  }

  input UpdateArtInput {
    title: String
    description: String
    artImages: [String!]
    category: String
    dimensions: String
    price: Float
    artState: String
    artId: ID!
  }

  type UserArtPieces {
    _id: ID!
    title: String!
    description: String!
    artist: ClientUser!
    artImages: [String!]!
    category: String!
    dimensions: String!
    price: Float!
    artState: String!
    auctionStartPrice: Float!
  }

  type LikeArt {
    _id: ID!
    artId: ID!
    likedBy: ID!
    likedAt: String!
  }

  type UserLikeArt {
    _id: ID!
    artId: ID!
    likedBy: ClientUser!
    likedAt: String!
  }

  type ArtLikes {
    data: [UserLikeArt!]!
    numberOfLikes: Int!
  }

  type Query {
    getAllArtWorks: [UserArtPieces!]!
    getUserArtWorks(userId: ID!): [UserArtPieces!]!
    getArtLikes(artId: ID!): ArtLikes!
  }

  type Mutation {
    createArt(artInput: ArtInput): ArtPiece!
    becomeArtist: User!
    likeArt(artId: ID!): LikeArt!
    updateArt(artInput: UpdateArtInput): ArtPiece!
    deleteArt(artId: ID!): String!
    unlikeArt(artId: ID!): String!
  }
`;
