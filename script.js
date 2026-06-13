$(document).ready(function(){

  // Like button toggle
  $(".like-btn").click(function(){
    if($(this).text() === "❤️ Like"){
      $(this).text("💚 Liked");
    } else {
      $(this).text("❤️ Like");
    }
  });

  // Smooth scroll
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top
      }, 800);
    }
  });

  // Simple form validation
  $("#loginForm").submit(function(e){
    let email = $("#email").val();
    let password = $("#password").val();

    if(email === "" || password === ""){
      alert("Please fill all fields!");
      e.preventDefault();
    }
  });

});

function loginUser() {
  console.log("Login clicked"); // test

  localStorage.setItem("loggedIn", "true");

  window.location.href = "profile.html";
}

// Load posts on page load
window.onload = function () {
  loadPosts();
};

// Add new post
function addPost() {
  let text = document.getElementById("postText").value;
  let file = document.getElementById("postImage").files[0];

  if (!text && !file) {
    alert("Add something!");
    return;
  }

  let reader = new FileReader();

  reader.onload = function () {
    let post = {
      text: text,
      image: file ? reader.result : null
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);

    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();

    // Clear fields
    document.getElementById("postText").value = "";
    document.getElementById("postImage").value = "";
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onload();
  }
}

// Display posts
function loadPosts() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let container = document.getElementById("feedContainer");
  container.innerHTML = "";

  posts.forEach(post => {
    let postHTML = `
      <div class="card mt-3 shadow">
        ${post.image ? `<img src="${post.image}" class="card-img-top">` : ""}
        <div class="card-body">
          <h5>Aarchi 🌿</h5>
          <p>${post.text}</p>
          <button class="btn btn-outline-danger">❤️ Like</button>
        </div>
      </div>
    `;

    container.innerHTML += postHTML;
  });
}



function logoutUser() {
  localStorage.clear();  // sab data delete
  alert("Logged out successfully ✅");
  window.location.href = "index.html";  // home page pe bhej
}


window.onload = function() {
  let isLoggedIn = localStorage.getItem("user");

  if (isLoggedIn) {
    document.getElementById("loginBtn").classList.add("d-none");
    document.getElementById("logoutBtn").classList.remove("d-none");
  } else {
    document.getElementById("loginBtn").classList.remove("d-none");
    document.getElementById("logoutBtn").classList.add("d-none");
  }
}

function loginUser() {
  localStorage.setItem("user", "true");
  window.location.href = "profile.html";
}