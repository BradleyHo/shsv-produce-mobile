// Rate limit our requests to be nice to the Nominatim API
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const geocodeAddress = async (address, city, state = 'CA') => {
  try {
    const query = encodeURIComponent(`${address}, ${city}, ${state}`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
    );
    await sleep(1000); // Be nice to the API
    
    const data = await response.json();
    if (data && data[0]) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    throw new Error('Location not found');
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};