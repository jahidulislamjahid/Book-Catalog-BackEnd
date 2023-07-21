import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendReponse from '../../../shared/sendResponse';
import { IWishList } from './wishList.interface';
import { WishListService } from './wishList.services';

const sendWishListResponse = (res: Response, message: string, data: any) => {
  sendReponse<IWishList>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message,
    data,
  });
};

const createWishList = catchAsync(async (req: Request, res: Response) => {
  const { ...WishListData } = req.body;
  const result = await WishListService.createWishList(WishListData);
  sendWishListResponse(res, 'WishList is Created Successfully!', result);
});

const getAllWishLists = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await WishListService.getAllWishLists(email);
  sendWishListResponse(res, 'WishLists  are retrieved successfully !', result);
});

const deleteWishList = catchAsync(async (req: Request, res: Response) => {
  const { email, wishlistItemId } = req.body;
  const result = await WishListService.deleteWishList(email, wishlistItemId);
  sendWishListResponse(res, ' WishList Deleted successfully !', result);
});

const updateWishList = catchAsync(async (req: Request, res: Response) => {

  const result = await WishListService.updateWishList(req.body);
  sendWishListResponse(res, 'WishList Data Is Updated successfully!', result);
});

export const WishListController = {
  createWishList,
  getAllWishLists,
  deleteWishList,
  updateWishList,
};
