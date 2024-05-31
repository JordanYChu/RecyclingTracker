ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"];

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

// DATE = yyyy + '-' + mm + '-' + dd;
DATE = today

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
    let rawData = await fetch('/all-goal-values', options)
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
    let rawData = await fetch('/total-item-data', options)
    let jsons = await rawData.json()
    return jsons;


}
var categories = [0,0,0,0,0,0,0,0,0]
async function updateTotalMeter() {
    var total =0;
    for(var i = 0;i < 9; i++) {
        let json =  await totalQuantityItem(ITEM_IDS[i])
        categories[i] = json["total"]
        total+=categories[i]
    }

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

async function setGoal(new_goal, item_id) {
    const update = {
        "username": USERNAME,
        "goal": new_goal,
        "item": item_id
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
    };
    let rawData = await fetch('/input-goal-values', options)
    .then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
        }).then(update => {
        }).catch(e => {
        console.log(e);
        });
}


for(var i = 0; i < 9; i++) {
    let item_el = document.getElementById(ITEM_IDS[i])   
    let goal_setter = item_el.getElementsByClassName("goal-set")[0]
    let index = i
    goal_setter.addEventListener("animationend", function(e) {
        goal_setter.classList.remove("reverse")
    })
    goal_setter.addEventListener("keypress", function(event) {
        if(!localStorage.getItem("username")) {
            return
        }
        if(event.key === "Enter" ) {
            if(isNaN(goal_setter.value)||Number(goal_setter.value) < categories[index] ) {
                goal_setter.classList.add("reverse")
                return
            }

            setGoal(Number(goal_setter.value), item_el.id)
            let goal_meter_case = document.getElementById(ITEM_IDS[index])
            let goal_meter = goal_meter_case.getElementsByClassName("progress")[0]
            goal_meter.setAttribute("style", "--goal-count: " + Math.min(100, 100*categories[index]/goal_setter.value)+ "%;")
            let goal_counter = goal_meter_case.getElementsByTagName("label")[1]
            goal_counter.innerHTML = categories[index] + "/" + goal_setter.value;
            progressAnim(item_el.id)
            goal_setter.value = ""
            goal_setter.blur()
        }
    })
}

async function loadData() {
    if(!localStorage.getItem("username")) {
        return
    }
    await updateGoalValues()
    await updateTotalMeter()
    loadAnimations()
}

function loadAnimations() {
    for(var i = 0; i < 9; i++) {
        progressAnim(ITEM_IDS[i])
    }
}
function progressAnim(item_id) {
    const progress_bar = document.getElementById(item_id).getElementsByClassName("progress")[0]
    $(progress_bar).removeClass('progress_anim').show();
    $(progress_bar).addClass('progress_anim').show();
}

