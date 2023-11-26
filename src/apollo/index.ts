import { getMe } from "./resolvers/user/queries"
import { register, login } from "./resolvers/user/mutations"
import { createDesign, createComment, likeDesign } from "./resolvers/design/mutations"
import { getAllDesigns, getUserDesigns } from "./resolvers/design/queries"
import { newComment, newLike } from "./resolvers/design/subscriptions"
import { userTypeDefs } from "./resolvers/user/typeDefs"
import { designTypeDefs } from "./resolvers/design/typeDefs"

export const typeDefs = [
    userTypeDefs,
    designTypeDefs,
]

export const resolvers = {
    Query: {
        getMe,
        getAllDesigns,
        getUserDesigns,
    },
    Mutation: {
        register,
        login,
        createDesign,
        createComment,
        likeDesign,
    },
    Subscription: {
        newComment,
        newLike,
    }
}