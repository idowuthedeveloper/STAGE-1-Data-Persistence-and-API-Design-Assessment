import Profile from "../models/Profile.js";

export const getAllProfiles = async (req, res) => {
  try {
    if (req.query) {
      const params = {};
      if (req.query.gender) {
        params.gender = req.query.gender;
      }

      if (req.query.country_id) {
        params.country_id = req.query.country_id.toUpperCase();
      }

      if (req.query.age_group) {
        params.age_group = req.query.age_group;
      }

      let filteredProfiles = await Profile.find(params);
      const filteredProfilesCount = filteredProfiles.length;

      filteredProfiles = filteredProfiles.map((profile) => {
        return {
          id: profile.id,
          name: profile.name,
          gender: profile.gender,
          age: profile.age,
          age_group: profile.age_group,
          country_id: profile.country_id,
        };
      });

      // const data = {
      //   count: filteredProfilesCount,
      //   data: filteredProfiles,
      // };

      return res
        .status(200)
        .json({
          status: "success",
          count: filteredProfilesCount,
          data: filteredProfiles,
        });
    }

    let profiles = await Profile.find();
    const count = await Profile.countDocuments().exec();

    profiles = profiles.map((profile) => {
      return {
        id: profile.id,
        name: profile.name,
        gender: profile.gender,
        age: profile.age,
        age_group: profile.age_group,
        country_id: profile.country_id,
      };
    });

    const data = {
      count,
      data: profiles,
    };

    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    console.log(req.params.id);
    const profile = await Profile.findOne({ id: req.params.id }).exec();
    if (!profile) {
      return res
        .status(404)
        .json({ status: "error", message: "Profile not found" });
    }

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

    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteProfileById = async (req, res) => {
  try {
    await Profile.deleteOne({ id: req.params.id });
    return res
      .status(204)
      .json({ status: "success", message: "Profile deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
