fetch("/api/blogs")
  .then((response) => response.json())
  .then((data) => {
    const blogs = data;
    const blogContainer = document.querySelector(".container");

    blogs.forEach((blog) => {
      const blogCard = document.createElement("section");
      blogCard.classList.add("card");

      const blogLink = document.createElement("a");
      blogLink.href = `/blog/${blog.id}`;

      const blogInfo = document.createElement("div");

      const blogTitle = document.createElement("h2");
      blogTitle.textContent = blog.title;

      const blogAuthor = document.createElement("p");
      blogAuthor.textContent = `Posted by ${
        blog.user.username
      } on ${format_date(blog.date_created)}`;

      const blogContent = document.createElement("div");

      const blogText = document.createElement("p");
      blogText.textContent = blog.content;

      blogInfo.appendChild(blogTitle);
      blogInfo.appendChild(blogAuthor);

      blogContent.appendChild(blogText);

      blogLink.appendChild(blogInfo);
      blogLink.appendChild(blogContent);

      blogCard.appendChild(blogLink);

      blogContainer.appendChild(blogCard);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
