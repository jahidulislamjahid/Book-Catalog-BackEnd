/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { IBook } from '../book/books.interface';


export type WishItem = {
  _id: string;
  finishedReading: boolean;
}

export type WishListDocument = {
  save(): unknown;
  email: string;
  wishList: WishItem[];
}

export type IWishListType = {
  find(arg0: (item: any) => boolean): unknown;
  _id: any;
  some: any;
  push: any;
  splice: any;
  finishedReading: boolean;
  findIndex: any;
};
export type IWishList = {
  wishList: IWishListType;
  email: string;
  book: Types.ObjectId | IBook;
};



export type WishModel = Model<IWishList>;
