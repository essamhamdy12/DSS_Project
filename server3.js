const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize Express app
let App = express();

App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

// Connect to MongoDB
let connectDB= async function () {

  try {
    mongoose.connect('mongodb+srv://useressam:Jnijv7gRJXJ3MVyo@cluster0.rbxgs.mongodb.net/Courses')
    console.log('Connected to MongoDB');

  }catch(error){
    console.log(error);
  }
  
}
connectDB();


// Define Schemas
const studentSchema=new mongoose.Schema({
  name:{
    type: String,
  },
  age :{
    type : Number,
  },
  phone:{
    type : String,
  },
  id : {type: String,   
  },
  address:{
    type : String,
  },
  email :{
    type :String,
  }
})
const Student =mongoose.model('Students',studentSchema)


new Student({
  name : 'Essam',
  age : 20,
  phone :'0109327363',
  id : "1789A",
  address : '123 street',
  email : 'essam@example.com',
}).save();
new Student({
  name : 'Hassan',
  age : 21,
  phone : '03634',
  id : "1789B",
  address : '456 street ',
  email : 'hassan@example.com',
}).save();



// CRUD Routes for Students
App.post('/students', async (req,res) => {
  let newStudent = new Student({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    id: req.body.id,
    address: req.body.address,
    email: req.body.email,
  }).save();
  res.status(200).json("student has created");
})

App.get('/students', async (req,res) => {
  let allStudent = await Student.find();
  return res.json(allStudent)
  
});



App.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    
    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.json(student);
  } catch (error) {
    res.status(500).send("An error occurred"+error.message);
  }
});


App.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { id: req.params.id },  // ابحث عن الطالب باستخدام الحقل `id` بدلاً من `_id`
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.json(student);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});




App.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });  // ابحث باستخدام `id` بدلاً من `_id`
    
    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.json(student);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});



const teacherSchema=new mongoose.Schema({
  name:{
    type: String,
  },
  age :{
    type : Number,
  },
  phone:{
    type : String,
  },
  id : {
    type: String,  //
  },
  subject: {
    type : String,
  },
  address:{
    type : String,
  },
  email :{
    type :String,
  }
})
const Teacher =mongoose.model('Teachers',teacherSchema)


new Teacher({
  name : 'Mohammed',
  age : 30,
  phone : '01093273635',
  id : '1789C',
  subject : 'Math',
  address : '789 street',
  email : 'mohammed@example.com',
}).save()
new Teacher({
  name : 'Yousef',
  age : 31,
  phone : '01093273636',
  id : '1789D',
  subject : 'Science',
  address : '101 street',
  email : 'yousef@example.com',
}).save();




// CRUD Routes for Teachers
App.post('/teachers', async (req,res) => {
  let newTeacher = new Teacher({
    name: req.body.name,
    age: req.body.age,
    phone: req.body.phone,
    id: req.body.id,
    subject: req.body.subject,
    address: req.body.address,
    email: req.body.email,
  }).save();
  res.status(200).json("teacher has created");
})

App.get('/teachers', async (req,res) => {
  let allTeacher = await Teacher.find();
  return res.json(allTeacher)
  
  });
  
App.get('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ id: req.params.id });  // استخدم findOne بدلاً من findById
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).send("An error occurred"+error.message);
  }
});




  App.put("/teachers/:id", async (req, res) => {
    try {
      const teacher = await Teacher.findOneAndUpdate(
        { id: req.params.id },  // ابحث عن المدرس باستخدام الحقل `id` بدلاً من `_id`
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!teacher) {
        return res.status(404).send("Teacher not found");
      }
  
      res.json(teacher);
    } catch (error) {
      res.status(500).send("An error occurred");
    }
  });
  

  

  App.delete("/teachers/:id", async (req, res) => {
    try {
      const teacher = await Teacher.findOneAndDelete({ id: req.params.id });  // ابحث عن المدرس باستخدام الحقل `id` بدلاً من `_id`
      
      if (!teacher) {
        return res.status(404).send("Teacher not found");
      }
  
      res.json(teacher);
    } catch (error) {
      res.status(500).send("An error occurred");
    }
  });
  



  //schema Courses
const courseSchema=new mongoose.Schema({
  course_name:{
    type: String,
  },
  teacher_name :{
    type : String,
  },
  duration: {
    type: String,
  }
})
const Course =mongoose.model('Courses',courseSchema)

new Course({
  course_name : 'Math',
  teacher_name : 'Mohamed',
  duration : '4 months',
}).save();
new Course({
  course_name : 'Science',
  teacher_name : 'Yousef',
  duration : '3 months',
}).save();

App.get('/courses', async (req,res) => {
  let allCourses = await Course.find();
  return res.json(allCourses)
})



// Start the server
App.listen(9090, function(){
  console.log('Welecom , Server is running');
})
