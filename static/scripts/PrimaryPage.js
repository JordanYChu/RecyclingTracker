//load User Data
ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"];

const getGoalFromDate = async (date) => {
    const post_info = {
        "userId": 1,
        "date": date
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
const preloadData = async () => {
    var total = 0;
    let items = await getItems();
    for(var i = 0; i < 9; i++) {
        let counter_label = document.getElementById(ITEM_IDS[i]).getElementsByClassName("counter")[0];
        if(items[ITEM_IDS[i]] == null) {
            counter_label.innerHTML = 0
        }
        else {
            counter_label.innerHTML = items[ITEM_IDS[i]];
            total += items[ITEM_IDS[i]]
        }
    }
    var json = await getGoalFromDate("")
    var goal = json["daily_goal"]
    // goal_el.setAttribute("style", "--total: " + total + ";" + 
    //                             "--goal_daily: " + goal + ";" +
    //                             "--goal_tracker: \"" +total+"/"+goal +"\";" 
    //                         )
    const d = document.getElementById("total-goal-meter")
    d.setAttribute("value", total)
    d.setAttribute("max", goal)
}

const getData = async (item_id) => {
    let item_count = await getItemCount(item_id);
    let counter_label = document.getElementById(item_id).getElementsByClassName("counter")[0];
    counter_label.innerHTML = item_count;
}

preloadData()

    

async function increment(item, new_count) {
    const update = {
        "userId": 1,
        "item": item,
        "count": new_count
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
    };
    let rawData = await fetch('http://127.0.0.1:5000/retrieve-data', options)
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
    return await rawData.json();
}

//adding event listener for plus/minus icon

for(var i = 0; i < 9; i++) {
    const a = document.getElementById(ITEM_IDS[i]);
    const b = a.getElementsByClassName("plus")[0]
    const c = a.getElementsByClassName("minus")[0]
    const counter_el = b.previousElementSibling;
    const parent = b.parentElement.parentElement;
    b.addEventListener("click", function() {
        let n = increment(parent.id, Number(counter_el.innerHTML) + 1)
        counter_el.innerHTML = Number(counter_el.innerHTML) + 1;
    })
    c.addEventListener("click", function() {
        let n = increment(parent.id, Number(counter_el.innerHTML) - 1)
        counter_el.innerHTML = Number(counter_el.innerHTML) - 1;
    })
}




