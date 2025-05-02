import express from "express";
import isAuthenticated from "../middlewares/isAuntheticated.js";
import {getAdminJobs, getAllJobs, getJobById, getJobByIdC, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/:id").get(isAuthenticated, getJobByIdC);


export default router;

