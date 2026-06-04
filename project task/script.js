function signup(){

    let email = document.getElementById("signupEmail").value;

    let password = document.getElementById("signupPassword").value;

    if(email === "" || password === ""){

        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Signup Successful 😎");
}

function login(){

    let email = document.getElementById("loginEmail").value;

    let password = document.getElementById("loginPassword").value;

    let savedEmail = localStorage.getItem("userEmail");

    let savedPassword = localStorage.getItem("userPassword");

    if(email === savedEmail && password === savedPassword){

        alert("Login Successful 🚀");

        window.location.href = "dashboard.html";
    }

    else{

        alert("Invalid Email or Password");
    }
}
function login(){

    let email = document.getElementById("loginEmail").value;

    let password = document.getElementById("loginPassword").value;

    let savedEmail = localStorage.getItem("userEmail");

    let savedPassword = localStorage.getItem("userPassword");

    if(email === savedEmail && password === savedPassword){

        alert("Login Successful 🚀");

        window.location.href = "dashboard.html";
    }

    else{

        alert("Invalid Email or Password");
    }
}
