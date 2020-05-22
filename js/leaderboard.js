const base_url = "https://imd-coin.herokuapp.com/";

primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', (json) => {
    if (json.action === "updateLeaderboard") {
        appendLeaderboard(json.data);
    }
});

let appendLeaderboard = (json) => {
    json.data.data.forEach(element => {

        var leaderboard =
            `
    
            <li>${element.firstname}</li>
            <p>with ${element.coins} coins</p>
       
        `;
        document.querySelector(".Leaderboard").insertAdjacentHTML('beforeend', leaderboard);
    });
}
fetch(base_url + "api/transaction/", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
    primus.write({
        "action": "updateLeaderboard",
        "data": json
    });
    // appendLeaderboard(json);

})