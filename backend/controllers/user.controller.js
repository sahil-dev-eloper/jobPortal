import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Creating the Register function
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: 'auto'
        });


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message: 'Account created successfully',
            success: true
        })
    } catch (error) {
        console.log('Some error occurred', error)
    }
}

// Creating the Login function
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        // Checking whether the role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist for this role",
                success: false
            })
        }

        // Creating the token for user (expires in 1 day)
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Restructuring the data to include only the useful things in it
        let userData = {
            _id: user.id,
            fullname: user.fullname,  // Corrected typo here
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${userData.fullname}`, // Fixed the template string
            success: true,
            user: userData
        })
    } catch (error) {
        console.log('Some error occurred', error)
    }
}

// Creating the Logout function
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully',
            success: true
        })
    } catch (error) {
        console.log('Some error occurred', error)
    }
}

// Update Profile function
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // Cloudinary aaega idhar.....
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: 'auto'
        });

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }
        const userId = req.id;  // Middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: 'User not found',
                success: true
            })
        }

        // Updating the data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Resume part comes later here......
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url  // save the cloudinary url here
            user.profile.resumeOriginalName = file.originalname   // saves the original file name
        }

        await user.save();

        // Restructuring the data to include only the useful things in it
        let updatedUser = {
            _id: user.id,
            fullname: user.fullname, // Corrected typo here
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true
        })
    } catch (error) {
        console.log('Something went wrong', error);
    }
}   