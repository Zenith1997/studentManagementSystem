import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@mui/material";
import { post } from "../api/api"; // Import the post function from api.js
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddStudent() {
  const [formData, setFormData] = useState({
    registrationId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    contactNumber: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server API using the post function from api.js
      await post("/std", formData);
      // Redirect to the home page after successful submission
      navigate("/home");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" marginTop={10}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" align="center">
              Add Student
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Registration ID"
                name="registrationId"
                value={formData.registrationId}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default AddStudent;
