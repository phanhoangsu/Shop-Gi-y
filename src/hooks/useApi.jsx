import { useState } from "react";

const BASE_URL = "https://ngochieuwedding.io.vn/api";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, endpoint, data = {}, id = "") => {
    setLoading(true);
    console.log(
      "Request started - loading:",
      true,
      "method:",
      method,
      "endpoint:",
      endpoint,
      "id:",
      id,
      "data:",
      data
    );
    try {
      const url = id ? `${BASE_URL}${endpoint}${id}` : `${BASE_URL}${endpoint}`;
      const resp = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(data) : undefined,
      });
      const result = await resp.json();
      console.log("Response received:", resp.status, result);
      if (!resp.ok) {
        throw new Error(
          result.message || `Request failed with status ${resp.status}`
        );
      }
      setLoading(false);
      console.log("Request completed - loading:", false);
      return result;
    } catch (err) {
      console.error("Request error:", err);
      setError(err.message);
      setLoading(false);
      console.log("Request failed - loading:", false);
      throw err;
    }
  };

  return { request, loading, error };
};

export default useApi;
