
export const fetchWithCache = async (key, fetchDataFn, ttl = 3600) => {
    const now = Date.now();
    const cachedData = localStorage.getItem(key);
  
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (now - parsedData.timestamp < ttl * 1000) {
        return parsedData.data;
      }
    }
  
    const data = await fetchDataFn();
    localStorage.setItem(
      key,
      JSON.stringify({ data, timestamp: now })
    );
    return data;
  };