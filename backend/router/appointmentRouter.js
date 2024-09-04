import express from "express"
import { deleteAppointment, gettAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../midlwares/auth.js"
const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment) // Added isPatientAuthenticated middleware for posting appointments

router.get("/getall", isAdminAuthenticated, gettAllAppointments) // Added isAdminAuthenticated middleware for getting all appointments

router.put("/update/:id", isAdminAuthenticated,updateAppointmentStatus ) // Added isAdminAuthenticated middleware for updating appointment status

router.delete("/delete/:id", isAdminAuthenticated,deleteAppointment ) // Added isAdminAuthenticated middleware for deleting appointments

export default router; 