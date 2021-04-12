const express = require('express');
const router = express.Router();
const db = require('../db');

const studentList = (request, response) => {
          db.getDBStudents()
                    .then(students =>{
                              response.send(students);
                    })
 };

 const newStudent = (request, response) => {
          const student = request.body;
          db.getDBStudents()
                    .then(students =>{
                              students.push(student);
                              db.insertDbStudent(students)
                                        .then(data=>{
                                                  response.send(student);
                                        })
                    })
 };

 const studentDetail = (request, response) =>{
          const id=parseInt(request.params.id);
          db.getDBStudents()
                    .then(students=>{
                              const student = students.find(s => s.id === id);
                              if(!student) response.status(404).send("No student found with this ID!");
                              else response.send(student);
                    })
 };

 const studentUpdate = (request, response) =>{
          const id = parseInt(request.params.id);
          const updatedData = request.body;
          db.getDBStudents()
                    .then(students =>{
                              const student = students.find(s => s.id === id);
                              if(!student) response.status(404).send("No student found with this ID!");
                              else{
                                        const i=students.findIndex(s=>s.id === id);
                                        students[i] = updatedData;
                                        db.insertDbStudent(students)
                                                  .then(msg => response.send(updatedData));
                              }
                    })
 };

 const studentDelete = (request, response) =>{
          const id =parseInt(request.params.id);
          db.getDBStudents()
                    .then(students=>{
                              const student = students.find(s => s.id === id);
                              if(!student) response.status(404).send("No student found with this ID!");
                              const updatedStudents = students.filter(s=> s.id !== id);
                              db.insertDbStudent(updatedStudents)
                                        .then(msg => response.send(student));
                    })
 };

router.route('/')
          .get(studentList)
          .post(newStudent);
          
router.route('/:id')
          .get(studentDetail)
          .put(studentUpdate)
          .delete(studentDelete);

module.exports = router;