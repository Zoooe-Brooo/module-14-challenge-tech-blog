const loginForm = document.querySelector("#login-form");
const loginName = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginButton = document.querySelector("#login-button");
const signup = document.querySelector("#signup");

const loginFormHandler = async (event) => {
  event.preventDefault();

  let username = loginName.value.trim();
  let password = loginPassword.value.trim();

  if (username && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/user/response.user_id");
    } else {
      alert("Failed to log in.");
    }
  }
};

loginForm.addEventListener("submit", loginFormHandler);

signup.addEventListener("click", () => {
  window.location.replace("/signup");
});
