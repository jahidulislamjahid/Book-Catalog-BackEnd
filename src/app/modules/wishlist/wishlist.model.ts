import { Schema, model } from 'mongoose';
import { IWishList, WishModel } from './wishList.interface';

const wishListSchema = new Schema<IWishList>(
  {
    wishList: {
      type: Array,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WishList = model<IWishList, WishModel>('wishlist', wishListSchema);
