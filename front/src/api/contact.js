const API_CONTACT = "http://localhost:8000/contact";

export async function ContactForm(contact) {
  const response = await fetch(`${API_CONTACT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
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