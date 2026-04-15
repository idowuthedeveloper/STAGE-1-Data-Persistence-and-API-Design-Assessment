const baseURL = "https://api.genderize.io"; // Base URL for the external Genderize API

const genderizeName = async (name) => {
  try {
    // Request gender prediction data for the given name
    const response = await fetch(`${baseURL}?name=${name}`);
    return await response.json(); // Parse and return JSON response
  } catch (error) {
    throw error; // Propagate any errors to the caller
  }
};

export default genderizeName; // Export the helper function for use in other modules
