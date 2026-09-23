const express = require("express");

const router = express.Router();

let students = require("../data/students");


// ==================================================
// 1. GET ALL STUDENTS
// GET /students
// ==================================================

router.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        count: students.length,
        students: students
    });

});


// ==================================================
// 2. GET STUDENT BY ID
// GET /students/:id
// ==================================================

router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    res.status(200).json({
        success: true,
        student: student
    });

});


// ==================================================
// 3. CREATE STUDENT
// POST /students
// ==================================================

router.post("/", (req, res) => {

    const { name, age, course } = req.body;

    // Check required fields
    if (!name || !age || !course) {

        return res.status(400).json({
            success: false,
            message: "Name, age and course are required"
        });

    }

    const newStudent = {

        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,

        name: name,
        age: age,
        course: course

    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        student: newStudent
    });

});


// ==================================================
// 4. UPDATE STUDENT
// PUT /students/:id
// ==================================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    const { name, age, course } = req.body;

    // Check required fields
    if (!name || !age || !course) {

        return res.status(400).json({
            success: false,
            message: "Name, age and course are required"
        });

    }

    student.name = name;
    student.age = age;
    student.course = course;

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student: student
    });

});


// ==================================================
// 5. DELETE STUDENT
// DELETE /students/:id
// ==================================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    const deletedStudent =
        students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });

});


// Export router
module.exports = router;