import mongoose from "mongoose";

const applicationItemSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },
    vacancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
      index: true,
    },
   
    salaryExpectation: { type: Number, required: true, min: 0 },
    
    coverLetter: { type: String, maxlength: 1000, trim: true }
  },
  { timestamps: true }
);

export default mongoose.models.ApplicationItem || 
  mongoose.model("ApplicationItem", applicationItemSchema);