const API = "https://api.mail.tm";
let token = "";
let inbox = [];

async function newMail() {
  const domains = await fetch(API + "/domains").then(r => r.json());
  const domain = domains["hydra:member"][0].domain;

  const email = Math.random().toString(36).slice(2,10) + "@" + domain;
  const password = Math.random().toString(36);

  await fetch(API + "/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password })
  });

  const t = await fetch(API + "/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password })
  }).then(r => r.json());

  token = t.token;
  document.getElementById("email").innerText = email;
}

async function refreshInbox() {
  if (!token) return;

  const r = await fetch(API + "/messages", {
    headers: { Authorization: "Bearer " + token }
  }).then(r => r.json());

  inbox = r["hydra:member"] || [];
  renderInbox();
}

function renderInbox() {
  const list = document.getElementById("inboxList");
  const count = document.getElementById("count");
  list.innerHTML = "";
  count.innerText = inbox.length + " messages";

  inbox.forEach(m => {
    const div = document.createElement("div");
    div.className = "mail";
    div.innerHTML = `
      <h4>${m.subject || "No subject"}</h4>
      <p>${m.intro || ""}</p>
    `;
    div.onclick = () => readMail(m.id);
    list.appendChild(div);
  });
}

async function readMail(id) {
  const r = await fetch(API + "/messages/" + id, {
    headers: { Authorization: "Bearer " + token }
  }).then(r => r.json());

  document.getElementById("sheetTitle").innerText =
    r.subject || "Message";

  document.getElementById("sheetBody").innerText =
    r.text || "No content";

  document.getElementById("sheet").classList.add("show");
}

function closeSheet() {
  document.getElementById("sheet").classList.remove("show");
}

function copyMail() {
  navigator.clipboard.writeText(
    document.getElementById("email").innerText
  );
}

function clearInbox() {
  inbox = [];
  renderInbox();
}

newMail();
setInterval(refreshInbox, 2000);
