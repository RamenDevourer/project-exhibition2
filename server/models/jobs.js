import mongoose from "mongoose";
const jobsSchema = mongoose.Schema(
    {
        jobPosition: {
            type: String,
        },
        employerUsername: {
            type: String,
            required : true,
        },
        companyName: {
            type : String,
        },
        city: {
            type : String,
        },
        companyName: {
            type : String,
        },
        salary: {
            type : Number,
        },
        workExperience: {
            type : Number,
        },
        startDate: {
            type : Date,
        },
        applyTill: {
            type : Date,
        },
        additionalInfoFromEmployer: {
            type : String,
        },
        skills: {
            type : String,
        },
    },
    {
        timestamps : true,
    }
);
export const Jobs = mongoose.model('Jobs', jobsSchema);