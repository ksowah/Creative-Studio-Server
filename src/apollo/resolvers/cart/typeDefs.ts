import { gql } from 'apollo-server-express';    

export const cartTypeDefs = gql`
    type Cart {
        item: ID!
        user: ID!
        artist: ID!
    }

    type CartItems {
        item: ArtPiece!
        user: ID!
        artist: User!
    }

    type Mutation {
        addToCart(itemId: ID!, artist: ID!): Cart!
        removeFromCart(itemId: ID!): Cart!
        confirmOrder(items: [String!]): String!
    }

    type Query {
        getCartItems: [CartItems!]!
        getOrders: [UserArtPieces!]!
    }
`;