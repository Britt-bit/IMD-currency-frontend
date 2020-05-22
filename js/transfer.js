const base_url = "https://imd-coin.herokuapp.com/";
const error_url = "http://localhost:3000/api/"


primus = Primus.connect("http://localhost:3000", {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});
 

let toUserID;

if(!localStorage.getItem("token")){
  window.location.href = "login.html";
}


// AUTOCOMPLETE SCRIPT
//var autocompleteNames = new Array();
let autocompleteNames = [];
let autocompleteId = [];

fetch(base_url + "api/all_user_data/", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    //console.log(json.data);
    //var array = {};
    for(i=0; i<json.data.data.length; i++){
        //array[i] = new Array(json.data.data[i]._id, json.data.data[i].firstname + " " + json.data.data[i].lastname);
        autocompleteNames[i]= json.data.data[i].firstname + " " + json.data.data[i].lastname;
        autocompleteId[i] = json.data.data[i]._id;
    }
})

//var autocompleteNames = ["Stijn Bouckaert", "Britt My Baby", "Olaf Snowman", "Boobie Goodie"];
//var autocompleteId = ["idStijn", "idBritt", "idOlaf", "idBoobie"];


function autocomplete(userInp, arr, idarr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    userInp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.classList.add("autoCompleteOption", idarr[i]);
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                userInp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    userInp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != userInp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

function getSelectedId(){

  let listAllAutocompleteOptions = document.querySelectorAll(".autoCompleteOption");

  //  console.log(listAllAutocompleteOptions);
  
  for (let i = 0; i < listAllAutocompleteOptions.length; i++) {
    (function(index) {
      listAllAutocompleteOptions[index].addEventListener("click", function(e){
            toUserID = (e.target.classList[1]);
            
          })
    })(i);
}
}

document.querySelector("#myInput").addEventListener("keyup", function(e){
try{
  getSelectedId();
}catch{

}
})

  
autocomplete(document.getElementById("myInput"), autocompleteNames, autocompleteId);



// COMPLETE TRANSFER

/* add transaction to database */

var btnTransfer = document.querySelector(".transfer--btn").addEventListener("click", (e) => {
    //console.log('clicked');
    
     //let fromUser = json.user._id;
    let toUser = toUserID;
    let coins = document.querySelector('#amount').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;
 
    
        fetch(base_url + "api/transaction", {
            method: "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            
            body: JSON.stringify({
                //"fromUser": fromUser,
                "toUser": toUser,
                "coins": coins,
                "reason": reason,
                "message": message
            })
        })
        
        
        .then(result => {
            return result.json();
        }).then(json => {
         
          if(json.data == undefined){
            console.log("oh no");
                let feedback = document.querySelector(".alert");
                feedback.textContent = "Something went wrong";
                feedback.classList.remove('hidden');
          }
          else if(json.user.coins >= coins){
              let fromUserCoins = json.user.coins;
              let transactionCoins = json.data.coins;
              let fromUser = json.data.fromUser;
            
                console.log("jeej you have enough");

                fetch( base_url + 'api/user_data/'+toUserID, {
                  method: "put",
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  }, 
                  body: JSON.stringify({
                    "transactionCoins": transactionCoins,
                    "toUserID": toUser,
                    "fromUser": fromUser,
                    "fromUserCoins": fromUserCoins
                  })
              }).then(result => {
                  return result.json();
              }).then(json => {
                  console.log(json);

                  primus.write({
                    "action": "updatedCoins",
                    "data": json
                  });

                  if(json.status === "success"){

                    window.location.href = "thankYou.html";
                  }
                  
              }).catch(err => {
                console.log(err)
            })

            } else {
                console.log("oh no");
                let feedback = document.querySelector(".alert");
                feedback.textContent = "Something went wrong";
                feedback.classList.remove('hidden');
            }
            
        }).catch(err => {
            console.log(err)
        }); e.preventDefault();
    });


    

