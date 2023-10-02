const API_AUTH = "http://localhost:8000/api/product";

export async function addProduct(product, idEtablishment) {
  const response = await fetch(`${API_AUTH}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product, idEtablishment }),
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

export async function modifyProduct(product, idEtablishment, oldProduct) {
  const response = await fetch(`${API_AUTH}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product, idEtablishment, oldProduct }),
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
