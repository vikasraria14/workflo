// populateTasks.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/task.model');

dotenv.config();

const userId = '66a893dc0bc8e926cd921f95';

const initialTasks = [
  {
    title: "Project initiation and planning",
    description: "Initial phase of the project",
    status: "completed",
    priority: "Medium",
    deadline: new Date("2023-07-01")
  },
  {
    title: "Gather requirements from stakeholders",
    description: "Meeting with stakeholders to gather requirements",
    status: "completed",
    priority: "Urgent",
    deadline: new Date("2023-07-05")
  },
  {
    title: "Create wireframes and mockups",
    description: "Design the initial wireframes and mockups",
    status: "completed",
    priority: "Medium",
    deadline: new Date("2023-07-10")
  },
  {
    title: "Develop homepage layout",
    description: "Start developing the homepage layout",
    status: "inProgress",
    priority: "Urgent",
    deadline: new Date("2023-07-20")
  },
  {
    title: "Design color scheme and typography",
    description: "Choose colors and typography for the website",
    status: "inProgress",
    priority: "Medium",
    deadline: new Date("2023-07-25")
  },
  {
    title: "Implement user authentication",
    description: "Add user signup and login functionality",
    status: "toDo",
    priority: "Urgent",
    deadline: new Date("2023-07-30")
  },
  {
    title: "Build contact us page",
    description: "Develop the contact us page",
    status: "toDo",
    priority: "Low",
    deadline: new Date("2023-08-01")
  },
  {
    title: "Create product catalog",
    description: "List all products on the website",
    status: "toDo",
    priority: "Urgent",
    deadline: new Date("2023-08-05")
  },
  {
    title: "Develop about us page",
    description: "Create the about us page",
    status: "toDo",
    priority: "Low",
    deadline: new Date("2023-08-10")
  },
  {
    title: "Optimize website for mobile devices",
    description: "Ensure the website is responsive",
    status: "toDo",
    priority: "Medium",
    deadline: new Date("2023-08-15")
  },
  {
    title: "Integrate payment gateway",
    description: "Set up payment gateway for transactions",
    status: "toDo",
    priority: "Urgent",
    deadline: new Date("2023-08-20")
  },
  {
    title: "Perform testing and bug fixing",
    description: "Thoroughly test the website and fix bugs",
    status: "toDo",
    priority: "Urgent",
    deadline: new Date("2023-08-25")
  },
  {
    title: "Launch website and deploy to server",
    description: "Deploy the website to the live server",
    status: "toDo",
    priority: "Urgent",
    deadline: new Date("2023-08-30")
  }
];



 let saveTasks = async()=>{
    for (let taskData of initialTasks) {
        const task = new Task({ ...taskData, user: userId });
        await task.save();
      }
    
      console.log('Tasks have been populated');
 }
//  saveTasks()
 
