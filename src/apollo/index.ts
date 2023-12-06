import { getMe, getFollowers, getFollowing } from "./resolvers/user/queries";
import {
  register,
  login,
  follow,
  becomeCreator,
  becomePremiumUser,
} from "./resolvers/user/mutations";
import {
  createDesign,
  createComment,
  likeDesign,
  saveDesign,
  unlikeDesign,
  becomeDesigner,
} from "./resolvers/design/mutations";
import { createArt, becomeArtist } from "./resolvers/art/mutations";
import { getAllArtWorks, getUserArtWorks } from "./resolvers/art/queries";
import {
  getAllDesigns,
  getUserDesigns,
  getSavedDesigns,
  getNumberOfLikes,
  searchDesigns,
} from "./resolvers/design/queries";
import { newComment, newLike } from "./resolvers/design/subscriptions";
import { userTypeDefs } from "./resolvers/user/typeDefs";
import { designTypeDefs } from "./resolvers/design/typeDefs";
import { artTypeDefs } from "./resolvers/art/typeDefs";
import { cartTypeDefs } from "./resolvers/cart/typeDefs";
import { addToCart, removeFromCart } from "./resolvers/cart/mutations";
import { getCartItems } from "./resolvers/cart/queries"

export const typeDefs = [
  userTypeDefs,
  designTypeDefs,
  artTypeDefs,
  cartTypeDefs,
];

export const resolvers = {
  Query: {
    getMe,
    getAllDesigns,
    getUserDesigns,
    getFollowers,
    getFollowing,
    getSavedDesigns,
    getNumberOfLikes,
    searchDesigns,
    getAllArtWorks,
    getUserArtWorks,
    getCartItems,
  },
  Mutation: {
    register,
    login,
    createDesign,
    createComment,
    likeDesign,
    follow,
    saveDesign,
    unlikeDesign,
    createArt,
    becomeCreator,
    becomeArtist,
    becomeDesigner,
    becomePremiumUser,
    addToCart,
    removeFromCart,
  },
  Subscription: {
    newComment,
    newLike,
  },
};
