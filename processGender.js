import genderizeName from "./services/genderize.js";

const processGender = async (req, res) => {
  try {
    // Validate name query parameter presence
    if (!req.query.name || req.query.name === "") {
      return res
        .status(400)
        .json({ status: "error", message: "Name query parameter is missing" });
    }

    // Validate that name is not numeric
    if (isFinite(req.query.name)) {
      return res
        .status(422)
        .json({ status: "error", message: "Name can only be string" });
    }

    // Get gender prediction data from external service
    const data = await genderizeName(req.query.name);

    // Handle case when the API cannot predict a gender
    if (data.gender === null || data.count === 0) {
      return res.status(200).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    // Determine confidence based on probability and sample size
    const is_confident =
      data.probability >= 0.7 && data.count >= 100 ? true : false;

    const processedData = {
      name: data.name,
      gender: data.gender,
      probability: data.probability,
      sample_size: data.count,
      is_confident,
      processed_at: new Date(), // Timestamp for when response was processed
    };

    return res.status(200).json({ status: "success", data: processedData });
  } catch (error) {
    return res.json({ status: "error", message: error.message }); // Handle unexpected errors
  }
};

export default processGender; // Export middleware for route handling
