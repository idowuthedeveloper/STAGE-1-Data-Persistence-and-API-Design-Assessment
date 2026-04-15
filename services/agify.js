const baseURL = "https://api.agify.io"; // Base URL for the external Agify API

const agifyName = async (name) => {
  try {
    // Request age prediction data for the given name
    const response = await fetch(`${baseURL}?name=${name}`);
    return await response.json(); // Parse and return JSON response
  } catch (error) {
    throw error; // Propagate any errors to the caller
  }
};

export default agifyName; // Export the helper function for use in other modules
