import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Typography, Paper, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import { DatePicker } from "@mui/lab";
import { get, put, post } from "../api/api"; // Assuming you have a put and post function in your api file

const useStyles = makeStyles({
  formContainer: {
    backgroundColor: "#f1f2f3",
    display: "flex",
    marginTop: "50px",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "100%",
  },
});

function UpdateStudent() {
  const { registrationId } = useParams();
  const [dob, setDob] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleUpdate = async () => {
    try {
      let response;
      if (registrationId) {
        // If registrationId exists, it means we are updating an existing student
        response = await put(`/std/${registrationId}`, studentDetails);
      } else {
        // If registrationId does not exist, it means we are adding a new student
        response = await post("/std", studentDetails);
      }
      console.log("Student details updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  if (!studentDetails) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({
      ...studentDetails,
      [name]: value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

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
            {isEditing ? (
              <TextField
                name="registration_id"
                value={studentDetails.registration_id}
                onChange={handleChange}
              />
            ) : (
              studentDetails.registration_id
            )}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>First Name:</span>{" "}
            {isEditing ? (
              <TextField
                name="first_name"
                value={studentDetails.first_name}
                onChange={handleChange}
              />
            ) : (
              studentDetails.first_name
            )}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Last Name:</span>{" "}
            {isEditing ? (
              <TextField
                name="last_name"
                value={studentDetails.last_name}
                onChange={handleChange}
              />
            ) : (
              studentDetails.last_name
            )}
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
            {isEditing ? (
              <TextField
                name="last_name"
                value={studentDetails.address}
                onChange={handleChange}
              />
            ) : (
              studentDetails.address
            )}
          </Typography>

          <Typography mb={2}>
          <span style={{ fontWeight: "bold" }}>Date of Birth:</span>{" "}
          {isEditing ? (
            <DatePicker
              name="dob"
              value={dob}
              onChange={(newValue) => setDob(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          ) : (
            dob
          )}
        </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: "bold" }}>Contact number:</span>{" "}
            {isEditing ? (
              <TextField
                name="last_name"
                value={studentDetails.contact_number}
                onChange={handleChange}
              />
            ) : (
              studentDetails.contact_number
            )}
          </Typography>
        </Box>
        <Box mt={5} display="flex" justifyContent="center">
          {isEditing ? (
            <Button variant="contained" onClick={handleUpdate}>
              Save
            </Button>
          ) : (
            <Button variant="contained" onClick={toggleEdit}>
              Edit
            </Button>
          )}
        </Box>
      </Paper>
    </div>
  );
}

export default UpdateStudent;
