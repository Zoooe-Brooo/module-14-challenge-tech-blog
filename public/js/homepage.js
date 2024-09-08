const home = document.querySelector("#home");
const dashboard = document.querySelector("#dashboard");
const login = document.querySelector("#login");
const logout = document.querySelector("#logout");

function clickHome() {
  home.addEventListener("click", () => {
    window.location.replace("/");
  });
}

function clickDashboard() {
  dashboard.addEventListener("click", () => {
    if (document.cookie) {
      window.location.replace("/user/:id");
    } else {
      window.location.replace("/login");
    }
  });
}

function clickLogin() {
  login.addEventListener("click", () => {
    if (document.cookie) {
      window.location.replace("/user/:id");
    } else {
      window.location.replace("/login");
    }
  });
}

function clickLogout() {
  logout.addEventListener("click", () => {
    document.cookie = false;
    window.location.replace("/");
  });
}

fetch("/api/blogs")
  .then((response) => response.json())
  .then((data) => {
    // Render the blogs on the homepage
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

clickHome();
clickDashboard();
clickLogin();
clickLogout();
