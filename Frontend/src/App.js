import React, { useState, useEffect } from 'react';
import AddStudentForm from './components/AddStudentForm';
import ViewList from './components/ViewList'
/*import Update from './components/UpdateList';*/

import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/api/students');
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    await axios.post('http://localhost:5000/students', student);
    fetchStudents();
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Student Management System</h1>
      
      {/* Add student form */}
      <AddStudentForm addStudent={addStudent} />
      <ViewList students={students} />
    </div>
  );
}

export default App;
