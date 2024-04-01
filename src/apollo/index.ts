import { getMe, getFollowers, getFollowing, getUserByUsername } from "./resolvers/user/queries";
import {
  register,
  login,
  follow,
  unfollow,
  becomeCreator,
  becomePremiumUser,
  verifyUser,
  editProfile,
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
  countDesignViews,
} from "./resolvers/design/mutations";
import { createArt, becomeArtist, likeArt, updateArt, deleteArt, unlikeArt } from "./resolvers/art/mutations";
import { getAllArtWorks, getUserArtWorks, getArtLikes, getArtById } from "./resolvers/art/queries";
import {
  getAllDesigns,
  getUserDesigns,
  getSavedDesigns,
  getDesignLikes,
  searchDesigns,
  getDesignById,
} from "./resolvers/design/queries";
import { placeBid, updateBidAmount, updateStartPrice } from "./resolvers/auction/mutations";
import { getArtBiddings, getHighestBid, getActiveAndUpcomingAuctions } from "./resolvers/auction/queries";
import { newComment, newLike } from "./resolvers/design/subscriptions";
import { userTypeDefs } from "./resolvers/user/typeDefs";
import { designTypeDefs } from "./resolvers/design/typeDefs";
import { artTypeDefs } from "./resolvers/art/typeDefs";
import { cartTypeDefs } from "./resolvers/cart/typeDefs";
import { addToCart, removeFromCart } from "./resolvers/cart/mutations";
import { getCartItems } from "./resolvers/cart/queries"
import { auctionTypeDefs } from "./resolvers/auction/typeDefs";
import { walletTypeDefs } from "./resolvers/wallet/typeDefs";
import { getWalletBallance } from "./resolvers/wallet/queries"
import { deposit, withdraw } from "./resolvers/wallet/mutations"


export const typeDefs = [
  userTypeDefs,
  designTypeDefs,
  artTypeDefs,
  cartTypeDefs,
  auctionTypeDefs,
  walletTypeDefs,
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
    getUserByUsername,
    getDesignById,
    getArtById,
    getActiveAndUpcomingAuctions,
    getWalletBallance,
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
    editProfile,
    deposit,
    withdraw,
    countDesignViews,
  },
  Subscription: {
    newComment,
    newLike,
  },
};
