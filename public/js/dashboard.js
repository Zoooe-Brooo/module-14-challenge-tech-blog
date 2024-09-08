const blogItem = document.querySelector(".blog-item");
const newPost = document.querySelector("#new-post");

blogItem.addEventListener("click", (event) => {
  const blogId = event.target.getAttribute("data-id");
  window.location.replace(`/user/blog/${blogId}`);
});

newPost.addEventListener("click", () => {
  window.location.replace("/user/:id/newblog");
});
