import { gql } from "apollo-server-express";

export const auctionTypeDefs = gql`

    type Bid {
        _id: ID!
        bidBy: ID!
        bidAt: String!
        bidAmount: Float!
        artId: ID!
    }

    type UserBid {
        _id: ID!
        bidBy: User!
        bidAt: String!
        bidAmount: Float!
        artId: ID!
    }

    type Mutation {
        placeBid(bidAmount: Float!, artId: ID!): Bid!
        updateBidAmount(bidAmount: Float!, bidId: ID!): Bid!
        updateStartPrice(artId: ID!): ArtPiece!
    }

    type Query {
        getArtBiddings(artId: ID!): [UserBid!]!
        getHighestBid(artId: ID!): UserBid!
        getActiveAndUpcomingAuctions: [UserArtPieces!]!
    }
`