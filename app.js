 // Express
 const express = require('express');
 const app = express();

 app.get('/', (request, response) =>{
           response.send("Hello from express js !");
 });

 app.get('/another', (request, response) =>{
          response.send("I am another response !");
});

 app.get('/students', (request, response) =>{
          response.send(["Imdadul Haque", "Israt Jahan Maisha"]);
});

 const port = 3000;
//  const port = 3001;

 app.listen(port, () =>{
           console.log(`Listening on port 3000..........`);
 })
