import { Router } from "express";
import { allCtogary, createCtogary, updateCtogary } from "../controllers/catogary.controller";
import { authMiddleWare } from "../middlewares/auth.middleware";

const catogaryRouter = Router();

catogaryRouter.route('/').get(allCtogary)
catogaryRouter.route('/').post(authMiddleWare ,createCtogary)
catogaryRouter.route('/update-catogary').put(authMiddleWare,updateCtogary)

export default catogaryRouter