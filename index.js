function signUp()
{
    let email = document.getElementById("emailSignUpInput").value;
    let password = document.getElementById("passwordSignUpInput").value;

    console.log(localStorage.getItem(email))

    if(!localStorage.getItem(email) && email != "")
    {
        localStorage.setItem(email, password);
        alert("Account sucessfully created.")
    }

    else
    {
        alert("Email already used/Invalid Email.")
    }
}

function logIn()
{
    let email = document.getElementById("emailLogInInput").value;
    let password = document.getElementById("passwordLogInInput").value;

    if(localStorage.getItem(email))
    {
        if(password === localStorage.getItem(email))
        {
            window.location.href = "menu.html";
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