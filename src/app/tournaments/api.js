export async function fetchTournaments() {
  try {
    const response = await fetch("/api/tournaments", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.allTournaments;
    } else {
      console.error("Failed to fetch tournaments:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return null;
  }
}
