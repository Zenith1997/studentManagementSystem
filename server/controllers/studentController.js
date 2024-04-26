const pool = require("../db/db"); // Import your MySQL pool

exports.getStudentDetails = async (req, res, next) => {
  try {
   //// const token = req.headers.authorization.split(" ")[1];
   // console.log(token);

    // Query to retrieve required data from the Student table
    const [studentRows] = await pool.query(
      "SELECT registration_id, first_name, last_name, contact_number, address FROM Student"
    );

    // Send the retrieved data as a response
    res.json(studentRows);
  } catch (error) {
    console.error("Error retrieving student details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addStudentDetails = async (req, res) => {
  const {
    registrationId,
    firstName,
    middleName,
    lastName,
    contactNumber,
    address,
    dob,
  } = req.body;
  console.log(registrationId); // Logging registrationId received from request

  const transaction = await pool.getConnection();

  try {
    await transaction.beginTransaction();

    // Insert into Student table
    const insertStudentQuery = `
      INSERT INTO Student (registration_id, first_name, middle_name, last_name, contact_number, address, dob)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [studentResult] = await transaction.query(insertStudentQuery, [
      registrationId,
      firstName,
      middleName,
      lastName,
      contactNumber,
      address,
      dob,
    ]);
    const insertedRegistrationId = studentResult.insertId;

    await transaction.commit();

    res.json({ message: "Student details added successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error adding student details:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    transaction.release();
  }
};

exports.getStudentDetailsById = async (req, res) => {
  const { registrationId } = req.params; // Assuming registrationId is passed as a route parameter
  console.log(req.params);
  try {
    // Query to retrieve all details including payments, classroom, and subject
    const query = `
      SELECT 
          s.registration_id,
          s.first_name,
          s.middle_name,
          s.last_name,
          s.dob,
          s.contact_number,
          s.address,
          p.amount AS payment_amount,
          p.date AS payment_date,
          c.name AS classroom_name,
          subj.subject_name
      FROM 
          Student s
          LEFT JOIN Payment p ON s.registration_id = p.registration_id
          LEFT JOIN Assigned a ON s.registration_id = a.registration_id
          LEFT JOIN ClassRoom c ON a.classroom_id = c.classroom_id
          LEFT JOIN Enrolled e ON s.registration_id = e.registration_id
          LEFT JOIN Subject subj ON e.subject_id = subj.subject_id
      WHERE 
          s.registration_id = ?
    `;

    // Execute the query with registrationId as parameter
    const [studentDetails] = await pool.query(query, [registrationId]);

    // Send the retrieved data as a response
    res.json(studentDetails);
  } catch (error) {
    console.error("Error retrieving student details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteStudentAndRelatedData = async (req, res) => {
  const { registrationId } = req.params; // Assuming registrationId is passed as a route parameter
  const transaction = await pool.getConnection();

  try {
    await transaction.beginTransaction();

    // Delete from Payment table
    await transaction.query("DELETE FROM Payment WHERE registration_id = ?", [
      registrationId,
    ]);

    // Delete from Enrolled table
    await transaction.query("DELETE FROM Enrolled WHERE registration_id = ?", [
      registrationId,
    ]);

    // Delete from Assigned table
    await transaction.query("DELETE FROM Assigned WHERE registration_id = ?", [
      registrationId,
    ]);

    // Delete from Student table
    await transaction.query("DELETE FROM Student WHERE registration_id = ?", [
      registrationId,
    ]);

    // Commit the transaction
    await transaction.commit();

    res.json({ message: "Student and related data deleted successfully" });
  } catch (error) {
    // Rollback the transaction if any error occurs
    await transaction.rollback();
    console.error("Error deleting student and related data:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    // Release the connection
    transaction.release();
  }
};

exports.updateStudentDetailsById = async (req, res) => {
  const { registrationId } = req.params; // Assuming registrationId is passed as a route parameter
  const {
    first_name,
    middle_name,
    last_name,
    contact_number,
    address,
    classroom_name,
    subject_names,
  } = req.body;

  const transaction = await pool.getConnection();

  try {
    await transaction.beginTransaction();

    // Update Student details
    const updateStudentQuery = `
      UPDATE Student
      SET first_name = ?,
          middle_name = ?,
          last_name = ?,
          contact_number = ?,
          address = ?
      WHERE registration_id = ?
    `;
    await transaction.query(updateStudentQuery, [
      first_name,
      middle_name,
      last_name,
      contact_number,
      address,
      registrationId,
    ]);

    // Get classroom_id from classroom_name
    const [classroomRow] = await transaction.query(
      "SELECT classroom_id FROM ClassRoom WHERE name = ?",
      [classroom_name]
    );
    const classroom_id = classroomRow[0].classroom_id;
    // Update Assigned room
    const updateAssignedQuery = `
      UPDATE Assigned
      SET classroom_id = ?
      WHERE registration_id = ?
    `;
    await transaction.query(updateAssignedQuery, [
      classroom_id,
      registrationId,
    ]);

    // Delete existing enrolled subjects
    const deleteEnrolledQuery = `
      DELETE FROM Enrolled
      WHERE registration_id = ?
    `;
    await transaction.query(deleteEnrolledQuery, [registrationId]);

    // Get subject_ids from subject_names
    const subjectIds = [];
    for (const subjectName of subject_names) {
      const [subjectRow] = await transaction.query(
        "SELECT subject_id FROM Subject WHERE subject_name = ?",
        [subjectName]
      );
      if (subjectRow.length > 0) {
        subjectIds.push(subjectRow[0].subject_id);
      }
    }

    // Insert enrolled subjects
    const insertEnrolledQuery = `
      INSERT INTO Enrolled (registration_id, subject_id)
      VALUES (?, ?)
    `;
    for (const subjectId of subjectIds) {
      await transaction.query(insertEnrolledQuery, [registrationId, subjectId]);
    }

    await transaction.commit();

    res.json({ message: "Student details updated successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating student details:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    transaction.release();
  }
};
