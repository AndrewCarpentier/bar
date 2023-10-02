const API_ETABLISHMENT = "http://localhost:8000/api/etablishment";

export async function CreateEtablishment(name, idUser, email) {
  const response = await fetch(`${API_ETABLISHMENT}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, idUser, email }),
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

export async function GetEtablishmentsByUserId(idUser) {
  const response = await fetch(`${API_ETABLISHMENT}/getAll/${idUser}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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

export async function GetEtablishmentByEtablishmentId(idEtablishment) {
  const response = await fetch(
    `${API_ETABLISHMENT}/getOneById/${idEtablishment}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

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

export async function UpdateEtablishment(etablishment) {
  const response = await fetch(`${API_ETABLISHMENT}/updateEtablishment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ etablishment }),
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

export async function AddNewTeamMember(etablishment, email) {
  const response = await fetch(`${API_ETABLISHMENT}/addNewTeamMember`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ etablishment, email }),
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

export async function DeleteUser(etablishment, idxUserDelete) {
  const response = await fetch(`${API_ETABLISHMENT}/deleteUserById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ etablishment, idxUserDelete }),
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

export async function deleteProductById(etablishment, idProductDelete) {
  const response = await fetch(`${API_ETABLISHMENT}/deleteProductById`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ etablishment, idProductDelete }),
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