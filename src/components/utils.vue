<script>
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earthradius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000; // Convert to meters
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


//local storage for checkbutton
// {key = GebaeudeName, btnclick = Boolean, explored = Boolean}

export function saveToLS(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
export function getFromLS(key) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
  }


</script>
