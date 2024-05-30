let USERNAME = null

function loadUsername() {
    const user_el = document.getElementById("user").getElementsByTagName("h3")[0]
    user_el.innerHTML = USERNAME
    document.getElementById("user").removeAttribute("onclick")
}


function openCloseLogin() {
    const user_box = document.getElementsByClassName("login-box")[0]
    if($(user_box).hasClass('login-closed')) {
        $(user_box).removeClass('login-closed').addClass('login-open').show();
    }
    else if($(user_box).hasClass('login-open')) {
        $(user_box).removeClass('login-open').addClass("login-closed");
    }
    else {
        $(user_box).addClass("login-open");
    }
}
async function createNewUser(username) {
    const post_info = {
        "username": username
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(post_info)
    };
    let rawData = await fetch('http://127.0.0.1:5000/new-user', options)
    return await rawData.json()
}

const new_acc_but = document.getElementById("new-account-button")
new_acc_but.addEventListener("click", async function() {
    console.log("inside login logic")
    const usernameField = document.getElementById("username")
    const username = usernameField.value;
    const jsonData = await usernameQuery(username);
    if(jsonData['login'] == "success") {
        alert("username already exists")
    }
    else {
        await createNewUser(username)
        USERNAME = username
        localStorage.setItem("username", username)
        loadUsername()
        openCloseLogin()
        addSignOut()
        loadData()
    }
})

async function usernameQuery(username) {
    const post_info = {
        "username": username
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(post_info)
    };
    let rawData = await fetch('http://127.0.0.1:5000/login', options)
    return await rawData.json()
}

const login_button = document.getElementById("login-button")
login_button.addEventListener("click", async function() {
    const usernameField = document.getElementById("username")
    const username = usernameField.value;
    const jsonData = await usernameQuery(username);
    if(jsonData['login'] == "success") {
        USERNAME = username
        localStorage.setItem('username', username)
        loadData()
        loadUsername()
        openCloseLogin()
        addSignOut()
    }
})


function addSignOut() {
    const user_el = document.getElementById("user")
    const sidenav = document.getElementsByClassName("sidenav")[0]
    let signOut = document.createElement("a")
    signOut.innerHTML = "<h3>Sign Out</h3>"
    signOut.style.position = "absolute"
    sidenav.insertBefore(signOut, user.nextSibling)
    const signOut_el = sidenav.getElementsByTagName("a")[1]
    signOut_el.getElementsByTagName("h3")[0].style.margin = "0px 25px 0px 25px"
    signOut_el.addEventListener("click", function() {
        localStorage.removeItem("username")
        location.reload()
    })
}

if(localStorage.getItem("username")) {
    console.log("this is the user ", localStorage.getItem('username'))
    USERNAME = localStorage.getItem("username")
    loadData()
    loadUsername()
    addSignOut()

    // loadAnimations();
}