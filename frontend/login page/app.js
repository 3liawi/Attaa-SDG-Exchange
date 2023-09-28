// just for animation
const login_btnAnimation = document.querySelector("#sign-in-button");
const signup_btnAnimation = document.querySelector("#sign-up-button");
const container = document.querySelector(".container");


// Check the URL parameter to decide which form to display
const urlParams = new URLSearchParams(window.location.search);
const formToShow = urlParams.get('form');

if (formToShow === 'signup') {
  if (!container.classList.contains('sign-up-mode')) {
    container.classList.add('sign-up-mode');
  }
} else if (formToShow === 'signin') {
  if (container.classList.contains('sign-up-mode')) {
    container.classList.remove('sign-up-mode');
  }
}

signup_btnAnimation.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});
login_btnAnimation.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// validation for log in button
const form = document.getElementsByClassName(".sign-in-form");
const username = document.getElementById("username");
const password = document.getElementById("pass");
const logIn_btn = document.getElementById("log_In");

logIn_btn.addEventListener("click", (e) => {
  e.preventDefault();
  validateInput();

  // Send a POST request to the login endpoint
  fetch("https://test.singularity-dm.com/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        // Store the token in local storage
        localStorage.setItem("token", data.access_token);
        // Redirect to a dashboard or home page
        window.location.href = "../index.html";
      } else {
        // Display error message under the input fields
        const usernameError = username.parentElement.querySelector(".error");
        const passwordError = password.parentElement.querySelector(".error");

        // Assuming the server returns a specific field indicating which input has the error
        if (data.field && data.field === "username") {
          usernameError.innerText = data.message || "Error logging in.";
        } else {
          passwordError.innerText = data.message || "Error logging in.";
        }
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
});



// fn for error
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add(".error");
  inputControl.classList.remove(".success");
};
// fn for success
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = "";
  inputControl.classList.add(".success");
  inputControl.classList.remove(".error");
};
// fn validate
const validateInput = () => {
  const userName_value = username.value.trim();
  const password_value = password.value.trim();

  if (userName_value === "") {
    setError(username, "لطفاً أكتب اسم ");
  } else {
    setSuccess(username);
  }

  if (password_value === "") {
    setError(password, "الرقم السري مطلوب ");

  } else {
    setSuccess(password);
  }
};



// validation for sign up button
const signUp_btn = document.getElementById("sign_up");
const userNamesignUp = document.getElementById("signup_userName");
const passSignup = document.getElementById("signup_pass");

signUp_btn.addEventListener("click", (e) => {
  e.preventDefault();
  validInputSignup();

  // Send a POST request to the register endpoint
  fetch("https://test.singularity-dm.com/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userNamesignUp.value, // Assuming you have a name input field
      username: userNamesignUp.value,
      password: passSignup.value
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        // Store the token in local storage or session storage
        localStorage.setItem("token", data.access_token);
        // Redirect to a dashboard or home page
        window.location.href = "../login page/index.html";
      } else {
        // Display error message under the input fields
        const usernameError = userNamesignUp.parentElement.querySelector(".error");
        const passwordError = passSignup.parentElement.querySelector(".error");
        usernameError.innerText = data.message || "Error registering.";
        passwordError.innerText = data.message || "Error registering.";
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
});


const setErrorSignup = (element, message) => {
  const inputSignUp = element.parentElement;
  const errorDisplaySignup = inputSignUp.querySelector(".error");
  errorDisplaySignup.innerText = message;
  inputSignUp.classList.add(".error");
  inputSignUp.classList.remove(".success");
};
// fn for success
const setSuccessSignup = (element) => {
  const inputSignUp = element.parentElement;
  const errorDisplaySignup = inputSignUp.querySelector(".error");
  errorDisplaySignup.innerText = "";
  inputSignUp.classList.add(".success");
  inputSignUp.classList.remove(".error");
};
// fn validate
const validInputSignup = () => {
  const userName_value = userNamesignUp.value.trim();
  const password_value = passSignup.value.trim();

  if (userName_value === "") {
    setErrorSignup(userNamesignUp, "لطفاً اكتب اسم ");
  } else {
    setSuccessSignup(userNamesignUp);
  }

  if (password_value === "") {
    setErrorSignup(passSignup, "الرقم السري مطلوب ");
  } else if (password_value.length < 8) {
    setErrorSignup(passSignup, "الرقم السري على الاقل 8 مراتب ");
  } else {
    setSuccessSignup(passSignup);
  }
};
