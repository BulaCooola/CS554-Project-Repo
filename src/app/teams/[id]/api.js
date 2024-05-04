export async function fetchTeam(_id) {
  try {
    const response = await fetch(`/api/teams/${_id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data.team;
    } else {
      console.error("Failed to fetch teams:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching teams:", error);
    return null;
  }
}
