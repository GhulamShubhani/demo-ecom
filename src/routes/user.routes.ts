import { Router } from "express";
import { 
  allUserDataFuntion, 
  userLoginFuntion, 
  userlogoutFuntion, 
  userShowProfileFuntion, 
  userRegisterFunction,
  userUpdateProfileFunction,
  userUpdatePasswordFunction, 
  userDeleteFunction,
  userUpdateAvatarFunction,
  userUpdateCoverImageFunction,
  userUpdateImageFunction,
  userRefreshTokenFunction,
} from "../controllers/user.controller";
import { upload } from "../middlewares/milter.middleware";
import { authMiddleWare } from "../middlewares/auth.middleware";
import { RoleBasedAuth } from "../middlewares/roleBasedAuth.middleware";
const router = Router();



// router.route("/").post(userRegisterFunction);
router.route("/").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverPhoto",
      maxCount: 1,
    },
  ]),
  userRegisterFunction
);
router.route("/refreshToken").post( userRefreshTokenFunction );
router.route("/login").post( userLoginFuntion );
router.route("/logout").post( authMiddleWare , userlogoutFuntion );
router.route("/profile").get( authMiddleWare , userShowProfileFuntion );
router.route("/update-profile").put( authMiddleWare , userUpdateProfileFunction );
router.route("/update-image").put( authMiddleWare , userUpdateImageFunction );
router.route("/update-avatar").put( authMiddleWare ,upload.single('avatar'), userUpdateAvatarFunction );
router.route("/update-coverPhoto").put( authMiddleWare ,upload.single('coverPhoto'), userUpdateCoverImageFunction );
router.route("/update-password").put( authMiddleWare , userUpdatePasswordFunction );
router.route("/delete-profile").delete( authMiddleWare , userDeleteFunction );


// admin panel
router.route("/all-data").get( authMiddleWare ,RoleBasedAuth( "admin"), allUserDataFuntion );


// router.route("/profile").get( authMiddleWare ,RoleBasedAuth("user", "admin"), userProfileFuntion );

export default router;
