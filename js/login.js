var btnLogin = document.querySelector(".login button").addEventListener("click", (e) => {
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    console.log("button clicked");

    fetch('http://localhost:3000/api/user_data/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            "username": username,
            "password": password
        })
        
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "success"){

            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";
        } else {
            console.log("fail")
            let feedback = document.querySelector(".alert");
            feedback.textContent = "login failed.";
            feedback.classList.remove('hidden');
        }
    })
});