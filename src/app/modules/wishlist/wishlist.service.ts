/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { IWishList } from './wishList.interface';
import { WishList } from './wishList.model';

const createWishList = async (payload: IWishList) => {
  const email = payload.email;
  const wishList = payload.wishList;
  const existingWishList = await WishList.findOne({ email: email });

  if (existingWishList) {
    const isWishlistExists = existingWishList.wishList.some(
      (item: any) => item._id === wishList._id
    );

    if (isWishlistExists) {
      throw new Error('Wishlist already exists');
    }

    existingWishList.wishList.push(wishList);
    await existingWishList.save();
    return existingWishList;
  }

  if (!existingWishList) {
    const newWishList = new WishList({
      email: email,
      wishList: wishList,
    });
    const result = await newWishList.save();
    return result;
  }
};

const getAllWishLists = async (email: string) => {
  const result = await WishList.find({ email: email }).populate('book');
  return result;
};

const deleteWishList = async (email: string, wishlistItemId: string) => {
  const wishlist = await WishList.findOne({ email });
  if (wishlist) {
    const targetIndex = wishlist.wishList.findIndex(
      (item: any) => item._id === wishlistItemId
    );

    if (targetIndex !== -1) {
      wishlist.wishList.splice(targetIndex, 1);
      await wishlist.save();
    }
  }
  return wishlist;
};

const updateWishList = async (payload: any) => {
  const { email, wishlistItemId, finishedReading } = payload;

  try {
    const result = await WishList.findOneAndUpdate(
      { email: email, 'wishList._id': wishlistItemId },
      { $set: { 'wishList.$.finishedReading': finishedReading } },
      { new: true }
    );
    return result;
  } catch (error) {
    console.error('An error occurred while updating the wish list:', error);
    throw error;
  }
};

export const WishListService = {
  createWishList,
  deleteWishList,
  getAllWishLists,
  updateWishList,
};
