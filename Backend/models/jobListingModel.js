const mongoose = require('mongoose');

const { Schema } = mongoose;

const jobListingSchema = new Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
  },
  logoUrl: {
    type: String,
  },
  jobPosition: {
    type: String,
    required: [true, 'Job position is required'],
  },
  monthlySalary: {
    type: String,
    required: [true, 'Monthly salary is required'],
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
  },
  remoteOrOffice: {
    type: String,
    required: [true, 'Remote/In-Office is required'],
  },
  location: {
    type: String,
    // required: [true, "Job location is required"],
  },
  jobDescription: {
    type: String,
    required: [true, 'Job description is required'],
  },
  aboutCompany: {
    type: String,
    required: [true, 'About company is required'],
  },
  skillsRequired: {
    type: [String],
    required: [true, 'Skills required is required'],
  },
  information: {
    type: [String],
    required: [true, 'Additional Information required is required'],
  },
  createdAt: { type: Date, default: Date.now },
});

const jobListingModel = mongoose.model('JobListing', jobListingSchema);

module.exports = jobListingModel;
