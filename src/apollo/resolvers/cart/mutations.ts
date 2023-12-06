import Authenticate from "../../../middleware/auth";
import { CartModel } from "../../../models/Cart";


export const addToCart = async (_: any, { itemId, artist }: any, context: any) => {
    try {
        const user:any = Authenticate(context);

        const itemAlreadyInCart = await CartModel.findOne({ item:itemId, user: user.user._id });

        if (itemAlreadyInCart) {
            throw new Error("Item already in cart");
        }

        const cart = await CartModel.create({ item:itemId, user: user.user._id, artist });

        return cart;
    } catch (error) {
        console.log(error);
    }
}

export const removeFromCart = async (_: any, { itemId }: any, context: any) => {
    try {
        const user: any = Authenticate(context);

        const itemNotInCart = await CartModel.findOne({item:itemId, user:user.user._id});

        if(!itemNotInCart){
            throw new Error("Item not in your cart");
        }
        
        const item = await CartModel.findOneAndDelete({item:itemId});

        return item;
    } catch (error) {
        console.log(error);
    }
}