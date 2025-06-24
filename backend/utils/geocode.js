const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'localtreasure-app' }
    });

    const data = await res.json();
    if (!data || data.length === 0) {
      return null; // ✅ this line is critical
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

module.exports = { geocodeAddress };