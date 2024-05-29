console.log("Running Test.js");
// const categories = [4,1,10,1,10,1,1,1]
// let total = 0
// for(let i = 0; i < 8; i++) {
//     total += categories[i];
// }
// console.log(total)

let USERNAME;

ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"];

const updateGoalValues = async () => {
    const post_info = {
        "username": USERNAME
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(post_info)
    };
    let rawData = await fetch('http://127.0.0.1:5000/all-goal-values', options)
    let jsons = await rawData.json()
    return jsons
}


const totalQuantityItem = async (item) => {
    const post_info = {
        "username": USERNAME,
        "item": item
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(post_info)
    };
    let rawData = await fetch('http://127.0.0.1:5000/total-item-data', options)
    let jsons = await rawData.json()
    return jsons;


}
async function updateTotalMeter() {
    var categories = [0,0,0,0,0,0,0,0,0]
    var total =0;
    for(var i = 0;i < 9; i++) {
        let json =  await totalQuantityItem(ITEM_IDS[i])
        categories[i] = json["total"]
        total+=categories[i]
    }

    console.log("Inside Ratio")
    const meter = document.getElementById("global-meter");
    //calculate percentages
    let percentages = [0,0,0,0,0,0,0,0,0]
    percentages[0] = categories[0]/total
    for(let i = 1; i < 9; i++) {
        percentages[i] = percentages[i-1] + categories[i]/total
    }

    let jsons = await updateGoalValues();
    //set goals for all item elements
    for(var i = 0; i < 9; i++) {
        let goal_meter_case = document.getElementById(ITEM_IDS[i])
        let goal_meter = goal_meter_case.getElementsByClassName("progress")[0]
        // goal_meter.setAttribute("styles", categories[i]) goal_meter.setAttribute("max", jsons[ITEM_IDS[i]])
        goal_meter.setAttribute("style", "--goal-count: " + Math.min(100, 100*categories[i]/jsons[ITEM_IDS[i]])+ "%;")
        let goal_counter = goal_meter_case.getElementsByTagName("label")[1]
        goal_counter.innerHTML = categories[i] + "/" + jsons[ITEM_IDS[i]];
    }
    //set items percentages
    let cssText = "";
    cssText += "--soft-plastic: " + percentages[0]*100 + "%;";
    cssText += "--hard-plastic: " + percentages[1]*100 + "%;";
    cssText += "--glass: " + percentages[2]*100 + "%;";
    cssText += "--paper: " + percentages[3]*100 + "%;";
    cssText += "--cardboard: " + percentages[4]*100 + "%;";
    cssText += "--metal: " + percentages[5]*100 + "%;";
    cssText += "--electronics: " + percentages[6]*100 + "%;";
    cssText += "--textiles: " + percentages[7]*100 + "%;";
    cssText += "--styrofoam: " + percentages[8]*100 + "%;";
    meter.setAttribute("style",  cssText)
}
//craete new user
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

function loadPageData() {
    updateGoalValues()
    updateTotalMeter()
    loadAnimations()
}

const login_button = document.getElementById("login-button")
login_button.addEventListener("click", async function() {
    const usernameField = document.getElementById("username")
    const username = usernameField.value
    const jsonData = await usernameQuery(username);
    if(jsonData['login'] == "success") {
        USERNAME = username
        loadPageData()
    }
})

function loadAnimations() {
    for(var i = 0; i < 9; i++) {
        const progress_bar = document.getElementById(ITEM_IDS[i]).getElementsByClassName("progress")[0]
        $(progress_bar).removeClass('progress_anim').show();
        $(progress_bar).addClass('progress_anim').show();
    }
}

if(localStorage.getItem("username")) {
    USERNAME = localStorage.getItem("username")
    loadPageData()
}