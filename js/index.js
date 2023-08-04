
let signupName = document.getElementById("signupName");
let signupMail = document.getElementById("signupMail");
let signupPass = document.getElementById("signupPass");

let userSigninMail = document.getElementById("user-mail");
let userSigninPass = document.getElementById("user-pass");

let localStorageKey = "allUsers"
let usersArr = [];

if (JSON.parse(localStorage.getItem(localStorageKey))) {
    usersArr = JSON.parse(localStorage.getItem(localStorageKey))
}
// LOCAL STORAGE 

function addToLocalStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(usersArr));
}

// SIGN UP FUNCTION

function signUpFun() {

    let userName = signupName.value;
    let userMail = signupMail.value;
    let userPass = signupPass.value;
    if (userName === "" || userMail === "" || userPass === "") {
        document.getElementById("all-span").innerText = "All inputs is required"
    } else if (signupNameValidation() && signupMailValidation() && signupPassValidation()) {
        let checkMail = true;
        for (let i = 0; i < usersArr.length; i++) {
            if (usersArr[i].mail === userMail) {
                checkMail = false;
                break;
            }
        }


        if (checkMail) {
            let user = {
                name: signupName.value,
                mail: signupMail.value,
                password: signupPass.value,
            }
            // swal("Good job!", "now you can sign in", "success")

            // document.getElementById("success-span").innerText = "SUCCESS";
            window.location.href = "login.html";
            usersArr.push(user);
            addToLocalStorage();
            console.log(usersArr);
        } else {
            document.getElementById("all-span").innerText = "this mail is already exist"
            // document.getElementById("success-span").innerText = "";
        }
    }

}

// VALIDATION

function signupNameValidation() {
    let pattern = /^[A-Z][a-z]{3,10}$/;
    let validName = pattern.test(signupName.value);

    if (validName) {
        document.getElementById("name-span").innerText = "";
    } else {
        document.getElementById("name-span").innerText = "user name must starts with a capital letter follows by 3 to 10 ";
    }
    return validName
}

function signupMailValidation() {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validMail = pattern.test(signupMail.value);

    if (validMail) {
        document.getElementById("mail-span").innerText = "";
    } else {
        document.getElementById("mail-span").innerText = " you must write a valid E-mail";
    }
    return validMail
}

function signupPassValidation() {
    let pattern = /^.{6,15}$/;
    let validPass = pattern.test(signupPass.value);

    if (validPass) {
        document.getElementById("pass-span").innerText = "";
    } else {
        document.getElementById("pass-span").innerText = " password must be from 6 to 15 digits";
    }
    return validPass
}

// LOG IN 

function logInFun() {
    var index = 0;
    console.log(usersArr);

    let userMail = userSigninMail.value;
    let userPass = userSigninPass.value;

    if (userMail === "" || userPass === "") {
        document.getElementById("signin-span").innerText = "All inputs is required"
    } else {
        let mailExist = false;
        for (let i = 0; i < usersArr.length; i++) {
            if (usersArr[i].mail === userMail) {
                mailExist = true;
                index = i;
                break;
            }
        }

        if (mailExist) {
            if (userPass === usersArr[index].password) {
                localStorage.setItem("index", index);
                window.location.href = "home.html";

            } else {
                document.getElementById("signin-span").innerText = "the password is wrong";
            }

        } else {
            document.getElementById("signin-span").innerText = "invalid mail"
        }
    }
}

// WELCOME
let welcomeIndex = localStorage.getItem("index");
if (document.getElementById("welcome")) {
    document.getElementById("welcome").innerText = `${usersArr[welcomeIndex].name}`;

}






