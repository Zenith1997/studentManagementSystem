import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/Navbar";
import { get, remove } from "../api/api";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";

function Home() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        setToken(token);
        console.log(token);
        const response = await get("/std");
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleView = (registrationId) => {
    navigate(`/student-details/${registrationId}`);
  };

  const handleDelete = async (registrationId) => {
    try {
      await remove(`/std/${registrationId}`);
      console.log("Successfully deleted.");
      setData(data.filter((row) => row.registration_id !== registrationId));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = (registrationId) => {
    navigate(`/update-student/${registrationId}`);
  };

  const handleAddNew = () => {
    // Redirect to the page where you can add a new student
    navigate("/add-student");
  };

  return (
    <>
      <AppBar />

      <TableContainer
        sx={{
          marginTop: "70px",
          padding: "1px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f1f2f3",
        }}
      >
        <div></div>
        <Table>
          <TableHead>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddNew}
              sx={{ margin: "10px" }}
            >
              Add New Student
            </Button>
            <TableRow
              sx={{
                backgroundColor: "primary",
                color: "red",
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>Registration ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Contact Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.registration_id}>
                <TableCell>{row.registration_id}</TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.contact_number}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleView(row.registration_id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleUpdate(row.registration_id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(row.registration_id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Home;
