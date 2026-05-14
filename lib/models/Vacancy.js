import mongoose from 'mongoose';

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Назва посади є обов\'язковою'],
    trim: true,
    maxlength: [150, 'Назва посади не може бути довшою за 150 символів'],
  },
  company: {
    type: String,
    required: [true, 'Назва компанії є обов\'язковою'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Категорія є обов\'язковою'],
    enum: {
      values: ['IT', 'Security', 'HR', 'Management'],
      message: 'Категорія має бути однією з визначених у списку',
    },
  },
  salary: {
    type: Number,
    required: [true, 'Зарплата є обов\'язковою'],
    min: [1, 'Зарплата не може бути нульовою або від\'ємною'],
  },
  type: {
    type: String,
    enum: {
      values: ['Remote', 'Office', 'Hybrid'],
      message: 'Тип зайнятості має бути Remote, Office або Hybrid',
    },
    default: 'Remote',
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  
  timestamps: true, 
});

vacancySchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    const ApplicationItem = mongoose.model("ApplicationItem");
    const Application = mongoose.model("Application");

    
    const affectedApplications = await ApplicationItem
      .find({ vacancy: doc._id }).distinct("application");

   
    await ApplicationItem.deleteMany({ vacancy: doc._id });

   
    for (const appId of affectedApplications) {
      const remainingItems = await ApplicationItem.countDocuments({ application: appId });
      if (remainingItems === 0) {
        await Application.deleteOne({ _id: appId });
      }
    }
  }
  next();
});
export default mongoose.models.Vacancy || mongoose.model('Vacancy', vacancySchema);