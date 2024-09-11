const blogItem = document.querySelector(".blog-item");
const newPost = document.querySelector("#new-post");

if (newPost) {
  newPost.addEventListener("click", () => {
    const user_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    window.location.replace(`/user/${user_id}/newblog`);
  });
}

blogItem.addEventListener("click", (event) => {
  const blogId = event.target.getAttribute("data-id");
  window.location.replace(`/user/blog/${blogId}`);
});
