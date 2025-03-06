import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    company: {
        type: String,
        trim: true,
        default: "",
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        default: null, // Avoids unique constraint issues
    },
    address: {
        type: Object,
        default: {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
    },
    projectsPosted: {
        type: Number,
        default: 0,
    },
    projectsCompleted: {
        type: Number,
        default: 0,
    },
    projects: [
        {
            title: { type: String, default: "" },
            description: { type: String, default: "" },
            budget: { type: Number, default: 0 },
            skillsRequired: { type: [String], default: [] },
            deadline: { type: Date, default: null },
            completed: { type: Boolean, default: false },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
export default Employee;
