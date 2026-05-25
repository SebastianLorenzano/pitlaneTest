
const CONTACT_API_PATH = "/api/contact";

export async function sendContactForm(data: Record<string, string>): Promise<any> {
  const response = await fetch(CONTACT_API_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    // server-side validation or error
    throw result;
  }

  return result; // { status, message } or similar
}
