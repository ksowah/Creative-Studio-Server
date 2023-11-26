import { getMe, getFollowers, getFollowing } from "./resolvers/user/queries"
import { register, login, follow } from "./resolvers/user/mutations"
import { createDesign, createComment, likeDesign, saveDesign } from "./resolvers/design/mutations"
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
        getFollowers,
        getFollowing,
    },
    Mutation: {
        register,
        login,
        createDesign,
        createComment,
        likeDesign,
        follow,
        saveDesign,
    },
    Subscription: {
        newComment,
        newLike,
    }
}