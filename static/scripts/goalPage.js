console.log("Running Test.js");
// const categories = [4,1,10,1,10,1,1,1]
// let total = 0
// for(let i = 0; i < 8; i++) {
//     total += categories[i];
// }
// console.log(total)

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
var categories = [0,0,0,0,0,0,0,0,0]
async function updateTotalMeter() {
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
    let rawData = await fetch('http://127.0.0.1:5000/input-goal-values', options)
    .then(data => {
        if (!data.ok) {
            throw Error(data.status);
        }
        return data.json();
        }).then(update => {
            console.log("writing update")
            console.log(update);
        }).catch(e => {
        console.log(e);
        });
}


for(var i = 0; i < 9; i++) {
    let item_el = document.getElementById(ITEM_IDS[i])   
    let goal_setter = item_el.getElementsByClassName("goal-set")[0]
    let index = i
    goal_setter.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            if(isNaN(goal_setter.value)) {
                alert("Enter a numerical value.")
                return
            }
            if(Number(goal_setter.value) < categories[index]) {
                alert("Consider Setting a better goal")
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

function loadData() {
    updateGoalValues()
    updateTotalMeter()
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

