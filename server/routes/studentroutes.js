const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.getStudentDetails);
router.get("/:registrationId", studentController.getStudentDetailsById);
router.delete("/:registrationId", studentController.deleteStudentAndRelatedData);
router.post("/", studentController.addStudentDetails);
router.put("/:registrationId", studentController.updateStudentDetailsById);

module.exports = router;
