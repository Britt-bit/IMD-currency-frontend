const base_url = "https://imd-coin.herokuapp.com/";

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
    json.data.data.forEach(element => {

        var leaderboard =
            `
    
            <li>${element.firstname}</li>
            <p>with ${element.coins} coins</p>
       
        `;
        document.querySelector(".Leaderboard").insertAdjacentHTML('beforeend', leaderboard);
    });

})