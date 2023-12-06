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
        artist: ClientUser!
    }

    type Mutation {
        addToCart(itemId: ID!, artist: ID!): Cart!
        removeFromCart(itemId: ID!): Cart!
    }

    type Query {
        getCartItems: [CartItems!]!
    }
`;