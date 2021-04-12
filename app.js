 // Express
 const express = require('express');
 const app = express();
const db = require('./db');
 app.use(express.json());

 app.get('/', (request, response) =>{
          response.send("Hello from express js !");
 });

 app.get('/api/students', (request, response) => {
          db.getDBStudents()
                    .then(students =>{
                              response.send(students);
                    })
 });
 app.post('/api/students', (request, response) => {
          const student = request.body;
          db.getDBStudents()
                    .then(students =>{
                              students.push(student);
                              db.insertDbStudent(students)
                                        .then(data=>{
                                                  response.send(student);
                                        })
                    })
 });

 app.get('/api/students/:id', (request, response) =>{
          const id=parseInt(request.params.id);
          db.getDBStudents()
                    .then(students=>{
                              const student = students.find(s => s.id === id);
                              if(!student) response.status(404).send("No student found with this ID!");
                              else response.send(student);
                    })
 })

 app.put('/api/students/:id', (request, response) =>{
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
 } )

 app.delete('/api/students/:id', (request, response) =>{
          const id =parseInt(request.params.id);
          db.getDBStudents()
                    .then(students=>{
                              const student = students.find(s => s.id === id);
                              if(!student) response.status(404).send("No student found with this ID!");
                              const updatedStudents = students.filter(s=> s.id !== id);
                              db.insertDbStudent(updatedStudents)
                                        .then(msg => response.send(student));
                    })
 })


 const port = 3000;
//  const port = 3001;

 app.listen(port, () =>{
          console.log(`Listening on port ${port}.........`);
 })
