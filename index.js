localStorage.setItem("Manager", "Password");

function signUp()
{
    let email = document.getElementById("emailSignUpInput").value;
    let password = document.getElementById("passwordSignUpInput").value;

    if(!localStorage.getItem(email) && email != "" && checkEmail(email))
    {
        localStorage.setItem(email, password);
        alert("Account sucessfully created.");
    }

    else
    {
        alert("Email already used orInvalid Email.");
    }
}

function checkEmail(email)//checks email to see if it has an @ and a .
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

function logIn()
{
    let email = document.getElementById("emailLogInInput").value;
    let password = document.getElementById("passwordLogInInput").value;

    if(localStorage.getItem(email))
    {
        if(password === localStorage.getItem(email))
        {
            if(email == "Manager" && password == "password")
            {
                localStorage.setItem("isManager", "true");
            }
            else
            {
                localStorage.setItem("isManager", "false");
            }
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