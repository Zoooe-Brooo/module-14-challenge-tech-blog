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
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const user = await response.json();
        document.location.replace("/dashboard");
      } else {
        const errorMessage = await response.json();
        alert(
          "Failed to sign up: " + (errorMessage.message || "Unknown error.")
        );
      }
    } catch (err) {
      alert("An error occurred: " + err.message);
    }
  } else {
    alert("Please enter a username and password.");
  }
};

signupForm.addEventListener("submit", signupFormHandler);

loginEl.addEventListener("click", () => {
  window.location.replace("/login");
});
