const base_url = "https://imd-coin.herokuapp.com/";
const error_url = "http://localhost:3000/api/"

var btnSignup = document.querySelector(".signup button").addEventListener("click", (e) => {
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let username = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;


    function validateEmail(){
        let username = document.querySelector('#email').value;
        let pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
        let isValid = pattern.test(username);
        //console.log(isValid);
        let isTrue = username.indexOf("@student.thomasmore.be");
        if(isValid == true && isTrue !== -1){
            return true;
        } else {
            return false;
        }
    }
    
if(validateEmail() === true){
    console.log("functie uigevoerd");
    fetch(base_url + 'api/user_data/signup', {
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
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";
        } else {
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Sign up failed.";
            feedback.classList.remove('hidden');
        }
    }) 
} else {
    let feedback = document.querySelector(".alert");
    feedback.textContent = "Email must end on @student.thomasmore.be";
    feedback.classList.remove('hidden');
}
    
});