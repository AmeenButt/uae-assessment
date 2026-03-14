const Job = require('../models/Job');


// Create Job
exports.createJob = async (req, res) => {
    try {
        const { title, description } = req.body;

        const job = new Job({
            title,
            description
        });

        const savedJob = await job.save();

        res.status(201).json(savedJob);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getJobs = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const [totalJobs, jobs] = await Promise.all([
            Job.countDocuments(),
            Job.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
        ]);

        const totalPages = Math.ceil(totalJobs / limit);

        res.status(200).json({
            jobs,
            pagination: {
                total: totalJobs,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get Single Job
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update Job
exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(updatedJob);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete Job
exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};