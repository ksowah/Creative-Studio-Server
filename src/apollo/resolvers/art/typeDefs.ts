import { gql } from 'apollo-server-express';    

export const artTypeDefs = gql`
    input ArtInput {
        title: String!
        description: String!
        artImages: [String!]!
        category: String!
        dimensions: String!
        price: Float!
        artState: String!
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
    }

    type Query {
        getAllArtWorks: [UserArtPieces!]!
        getUserArtWorks(userId: ID!): [UserArtPieces!]!
    }

    type Mutation {
        createArt(artInput: ArtInput): ArtPiece!
        becomeArtist: User!
    }
`;