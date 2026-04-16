import nationalizeName from "../services/nationalize.js";

const processNationality = async (req, res) => {
  try {
    const data = await nationalizeName(req.body.name);

    if (data.country.length === 0 || data.count === 0) {
      return res.status(502).json({
        status: "502",
        message: "Nationalize returned an invalid response",
      });
    }

    return data.country[0];
  } catch (error) {
    return res.json({ status: "error", message: error.message }); // Handle unexpected errors
  }
};

export default processNationality;
