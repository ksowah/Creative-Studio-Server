import { getMe, getFollowers, getFollowing, getUserByUsername, getDeliveryAddress, getNotifications } from "./resolvers/user/queries";
import {
  register,
  login,
  follow,
  unfollow,
  becomeCreator,
  becomePremiumUser,
  verifyUser,
  editProfile,
  addDeliveryAddress,
} from "./resolvers/user/mutations";
import {
  createDesign,
  createComment,
  replyToComment,
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
  getDesignsByCategory,
  getUserDesigns,
  getSavedDesigns,
  getDesignLikes,
  getDesignComments,
  getCommentReplies,
  searchDesigns,
  getDesignById,
} from "./resolvers/design/queries";
import { placeBid, updateStartPrice, expireAuction, endAuction } from "./resolvers/auction/mutations";
import { getArtBiddings, getHighestBid, getActiveAndUpcomingAuctions } from "./resolvers/auction/queries";
import { newComment, newLike, newCommentReply } from "./resolvers/design/subscriptions";
import { userTypeDefs } from "./resolvers/user/typeDefs";
import { designTypeDefs } from "./resolvers/design/typeDefs";
import { artTypeDefs } from "./resolvers/art/typeDefs";
import { cartTypeDefs } from "./resolvers/cart/typeDefs";
import { addToCart, removeFromCart, confirmOrder } from "./resolvers/cart/mutations";
import { getCartItems, getOrders } from "./resolvers/cart/queries"
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
    getDesignsByCategory,
    getUserDesigns,
    getFollowers,
    getFollowing,
    getSavedDesigns,
    getDesignLikes,
    getDesignComments,
    getCommentReplies,
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
    getDeliveryAddress,
    getNotifications,
    getOrders,
  },
  Mutation: {
    register,
    login,
    createDesign,
    createComment,
    replyToComment,
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
    updateStartPrice,
    editProfile,
    deposit,
    withdraw,
    countDesignViews,
    expireAuction,
    endAuction,
    addDeliveryAddress,
    confirmOrder,
  },
  Subscription: {
    newComment,
    newLike,
    newCommentReply
  },
};
