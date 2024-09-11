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

      window.location.replace(`/dashboard`);
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

clickHome();
clickDashboard();
clickLogin();
clickLogout();
