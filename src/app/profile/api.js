export async function fetchBrackets(_id) {
  try {
    const response = await fetch(`/api/profile?playerId=${_id}`, {
      method: "GET",
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch user's tournaments", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching:", error);
    return null;
  }
}
