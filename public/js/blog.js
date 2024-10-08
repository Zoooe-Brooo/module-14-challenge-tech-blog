const commentForm = document.querySelector("#comment-form");
const commentContent = document.querySelector("#comment-content");
const commentButton = document.querySelector("#comment-button");

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = commentContent.value.trim();
  const blog_id = document.location.pathname.split("/")[2];

  if (comment) {
    const response = await fetch(`/api/blog/${blog_id}`, {
      method: "POST",
      body: JSON.stringify({ comment_content: comment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment.");
    }
  }
};

commentForm.addEventListener("submit", commentFormHandler);
