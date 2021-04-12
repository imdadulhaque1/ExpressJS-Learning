 // Express
 const express = require('express');
 const app = express();
const db = require('./db');
 app.use(express.json());

 app.get('/', (request, response) =>{
          response.send("Hello from express js !");
 });

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

app.route('/api/students')
          .get(studentList)
          .post(newStudent);
app.route('/api/students/:id')
          .get(studentDetail)
          .put(studentUpdate)
          .delete(studentDelete);


 const port = 3000;
//  const port = 3001;

 app.listen(port, () =>{
          console.log(`Listening on port ${port}.........`);
 })
