/* select user from dropdown */
fetch("http://localhost:3000/api/user_data/", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
   //console.log(json.data.data[0]);
    var array = {}
    //var arrayId = {};
    //var arrayShow = {};
    for(i=0; i<json.data.data.length; i++){
        array[i] = new Array(json.data.data[i]._id, json.data.data[i].firstname + " " + json.data.data[i].lastname);
        //arrayId[i] = json.data.data[i]._id;
        //arrayShow[i] = json.data.data[i].firstname + " " + json.data.data[i].lastname;
    }
    console.log(array[0][1]);
    //var select = document.getElementById("name");
    //let option;
    //for(let i=0; i<json.data.data.length; i++){
    //    option = document.createElement('option');
    //    option.text = arrayShow[i];
    //    option.value = arrayId[i];
    //    select.add(option);
    //}
})
