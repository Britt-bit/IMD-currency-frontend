const base_url = "https://imd-coin.herokuapp.com/";

let toUserID;
fetch(base_url + "api/transaction", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json.data);
    console.log("werkt");
}).catch(err => {
    window.location.href = "login.html";
});

fetch(base_url + "api/my_user_data/", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json.data);
})