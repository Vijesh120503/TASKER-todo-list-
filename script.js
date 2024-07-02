document.getElementById('signupopen').addEventListener("click", function () {
    document.querySelector('.signup-popup').style.display = "block";
});

document.getElementById('loginn').addEventListener("click", function () {
    document.querySelector('.signup-popup').style.display = "none";
});

document.querySelector('.signup button').addEventListener("click", function () {
    var names = document.getElementById('name').value;
    var emails = document.getElementById('email').value;
    var passwords = document.getElementById('password').value;

    var result = document.getElementById('passwordValidation');
    result.innerHTML = "";

    if (names === "" || emails === "" || passwords === "") {
        alert("All fields are required");
        return;
    }
    emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(emails)) {
        result.innerHTML = "Enter a valid email address";
        return;
    }
    if (!/[A-Z]/.test(passwords)) {
        result.innerHTML = "Password must include at least one uppercase letter";
        return;
    }
    if (!/[a-z]/.test(passwords)) {
        result.innerHTML = "Password must include at least one lowercase letter";
        return;
    }
    if (!/[0-9]/.test(passwords)) {
        result.innerHTML = "Password must include at least one number";
        return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwords)) {
        result.innerHTML = "Password must include at least one special character";
        return;
    }
    if (passwords.length < 8) {
        result.innerHTML = "Password must be at least 8 characters long";
        return;
    }


    var users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
        name: names,
        email: emails,
        password: passwords
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    document.querySelector('.signup-popup').style.display = "none";

    var usersName=JSON.parse(localStorage.getItem("name")) || []
});

document.querySelector('.box button').addEventListener("click", function () {
    var nameValue = document.getElementById('mail').value;
    var passwordValue = document.getElementById('pass').value;
    var users = JSON.parse(localStorage.getItem("users")) || [];

    var currentUser = users.find(function (user) {
        return user.email === nameValue && user.password === passwordValue;
    });

    var abc=users.find(function(user){
        if(user.email===nameValue){
            return user.name;
        }
    })

    localStorage.setItem('display', JSON.stringify(abc));


    if (!currentUser) {
        alert("Invalid email or password");
    } else {
        window.location.href = "home.html";
    }
});
