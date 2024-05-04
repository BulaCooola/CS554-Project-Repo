export async function fetchBrackets(_id) {
  try {
    const response = await fetch(`/api/profile/hostedTournaments?playerId=${_id}`, {
      method: "GET",
    });

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

export async function fetchCompetitions(_id) {
  try {
    const response = await fetch(`/api/profile/attendedTournaments?playerId=${_id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch user's tournaments", response.status);
      return null;
    }
  } catch (e) {
    console.error("Error fetching: ", error);
  }
}

export async function fetchLedTeams(_id) {
  try {
    const response = await fetch(`/api/profile/ledTeams?playerId=${_id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch user's teams", response.status);
      return null;
    }
  } catch (e) {
    console.error("Error fetching: ", error);
  }
}

export async function fetchAffiliatedTeams(_id) {
  try {
    console.log(_id);
    const response = await fetch(`/api/profile/affiliatedTeams?playerId=${_id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch user's teams", response.status);
      return null;
    }
  } catch (e) {
    console.error("Error fetching: ", error);
  }
}
