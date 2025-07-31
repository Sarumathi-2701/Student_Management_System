import React, { useState } from 'react';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollnumber: '',
    phoneNo: '',
    department: '',
    year: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || 'Student added!');
        setFormData({
          name: '',
          email: '',
          rollnumber: '',
          phoneNo: '',
          department: '',
          year: ''
        });
      })
      .catch(err => {
        console.error('Error:', err);
        setMessage('Something went wrong!');
      });
  };

  return (
    <div className="container">
      <div className="student-form">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input type="text" name="rollnumber" value={formData.rollnumber} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Phone No</label>
            <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="">-- Select Department --</option>
              <option value="IT">Information Technology (IT)</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="ECE">Electronics (ECE)</option>
              <option value="EEE">Electrical (EEE)</option>
              <option value="MECH">Mechanical (MECH)</option>
              <option value="CIVIL">Civil (CIVIL)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Year of Study</label>
            <div className="radio-group">
              {[1, 2, 3, 4].map((yr) => (
                <label key={yr}>
                  <input
                    type="radio"
                    name="year"
                    value={yr}
                    checked={formData.year === yr.toString()}
                    onChange={handleChange}
                    required
                  />
                  {yr} Year
                </label>
              ))}
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
        {message && <p style={{ textAlign: 'center', color: 'green' }}>{message}</p>}
      </div>
    </div>
  );
};

export default AddStudent;
