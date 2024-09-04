

import { Router } from "express";
import { authMiddleWare } from "../middlewares/auth.middleware";
import { createproduct, getproduct } from "../controllers/product.controller";
import { upload } from "../middlewares/milter.middleware";
const productRouter = Router();

productRouter.route('/').post(authMiddleWare,upload.fields(
    [
        {
          name:"displayImage",
          maxCount:1
        },
        {
          name:"image",
          maxCount:12
        },
    ]
), createproduct)
productRouter.route('/').get(authMiddleWare, getproduct)

export default productRouter;
