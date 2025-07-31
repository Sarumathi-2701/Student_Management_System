# app.py
from flask import Flask, request, jsonify, send_from_directory
import sqlite3
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from modeles import db, Student
import os

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db.init_app(app)

# Create tables if not exist
with app.app_context():
    db.create_all()


@app.route("/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    result = []
    for s in students:
        result.append({
            "id": s.id,
            "name": s.name,
            "email": s.email,
            "rollnumber": s.rollnumber,
            "phoneNo": s.phoneNo,
            "department": s.department,
            "year": s.year
        })
    return jsonify(result)


@app.route("/students", methods=["POST"])
def add_student():
    data = request.get_json()
    new_student = Student(
        name=data.get("name"),
        email=data.get("email"),
        rollnumber=data.get("rollnumber"),
        phoneNo=data.get("phoneNo"),
        department=data.get("department"),
        year=data.get("year")
    )
    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": "Student added successfully."}), 201



if __name__ == "__main__":
    if not os.path.exists("database.db"):
        with app.app_context():
            init_db()
    app.run(debug=True)
