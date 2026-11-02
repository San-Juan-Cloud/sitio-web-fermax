// Destinatario previsto: rrhh@fermaxarg.com.ar.
// El servidor debe validar los datos, el PDF y consentimiento, limitar abusos
// y fijar el destinatario. No incluir credenciales SMTP en el navegador.
const APPLICATION_ENDPOINT = ""; // Activar cuando estén configurados casilla y servidor.
const form = document.getElementById("jobsForm");
const status = document.getElementById("jobsStatus");
const submit = document.getElementById("jobsSubmit");
if (APPLICATION_ENDPOINT) { submit.disabled = false; status.textContent = "Los campos con * son obligatorios."; }
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!APPLICATION_ENDPOINT || !form.reportValidity()) return;
  const file = form.elements.cv.files[0];
  if (file && (file.size > 5 * 1024 * 1024 || !/\.pdf$/i.test(file.name))) { status.textContent = "Adjuntá un PDF de hasta 5 MB."; return; }
  submit.disabled = true;
  status.textContent = "Enviando tu postulación…";
  try {
    const response = await fetch(APPLICATION_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("No enviado");
    const result = await response.json();
    if (result.success !== true) throw new Error("Sin confirmación");
    form.reset(); status.textContent = "Recibimos tu postulación. Gracias por tu interés en FERMAX.";
  } catch { status.textContent = "No pudimos confirmar el envío. Tus datos siguen en el formulario para que puedas volver a intentarlo."; }
  finally { submit.disabled = false; }
});
