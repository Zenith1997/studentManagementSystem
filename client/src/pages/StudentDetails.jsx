import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import { get } from "../api/api";
const useStyles = makeStyles({
  formContainer: {
    backgroundColor: "#f1f2f3",
    display: "flex",
    marginTop: "50px",
    flexDirection: "column",
    alignItems: "flex-start", // Align items to the start (left)
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%", // Make the width cover the parent container
    maxWidth: "100%", // Set maximum width to limit the size
  },
});

function StudentDetails() {
  const { registrationId } = useParams();
  const [dob, setDob] = useState();
  const [studentDetails, setStudentDetails] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await get(`/std/${registrationId}`);
        setStudentDetails(response[0]);
        setDob(response[0].dob);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [registrationId]);

  if (!studentDetails) {
    return <div>Loading...</div>;
  }

  // Function to calculate age
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Calculate age based on date of birth
  const age = calculateAge(dob);

  return (
    <div>
      <Navbar />
      <Paper className={classes.formContainer} elevation={3}>
        <Typography variant="h3" align="center">
          Student Details
        </Typography>
        <Box mt={5}>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Registration ID:</span>{" "}
            {studentDetails.registration_id}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>First Name:</span>{" "}
            {studentDetails.first_name}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Middle Name:</span>{" "}
            {studentDetails.middle_name || "-"}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Last Name:</span>{" "}
            {studentDetails.last_name}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Age:</span> {age}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Contact Number:</span>{" "}
            {studentDetails.contact_number}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
            {studentDetails.address}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Payment Amount:</span>{" "}
            {studentDetails.payment_amount}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Payment Date:</span>{" "}
            {studentDetails.payment_date}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Classroom Name:</span>{" "}
            {studentDetails.classroom_name}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Subject Name:</span>{" "}
            {studentDetails.subject_name}
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}

export default StudentDetails;
