localStorage.setItem("Manager", "Password");
localStorage.setItem("isManager", "false");
localStorage.setItem("isLoggedIn", "false");

function signUp() // Checks if the email already exists in the database, otherwise it creates it
{
    let email = document.getElementById("emailSignUpInput").value;
    let password = document.getElementById("passwordSignUpInput").value;

    if(!localStorage.getItem(email) && email != "" && checkEmail(email))
    {
        localStorage.setItem(email, password);
        alert("Account sucessfully created.");
        makePopup("signUpMain", email)
    }

    else
    {
        alert("Email already used orInvalid Email.");
    }
}

function checkEmail(email) // Checks email to see if it has an @ and a .
{
    isAnd = false;
    isDot = false;

    for(let i = 0; i < email.length; i++)
    {
        if(email[i] == "@")
        {
            isAnd = true;
        }
        if(email[i] == ".")
        {
            isDot = true;
        }
    }

    if(isAnd && isDot && email.length > 5)
    {
        return true;
    }
    
    return false;
}

function logIn() // Checks if the user is logged in, logged in as manager, or their password or user is incorrect
{
    let email = document.getElementById("emailLogInInput").value;
    let password = document.getElementById("passwordLogInInput").value;

    if(localStorage.getItem(email))
    {
        if(password === localStorage.getItem(email))
        {
            localStorage.setItem("isLoggedIn", "true")
            if(email == "Manager")
            {
                localStorage.setItem("isManager", "true");
                window.location.href = "menu.html";
            }
            else
            {
                localStorage.setItem("isManager", "false");
                window.location.href = "menu.html";
            }
            
        }
        else
        {
            alert("Password is incorrect");
        }
    }
    else
    {
        alert("Email and/or Password is Incorrect");
    }
}

function makePopup(divName, email) // Makes a popup window appear with a couple of elements
{
    console.log(email)
    var popUp = document.createElement("div")
    popUp.classList.add("popUpWindow")
    var newItem = document.getElementsByClassName(divName)[0]
    var popUpContents = `
        <div class = "infoDiv">
            <h3>Would you like to add recovery information?</h3>
            <br>
            <button class="popUpButtonYes">Yes</button>
            <button class="popUpButtonNo">No</button>
            <br><br>
        </div>
    `
    popUp.innerHTML = popUpContents
    newItem.append(popUp)
    popUp.getElementsByClassName("popUpButtonYes")[0].addEventListener('click', () => {addRecovery(email)})
    popUp.getElementsByClassName("popUpButtonNo")[0].addEventListener('click', () => {removeElementsByClass("popUpWindow")})
}

function addRecovery(email) // Adds further information to the popup so that the user can add the recovery information
{
    removeElementsByClass("infoDiv")
    var newPopUpInfo = document.createElement("div")
    newPopUpInfo.classList.add("addedInfo")
    var newItem = document.getElementsByClassName("popUpWindow")[0]
    var newPopUpContents = `
        <div class = "popUpTextDiv">
            <h3>Please input something you would remember.</h3>
            <h2>Examples include:</h2>
            <p>Your pet's name</p>
            <p>Your favorite childhood toy</p>
            <p>Your nickname</p>
        </div>
        <br><br>
        <form onsubmit = "return false"><label>Recovery information: </label>  <input id="newItemName" name="newItemName" type="text" placeholder="Type here!" required="">
        <br><br>
        <button class="popUpButtonRecovery">Add Recovery Info</button></form>
        <br>
        <button class="popUpButtonCancel">Cancel</button></form>
        <br><br>
    `
    newPopUpInfo.innerHTML = newPopUpContents
    newItem.append(newPopUpInfo)
    newPopUpInfo.getElementsByClassName("popUpButtonRecovery")[0].addEventListener('click', () => {addRecoveryInfo(email)})
    newPopUpInfo.getElementsByClassName("popUpButtonCancel")[0].addEventListener('click', () => {removeElementsByClass("popUpWindow")})
}

function removeElementsByClass(className) // Thank you stack overflow for this function --- Imported from Stack Overflow --- Deletes an element based on class name
{
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function addRecoveryInfo(email) // Adds the recovery information into the local storage
{
    x = document.getElementsByClassName("addedInfo")[0]
    console.log(x.getElementsByTagName("input")[0].value)

    if (x.getElementsByTagName("input")[0].value != '')
    {
        localStorage.setItem(email + "|recovData", x.getElementsByTagName("input")[0].value)
    }

}

function recoverAccount() // Makes a recover specific popup to give the password to the account if 1; The account exists, 2; The recovery info is correct
{
    console.log("TO BE DONE")
}

// Make it so that recover yes button deletes all elements so that the box can be a flex with the buttons.