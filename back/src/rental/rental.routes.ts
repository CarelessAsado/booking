import express from "express";
const router = express.Router();

import * as rentalControllers from "./rental.controllers";
import { checkOwnership } from "../middleware/checkOwnership";

//SOLO SE ACTIVA SI LA ROUTE TIENE COMO PARAMS userID, x ej get("/tasks"), esta eximido
router.param("userID", checkOwnership);

router.post("/", rentalControllers.createRental);
router.post("/available", rentalControllers.getAvailableRooms);
/* router.get("/", rentalControllers.getAllTasks); */
/* OWNERSHIP CHECK MIDDLEWARE */
/* router.delete("/:userID/:id", rentalControllers.deleteTask);
router.put("/:userID/:id", rentalControllers.updateTask);
router.get("/:userID/:id", rentalControllers.getSingleTask); */

module.exports = router;
