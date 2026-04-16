import { v7 as uuidv7 } from "uuid";
import processAge from "./processAge.js";
import processGender from "./processGender.js";
import processNationality from "./processNationality.js";
import Profile from "../models/Profile.js";

const newProfile = async (req, res) => {
  try {
    // Validate name query parameter presence
    if (!req.body.name || req.body.name === "") {
      return res
        .status(400)
        .json({ status: "error", message: "Name parameter is missing" });
    }

    // Validate that name is not numeric
    if (isFinite(req.body.name)) {
      return res
        .status(422)
        .json({ status: "error", message: "Name can only be string" });
    }

    const { name, gender, gender_probability, sample_size } =
      await processGender(req, res);

    const { age, age_group } = await processAge(req, res);

    const { country_id, probability } = await processNationality(req, res);

    const newProfileData = {
      name,
      gender,
      gender_probability,
      sample_size,
      age,
      age_group,
      country_id,
      country_probability: probability,
    };

    const existingProfile = await Profile.findOne({
      name: newProfileData.name,
    });

    if (existingProfile) {
      return res.json({
        status: "success",
        message: "Profile already exists",
        data: {
          id: existingProfile.id,
          name: existingProfile.name,
          gender: existingProfile.gender,
          gender_probability: existingProfile.gender_probability,
          sample_size: existingProfile.sample_size,
          age: existingProfile.age,
          age_group: existingProfile.age_group,
          country_id: existingProfile.country_id,
          country_probability: existingProfile.country_probability,
          created_at: existingProfile.created_at,
        },
      });
    }

    const profile = await Profile.create(newProfileData);
    const data = {
      id: profile.id,
      name: profile.name,
      gender: profile.gender,
      gender_probability: profile.gender_probability,
      sample_size: profile.sample_size,
      age: profile.age,
      age_group: profile.age_group,
      country_id: profile.country_id,
      country_probability: profile.country_probability,
      created_at: profile.created_at,
    };

    return res.status(201).json({ status: "success", data });
  } catch (error) {
    return res.json({ status: "error", message: error.message }); // Handle unexpected errors
  }
};

export default newProfile;
