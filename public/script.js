// CREATE PASTE
async function createPaste() {
  const content = document.getElementById("content").value;
  const expiry = document.getElementById("expiry").value;

  if (!content) {
    alert("Content required");
    return;
  }

  const res = await fetch("/api/paste", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      expiresIn: expiry ? Number(expiry) : undefined,
    }),
  });

  const data = await res.json();

  if (data.url) {
    document.getElementById("result").innerHTML =
      `Paste created: <a href="${data.url}" target="_blank">${data.url}</a>`;
  } else {
    document.getElementById("result").innerText = "Error creating paste";
  }
}


// VIEW PASTE
async function loadPaste() {
  const parts = window.location.pathname.split("/");
  const id = parts[parts.length - 1];

  const res = await fetch(`/api/paste?id=${id}`);
  const data = await res.json();

  const box = document.getElementById("pasteContent");

  if (data.content) {
    box.innerText = data.content;
  } else {
    box.innerText = data.error || "Error loading paste";
  }
}

if (window.location.pathname.startsWith("/paste/")) {
  loadPaste();
}
