import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Кандидат обов'язковий"],
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "reviewing", "interviewing", "accepted", "rejected", "cancelled"],
      default: "pending",
      index: true,
    },
    notes: { type: String, maxlength: 500, default: "", trim: true },
  },
  {
    timestamps: true,
    toJSON:   { virtuals: true },
    toObject: { virtuals: true },
  }
);

applicationSchema.index({ user: 1, createdAt: -1 });


applicationSchema.virtual("items", {
  ref: "ApplicationItem",
  localField: "_id",
  foreignField: "application",
});
applicationSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    
    await mongoose.model("ApplicationItem").deleteMany({ application: doc._id });
  }
  next();
});
export default mongoose.models.Application || mongoose.model("Application", applicationSchema);