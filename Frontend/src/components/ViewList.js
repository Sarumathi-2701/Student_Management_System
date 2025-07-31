import React, { useEffect, useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    fetch('http://localhost:5000/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);


  return (
    <div className="container">
      <h2>All Students</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Roll Number</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.rollnumber}</td>
              <td>{student.email}</td>
              <td>{student.phoneNo}</td>
              <td>{student.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
