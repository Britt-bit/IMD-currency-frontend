const base_url = "https://imd-coin.herokuapp.com/";
const error_url = "http://localhost:3000/api/"

primus = Primus.connect(base_url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

primus.on('data', (json) => {
    if(json.action === "updatedCoins"){
        //console.log(json.data.data.user.coins);
        appendCoins(json.data.data.user.coins);
    }
});


if(!localStorage.getItem("token")){
    window.location.href = "login.html";
}


let appendCoins = (json) => {
    console.log("dit log ik: "+json)
    //json.data.data[0].coins
    document.querySelector("#amountCoins").innerHTML = json + " coins";
}

fetch(base_url + "api/my_user_data/", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
    appendCoins(json);
    console.log(json.data.data[0].coins);
    document.querySelector("#amountCoins").innerHTML = json.data.data[0].coins + " coins";
})