import { gql } from "apollo-server-express";

export const artTypeDefs = gql`
  input ArtInput {
    title: String!
    description: String!
    artPreview: String!
    previewImageRef: String!
    artImagesRef: [String]
    artImages: [String]
    category: String!
    dimensions: String!
    price: Float
    artState: String!
    auctionStartPrice: Float
    auctionStartDate: String
    auctionEndDate: String
  }

  input ArtEditInput {
    artId: ID!
    title: String!
    description: String!
    artPreview: String!
    previewImageRef: String!
    artImagesRef: [String]
    artImages: [String]
    category: String!
    dimensions: String!
    price: Float
    artState: String!
    auctionStartPrice: Float
    auctionStartDate: String
    auctionEndDate: String
  }

  type ArtPiece {
    _id: ID!
    title: String!
    description: String!
    artist: ID!
    artPreview: String!
    previewImageRef: String!
    artImagesRef: [String]
    artImages: [String]
    category: String!
    dimensions: String!
    price: Float!
    artState: String!
    auctionStartPrice: Float
    auctionStartDate: String
    auctionEndDate: String
    highestBid: Float
  }

  type UserArtPieces {
    _id: ID!
    title: String!
    description: String!
    artist: User!
    artPreview: String!
    previewImageRef: String!
    artImagesRef: [String]
    artImages: [String]
    category: String!
    dimensions: String!
    price: Float!
    artState: String!
    auctionStartPrice: Float
    auctionStartDate: String
    auctionEndDate: String
    highestBid: Float
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
    getArtById(artId: ID!): UserArtPieces!
    getUserArtWorks(userId: ID!): [UserArtPieces!]!
    getArtLikes(artId: ID!): ArtLikes!
  }

  type Mutation {
    createArt(artInput: ArtInput): ArtPiece!
    becomeArtist: User!
    likeArt(artId: ID!): LikeArt!
    updateArt(artInput: ArtEditInput): ArtPiece!
    deleteArt(artId: ID!): String!
    unlikeArt(artId: ID!): String!
  }
`;
