const signupForm = document.querySelector("#signup-form");
const signupName = document.querySelector("#signup-username");
const signupPassword = document.querySelector("#signup-password");
const signupButton = document.querySelector("#signup-button");
const loginEl = document.querySelector("#login-in-signup");

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = signupName.value.trim();
  const password = signupPassword.value.trim();

  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const user_id = response.user_id;
      document.location.replace("/user/" + user_id);
    } else {
      alert("Failed to sign up.");
    }
  }
};

signupForm.addEventListener("submit", signupFormHandler);

loginEl.addEventListener("click", () => {
  window.location.replace("/login");
});
