import { gql } from "apollo-server-express";


export const walletTypeDefs = gql`
    type Wallet {
        _id: ID!
        user: ID!
        balance: Float!
    }
 
 type Mutation {
    deposit(amount: Float!): Wallet!
    withdraw(amount: Float!): Wallet!
 }

 type Query {
    getWalletBallance: Wallet!
 }

`