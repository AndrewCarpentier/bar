const API_AUTH = "http://localhost:8000/api/auth";

export async function signup(newUser) {
  const response = await fetch(`${API_AUTH}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  const backResponse = await response.json();
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error api");
    }
  }
}

export async function signin(user) {
  const response = await fetch(`${API_AUTH}/signin`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const backResponse = await response.json();
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error api");
    }
  }
}

export async function updatePassword(password, email) {
  const response = await fetch(`${API_AUTH}/updatePassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  });

  const backResponse = await response.json();
  if (response.ok) {
    return backResponse;
  } else {
    if (backResponse) {
      throw backResponse;
    } else {
      throw new Error("Error api");
    }
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_AUTH}/current`, {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
}

export async function signout() {
  await fetch(`${API_AUTH}/signout`, {
    method: "DELETE",
    credentials: "include",
  });
}
