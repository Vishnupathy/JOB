const JobListing = require('../models/jobListingModel');

exports.addJob = async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOrOffice,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    } = req.body;

    // Check if all the required fields are provided
    if (
      !companyName ||
      !jobPosition ||
      !jobDescription ||
      !skillsRequired ||
      !aboutCompany ||
      !monthlySalary ||
      !jobType ||
      !remoteOrOffice ||
      !logoUrl ||
      !information
    ) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields' });
    }

    // If jobType is "remote", set location to empty string
    const updatedlocation = location === '' ? 'Remote' : location;

    const updatedLogoURL = req.body.logoUrl
      ? req.body.logoUrl
      : 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250';

    // Create a new job listing
    const newJobListing = new JobListing({
      companyName,
      logoUrl: updatedLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOrOffice,
      location: updatedlocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    });

    await newJobListing.save();

    res.status(201).json({ message: 'Job listing created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  console.log('Update///');
  try {
    const jobId = req.params.id;
    console.log(jobId);
    const {
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOrOffice,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information,
    } = req.body;

    // Check if all the required fields are provided
    if (
      !companyName ||
      !jobPosition ||
      !jobDescription ||
      !skillsRequired ||
      !aboutCompany ||
      !monthlySalary ||
      !jobType ||
      !remoteOrOffice ||
      !logoUrl ||
      !information
    ) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields' });
    }

    const updatedlocation = location === '' ? 'Remote' : location;

    const updatedLogoURL = req.body.logoUrl
      ? req.body.logoUrl
      : 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250';

    // Find the existing job listing by ID
    const jobListing = await JobListing.findById(jobId);

    if (!jobListing) {
      return res.status(404).json({ error: 'Job listing not found' });
    }

    // Update the job listing fields
    jobListing.companyName = companyName;
    jobListing.logoUrl = updatedLogoURL;
    jobListing.jobPosition = jobPosition;
    jobListing.monthlySalary = monthlySalary;
    jobListing.jobType = jobType;
    jobListing.remoteOrOffice = remoteOrOffice;
    jobListing.location = updatedlocation;
    jobListing.jobDescription = jobDescription;
    jobListing.aboutCompany = aboutCompany;
    jobListing.skillsRequired = skillsRequired;
    jobListing.information = information;

    // Save the updated job listing
    await jobListing.save();

    res.status(200).json({ message: 'Job listing updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const { skills, searchTerm } = req.query;

    const filter = {};
    if (skills) filter.skillsRequired = { $in: skills.split(',') };
    if (searchTerm) filter.jobPosition = new RegExp(searchTerm, 'i');

    // Find job listings that match the filter
    const jobs = await JobListing.find(filter);

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;

    // Find the job listing by ID
    const job = await JobListing.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: 'Job listing not found' });
    }

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
