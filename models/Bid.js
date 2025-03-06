import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    femail: {
        type: String,
        required: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    deltime: {
        type: Date,
    },
    coverletter: {
        type: String,
        default: "-"
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, "Invalid phone number format"]
      }

});

const Bid = mongoose.models.Bid || mongoose.model("Bid", BidSchema);
export default Bid;
