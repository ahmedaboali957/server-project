const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let students = [];
let doctors = [];

app.post('/addHardcodedStudent', (req, res) => {
  const student = {
    name: "Ahmed",
    age: 20,
    level: "3rd year",
    address: "Cairo"
  };
  students.push(student);
  res.send({ message: "Hardcoded student added", student });
});

app.post('/addStudent', (req, res) => {
  const student = req.body;
  students.push(student);
  res.send({ message: "Student added from body", student });
});

app.post('/addDoctor', (req, res) => {
  const { name, age, phone } = req.query;
  const doctor = { name, age: Number(age), phone };
  doctors.push(doctor);
  res.send({ message: "Doctor added from query", doctor });
});

app.get('/students', (req, res) => {
  res.send(students);
});

app.delete('/deleteStudent/:name', (req, res) => {
  const { name } = req.params;
  students = students.filter(student => student.name !== name);
  res.send({ message: `Student with name ${name} deleted`, students });
});

app.put('/updateDoctorName', (req, res) => {
  const { oldName, newName } = req.query;
  const doctor = doctors.find(doc => doc.name === oldName);
  if (doctor) {
    doctor.name = newName;
    res.send({ message: "Doctor name updated", doctor });
  } else {
    res.status(404).send({ message: "Doctor not found" });
  }
});

app.get('/all', (req, res) => {
  res.send({ students, doctors });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
