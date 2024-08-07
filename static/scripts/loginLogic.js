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
    let rawData = await fetch('/new-user', options)
    return await rawData.json()
}

const new_acc_but = document.getElementById("new-account-button")
new_acc_but.addEventListener("click", async function() {
    const usernameField = document.getElementById("username")
    const username = usernameField.value;
    const jsonData = await usernameQuery(username);
    if(jsonData['login'] == "success") {
        usernameField.classList.add("reverse")
        usernameField.addEventListener("animationend", function() {
            usernameField.classList.remove("reverse")
        })
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
    let rawData = await fetch('/login', options)
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
    else {
        usernameField.classList.add("reverse")
        usernameField.addEventListener("animationend", function() {
            usernameField.classList.remove("reverse")
        })

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
    const text_tag = signOut_el.getElementsByTagName("h3")[0]
    text_tag.style.margin = "0px 25px 0px 25px"
    text_tag.style.textAlign= "center"
    signOut_el.addEventListener("click", function() {
        if(text_tag.innerHTML == "Confirm?"){
            localStorage.removeItem("username")
            location.reload()
        }
        text_tag.innerHTML = "Confirm?"
    })
}

if(localStorage.getItem("username")) {
    addSignOut()
    USERNAME = localStorage.getItem("username")
    loadData()
    loadUsername()

    // loadAnimations();
}