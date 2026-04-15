import genderizeName from "../services/genderize.js";

const processGender = async (req, res) => {
  try {
    // Get gender prediction data from external service
    const data = await genderizeName(req.body.name);

    // Handle case when the API cannot predict a gender
    if (data.gender === null || data.count === 0) {
      return res.status(502).json({
        status: "502",
        message: "Genderize returned an invalid response",
      });
    }

    const genderDataFromName = {
      name: data.name,
      gender: data.gender,
      gender_probability: data.probability,
      sample_size: data.count,
    };

    return genderDataFromName;
  } catch (error) {
    return res.json({ status: "error", message: error.message }); // Handle unexpected errors
  }
};

export default processGender; // Export middleware for route handling
