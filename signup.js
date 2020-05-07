var btnSignup = document.querySelector(".signup button").addEventListener("click", signup => {
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    //console.log("button clicked");

    fetch('http://localhost:3000/api/user_data/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success"){
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Sign up complete!";
            feedback.classList.remove('hidden');

            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";
        }
    })
});