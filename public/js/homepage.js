const homeEl = document.querySelector("#home");
const dashboardEl = document.querySelector("#dashboard");
const loginEl = document.querySelector("#login");
const logoutEl = document.querySelector("#logout");

function clickHome() {
  homeEl.addEventListener("click", () => {
    window.location.replace("/");
  });
}

function clickDashboard() {
  if (dashboardEl) {
    dashboardEl.addEventListener("click", (event) => {
      event.preventDefault();

      const userId = dashboardEl.getAttribute("href").split("/").pop();

      if (userId) {
        window.location.replace(`/user/${userId}`);
      } else {
        window.location.replace("/login");
      }
    });
  }
}

function clickLogin() {
  if (loginEl) {
    loginEl.addEventListener("click", (event) => {
      event.preventDefault();

      window.location.replace("/login");
    });
  }
}

function clickLogout() {
  if (logoutEl) {
    logoutEl.addEventListener("click", async (event) => {
      event.preventDefault();

      const response = await fetch("/api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        window.location.replace("/");
      } else {
        alert("Failed to log out.");
      }
    });
  }
}

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

clickHome();
clickDashboard();
clickLogin();
clickLogout();
