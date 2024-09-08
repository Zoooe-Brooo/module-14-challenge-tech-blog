const newPostForm = document.querySelector("#new-post-form");
const newPostTitle = document.querySelector("#new-post-title");
const newPostContent = document.querySelector("#new-post-content");
const newPostButton = document.querySelector("#new-post-button");

const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = newPostTitle.value.trim();
  const content = newPostContent.value.trim();

  if (title && content) {
    const response = await fetch("/api/user/newblog", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/user/:id");
    } else {
      alert("Failed to create post.");
    }
  }
};

newPostForm.addEventListener("submit", newPostFormHandler);
