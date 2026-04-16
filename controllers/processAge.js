import agifyName from "../services/agify.js";

const processAge = async (req, res) => {
  try {
    const data = await agifyName(req.body.name);

    if (data.age === null || data.count === 0) {
      return res.status(502).json({
        status: "502",
        message: "Agify returned an invalid response",
      });
    }

    if (data.age >= 0 && data.age <= 12) {
      data.age_group = "child";
    }

    if (data.age >= 13 && data.age <= 19) {
      data.age_group = "teenager";
    }

    if (data.age >= 20 && data.age <= 59) {
      data.age_group = "adult";
    }

    if (data.age >= 60) {
      data.age_group = "senior";
    }

    return data;
  } catch (error) {
    return res.json({ status: "error", message: error.message }); // Handle unexpected errors
  }
};

export default processAge;
