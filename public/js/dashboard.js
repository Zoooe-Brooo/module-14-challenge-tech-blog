const blogItem = document.querySelector(".blog-item");
const newPost = document.querySelector("#new-post");

newPost.addEventListener("click", () => {
  window.location.replace(`/newblog`);
});

blogItem.addEventListener("click", (event) => {
  const blogId = event.target.getAttribute("data-id");
  window.location.replace(`/dashboard/blog/${blogId}`);
});
