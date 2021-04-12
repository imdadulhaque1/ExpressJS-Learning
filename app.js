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

 const port = 3000;
//  const port = 3001;

 app.listen(port, () =>{
          console.log(`Listening on port ${port}.........`);
 })
