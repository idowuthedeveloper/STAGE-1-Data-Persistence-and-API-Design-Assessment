const baseURL = "https://api.nationalize.io"; // Base URL for the external Nationalize API

const nationalizeName = async (name) => {
  try {
    // Request nationality prediction data for the given name
    const response = await fetch(`${baseURL}?name=${name}`);
    return await response.json(); // Parse and return JSON response
  } catch (error) {
    throw error; // Propagate any errors to the caller
  }
};

export default nationalizeName; // Export the helper function for use in other modules
