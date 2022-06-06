async function newFormHandler(event) {
  event.preventDefault();

  const title = document
    .getElementById("create-form")
    .querySelector("input").value;
  const content = document
    .getElementById("create-form")
    .querySelector("textarea").value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".create-form")
  .addEventListener("submit", newFormHandler);
