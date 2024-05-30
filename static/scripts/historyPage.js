ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"];
//GET request for data for specific day
let DATE;

let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
DATE = yyyy + '-' + mm + '-' + dd;
//todays date

function getDateFromObj(date_obj) {
    var dd = String(date_obj.getDate()).padStart(2, '0');
    var mm = String(date_obj.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date_obj.getFullYear();
    DATE = yyyy + '-' + mm + '-' + dd;
}


const calendar_el = document.getElementById("calendar")
calendar_el.addEventListener("change", function() {
    DATE = calendar_el.value
    loadData()
    updateDateLabel()
})

function nextDay() {
    var date_obj = new Date(DATE.replace("-","/"));
    var tomorrow = new Date(date_obj.getTime() + (24 * 60 * 60 * 1000))
    getDateFromObj(tomorrow)
    loadData()
    updateDateLabel()
}

function previousDay() {
    var date_obj = new Date(DATE.replace("-","/"));
    var  yesterday = new Date(date_obj.getTime() - (24 * 60 * 60 * 1000))
    getDateFromObj(yesterday)
    loadData()
    updateDateLabel()
}

function updateDateLabel() {
    var date_obj = new Date(DATE.replace("-","/"));
    var dateArr = date_obj.toDateString().split(' ');
    var dateFormat = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
    const date_label_el = document.getElementById("date-label")
    date_label_el.innerHTML = dateFormat
}


const getItemsFromDate= async () => {
    //make post request
    const post_info = {
        "username": USERNAME,
        "date": DATE
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(post_info)
    };
    let rawData = await fetch('http://127.0.0.1:5000/all-item-values', options)

    console.log("test", rawData)
    let jsonData = await rawData.json();
    return jsonData;
}

const getGoalFromDate = async () => {
    const post_info = {
        "username": USERNAME,
        "date": DATE
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(post_info)
    };
    let rawData = await fetch('http://127.0.0.1:5000/daily-goal-values', options)
    return await rawData.json()
}

const loadItems = async() => {
    console.log("loading items..")
    let jsonData = await getItemsFromDate();
    const goal_el = document.getElementsByClassName("circle-progress")[0]
    let total = 0;
    for(var i = 0; i < 9; i++) {
        var count = jsonData[ITEM_IDS[i]]
        const item_el = document.getElementById(ITEM_IDS[i]).getElementsByClassName("item-count")[0]
        if(count == null) {
            item_el.innerHTML = 0;
        }
        else {
            item_el.innerHTML = count;
            total += count;
        }
    }
    //get goal
    var json = await getGoalFromDate("")
    var goal = json["daily_goal"]
    console.log(goal)
    if(goal.length == 0) {
        goal_el.setAttribute("style", "--goal_tracker: \" Unrecycled \";")
        return
    }
    goal_el.setAttribute("style", "--total: " + total + ";" + 
                                "--goal_daily: " + goal + ";" +
                                "--goal_tracker: \"" +total+"/"+goal +"\";" +
                                "--test: " + (360*total/goal) + "deg;"
                            )
}

const circle_anim = document.getElementsByClassName("circle-progress")[0]

function loadAnimations() {
    $(circle_anim).removeClass('load-item-from-login').show();
    $(circle_anim).addClass('load-item-from-login').show();
}

function loadData() {
    if(!localStorage.getItem("username")) {
        return
    }
    loadItems()
    updateDateLabel()
    loadAnimations()
}
