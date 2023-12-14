import { getMe, getFollowers, getFollowing } from "./resolvers/user/queries";
import {
  register,
  login,
  follow,
  unfollow,
  becomeCreator,
  becomePremiumUser,
  verifyUser,
} from "./resolvers/user/mutations";
import {
  createDesign,
  createComment,
  likeDesign,
  saveDesign,
  unlikeDesign,
  becomeDesigner,
  deleteDesign,
  unsaveDesign,
  updateDesign,
} from "./resolvers/design/mutations";
import { createArt, becomeArtist, likeArt, updateArt, deleteArt, unlikeArt } from "./resolvers/art/mutations";
import { getAllArtWorks, getUserArtWorks, getArtLikes } from "./resolvers/art/queries";
import {
  getAllDesigns,
  getUserDesigns,
  getSavedDesigns,
  getDesignLikes,
  searchDesigns,
} from "./resolvers/design/queries";
import { placeBid, updateBidAmount, updateStartPrice } from "./resolvers/auction/mutations";
import { getArtBiddings, getHighestBid } from "./resolvers/auction/queries";
import { newComment, newLike } from "./resolvers/design/subscriptions";
import { userTypeDefs } from "./resolvers/user/typeDefs";
import { designTypeDefs } from "./resolvers/design/typeDefs";
import { artTypeDefs } from "./resolvers/art/typeDefs";
import { cartTypeDefs } from "./resolvers/cart/typeDefs";
import { addToCart, removeFromCart } from "./resolvers/cart/mutations";
import { getCartItems } from "./resolvers/cart/queries"
import { auctionTypeDefs } from "./resolvers/auction/typeDefs";

export const typeDefs = [
  userTypeDefs,
  designTypeDefs,
  artTypeDefs,
  cartTypeDefs,
  auctionTypeDefs,
];

export const resolvers = {
  Query: {
    getMe,
    getAllDesigns,
    getUserDesigns,
    getFollowers,
    getFollowing,
    getSavedDesigns,
    getDesignLikes,
    searchDesigns,
    getAllArtWorks,
    getUserArtWorks,
    getCartItems,
    getArtLikes,
    getArtBiddings,
    getHighestBid,
  },
  Mutation: {
    register,
    login,
    createDesign,
    createComment,
    likeDesign,
    follow,
    unfollow,
    saveDesign,
    unlikeDesign,
    deleteDesign,
    unsaveDesign,
    updateDesign,
    createArt,
    becomeCreator,
    becomeArtist,
    becomeDesigner,
    becomePremiumUser,
    addToCart,
    removeFromCart,
    verifyUser,
    likeArt,
    updateArt,
    deleteArt,
    unlikeArt,
    placeBid,
    updateBidAmount,
    updateStartPrice,
  },
  Subscription: {
    newComment,
    newLike,
  },
};
