import express from 'express';
import { UserController } from './user.controller';
import { upload } from '../../middlewares/upload';



const router = express.Router();



// Get all users (admin only)
router.get('/',  UserController.getAllUsers);

// Get single user (admin only)
router.get('/:userId',  UserController.getSingleUser);

// // Update user (admin only)
router.patch('/:userId', upload.single("profilePic"), UserController.updateUser);

// // Delete user (admin only)
// router.delete('/:userId', auth('admin'), UserController.deleteUser);


export const userRoutes = router;
