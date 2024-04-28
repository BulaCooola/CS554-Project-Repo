export async function fetchUsers() {
  try {
    const response = await fetch("/api/users", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.userList;
    } else {
      console.error("Failed to fetch users:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
}
