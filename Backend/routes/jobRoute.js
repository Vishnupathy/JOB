const express = require('express');
const authenticateUser = require('../middleware/auth');
const {
  addJob,
  updateJob,
  getAllJobs,
  getOneJob,
} = require('../controllers/jobs');

const jobRouter = express.Router();

jobRouter.route('/create-job').post(authenticateUser, addJob); // Create a new job listing (protected route)
jobRouter.route('/create-job/:id').put(authenticateUser, updateJob); //Update any job posted
jobRouter.route('/job').get(getAllJobs); // List all jobs with filters based on skills
jobRouter.route('/job/:id').get(getOneJob); // Show the detailed description of a job post

module.exports = jobRouter;
