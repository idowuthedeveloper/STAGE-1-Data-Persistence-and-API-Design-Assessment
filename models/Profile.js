import mongoose from "mongoose";
import { v7 as uuidv7 } from "uuid";

const { Schema } = mongoose;

const profileSchema = new Schema({
  id: {
    type: String,
    unique: true,
    default: () => uuidv7(), // Generate a unique identifier for the profile
  },
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female"] },
  gender_probability: { type: Number, required: true },
  sample_size: { type: Number, required: true },
  age: { type: Number, required: true },
  age_group: {
    type: String,
    required: true,
  },
  country_id: { type: String, required: true },
  country_probability: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

profileSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret._id; // Remove MongoDB's default _id field
    delete ret.__v; // Remove MongoDB's default __v field
    return ret;
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
