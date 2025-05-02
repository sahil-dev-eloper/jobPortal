import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        console.log("this is user id", userId);
        console.log("this is job id", jobId);
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required",
                success: false
            })
        };

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        console.log("This is existing jobid", existingApplication)

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        console.log("An error occured", error);
    }
};
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No applications",
                success: false
            })
        };

        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log("An error occured", error)
    }
}

// admin dekhega ki admin ne kitna apply kiya h 
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log("An error occured", error)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(404).json({
                message: "Status is required",
                success: false
            })
        };

        // find the apllication by application id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });

    } catch (error) {
        console.log("An error occured", error)
    }
}

export const acceptApplication = async (req, res) => {
    const { jobId, applicantId } = req.params;

    try {
        // Step 1: Fetch the job
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        // Step 2: Find the application
        const application = job.applications.find(
            (app) => app.applicant.toString() === applicantId
        );
        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        // Step 3: Check if already accepted
        if (application.status === 'accepted') {
            return res.status(400).json({ success: false, message: 'Already accepted' });
        }

        // Step 4: Update application status and decrement position
        application.status = 'accepted';
        job.position = Math.max(0, job.position - 1); // Ensure non-negative

        // Step 5: Save
        await job.save();

        return res.status(200).json({
            success: true,
            message: 'Application accepted. Job position updated.',
            job,
        });
    } catch (error) {
        console.error('Error accepting application:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

