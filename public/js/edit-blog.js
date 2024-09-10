const editForm = document.querySelector("#edit-form");
const editTitle = document.querySelector("#edit-title");
const editContent = document.querySelector("#edit-content");
const updateButton = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");

const blogId = document.location.pathname.split("/")[3];
const userId = document
  .getElementById("delete-button")
  .getAttribute("data-userid");

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = editTitle.value.trim();
  const content = editContent.value.trim();

  if (title && content) {
    const response = await fetch(`/api/user/blog/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/user/${userId}`);
    } else {
      alert("Failed to update post.");
    }
  }
};

const deleteFormHandler = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/user/blog/${blogId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/user/${userId}`);
  } else {
    alert("Failed to delete post.");
  }
};

updateButton.addEventListener("click", editFormHandler);

deleteButton.addEventListener("click", deleteFormHandler);
