import express from 'express';
import { WishListController } from './wishList.controller';

const router = express.Router();

router.post(
  '/create-wishlist',
  WishListController.createWishList
);
router.get('/:email', WishListController.getAllWishLists);
router.delete('/', WishListController.deleteWishList);
router.patch('/', WishListController.updateWishList);

export const WishListRoutes = router;
