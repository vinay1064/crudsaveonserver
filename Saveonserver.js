function saveToLocalStorage(event) {
    event.preventDefault();
    const userid = Math.floor(1000 * Math.random());
    const expenseamount = event.target.expenseamount.value;
    const discription = event.target.discription.value;
    const category = event.target.category.value;

    const obj = {
        userid,
        expenseamount,
        discription,
        category
    }
   axios.post("https://crudcrud.com/api/0c69b417b473486ead6fde8725603939/Appointmentapp",obj)
   .then((response) => {
     showUserOnScreen(response.data)
       console.log(response)
   }).catch((err) =>{
    document.body.innerHTML =  document.body.innerHTML + "<h4> somthing went wrong </h4>"
      console.log(err)
   })



    // localStorage.setItem(obj.userid, JSON.stringify(obj));
    // showUserOnScreen(obj)

}


window.addEventListener("DOMContentLoaded",() => {
    
    // when the screen used to load=(we have to read data crud crud get request)
//    axios.get is network call (asynchronously)


    axios.get("https://crudcrud.com/api/0c69b417b473486ead6fde8725603939/Appointmentapp")
    .then((response) =>{

          console.log(response)

        for ( var i=0;i<response.data.length;i++){
        
        showUserOnScreen(response.data[i])

        }

    }).catch((err) =>{
            console.log(err)
    })

//     const local = localStorage;
//     const babukey = Object.keys(local)


//     for (var i = 0; i < babukey.length; i++) {
//         const key = babukey[i];
//         const Mitthukey = local[key];
//        const userdetailsobj =JSON.parse(Mitthukey);
//        showUserOnScreen(userdetailsobj)
// }

})

function showUserOnScreen(user) {
    document.getElementById('expenseamount').value = '';
    document.getElementById('discription').value = '';
    document.getElementById('category').value = '';


 const parentNode = document.getElementById('listOfitem');
 const childHTML = `<li id='${user.userid}'>'${user.expenseamount}' - '${user.discription}' - '${user.category} <button onclick=editUserDetails('${user.userid}','${user.expenseamount}','${user.discription}','${user.category}')>Edit</button><button onclick=deleteUser('${user.userid}')>Delete</button></li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
//  console.log(parentNode)


}


function editUserDetails(userid,expenseamount,discription,category){
    document.getElementById('expenseamount').value = expenseamount;
    document.getElementById('discription').value = discription;
    document.getElementById('category').value = category;
    deleteUser(userid)
}



function deleteUser(userid){
    localStorage.removeItem(userid);
    removeUserFromScreen(userid)
}


function removeUserFromScreen(expenseamount){
    const parentNode = document.getElementById("listOfitem");
    const childNodeToBeDeleted = document.getElementById(expenseamount);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
