const form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if(name === "" || email === "" || password === ""){
        alert("Please fill all fields!");
        return;
    }

    alert("Account Created Successfully!");

    window.location.href = "login.html";
});