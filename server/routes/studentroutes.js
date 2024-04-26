const express = require("express");
const router = express.Router();
const { getStudentDetails, addStudentDetails } = require("../controllers/studentController");
const { verifyToken } = require("../middleware/authMiddleware");

router.use(verifyToken); // Apply verifyToken middleware to all routes in this router

router.get("/",  getStudentDetails);
// router.get("/:registrationId", getStudentDetailsById);
// router.delete(
//   "/:registrationId",deleteStudentAndRelatedData
// );
router.post("/", addStudentDetails);
// router.put("/:registrationId", updateStudentDetailsById);

module.exports = router;
