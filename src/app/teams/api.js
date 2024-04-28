export async function fetchTeams() {
  try {
    const response = await fetch("/api/teams", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data.allTeams;
    } else {
      console.error("Failed to fetch teams:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching teams:", error);
    return null;
  }
}
