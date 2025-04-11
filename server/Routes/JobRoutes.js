const express = require("express");
const { Job, User } = require("../model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || assignment;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  console.log("inside middleware");
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.userId = decoded.userId;
    console.log("middleware passed");
    next();
  } catch (error) {
    console.log("middleware failed");
    res.status(401).json({ message: "Invalid token" });
  }
};

// Add Job Application
router.post("/addjob", verifyToken, async (req, res) => {
  try {
    const { company, Role, Status, DateOfApplication, Link } = req.body;

    const job = new Job({
      user: req.userId,
      company,
      Role,
      Status,
      DateOfApplication,
      Link,
    });

    await job.save();

    // Add Job ID to User's `Job` array
    await User.findByIdAndUpdate(req.userId, { $push: { Job: job._id } });

    res.status(200).json({ message: "Job application added", job });
  } catch (error) {
    res.status(500).json({ message: "Error adding job", error });
  }
});

router.get("/list", async (req, res) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.userId = decoded.userId;

    const jobs = await Job.find({ user: req.userId });

    res.status(200).json(jobs);
  } catch (err) {
    return res.status(500).json({ msg: "Error while finding jobs" });
  }
});

// List All Applications (Filtered)
router.get("/applications", verifyToken, async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;

    // Build Query
    let query = { user: req.userId };
    if (status) query.Status = status;
    if (startDate && endDate) {
      query.DateOfApplication = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const jobs = await Job.find(query);

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

// Update Job Status
router.patch("/update-job/:id", verifyToken, async (req, res) => {
  try {
    const { Status } = req.body;
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { Status },
      { new: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ message: "Job status updated", job });
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
});

// Delete Job Application
router.delete("/delete-job/:id", verifyToken, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!job) return res.status(404).json({ message: "Job not found" });

    // Remove Job from User's Job array
    await User.findByIdAndUpdate(req.userId, { $pull: { Job: req.params.id } });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
});

module.exports = router;
