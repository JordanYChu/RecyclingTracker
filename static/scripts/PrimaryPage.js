//load User Data
ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"];
iconsDir = "../static/icons/"

//Get datevar 
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

// DATE = yyyy + '-' + mm + '-' + dd;
DATE = "2024-05-16"

// item-id: (name, image-name, description, [item_list])
descriptions = [
    "A flexible material that feels soft and doesn’t have a fixed shape. It is commonly used daily as a bag/container for groceries or food. It usually ends up in landfills or even in nature, endangering the lives of various species."
    ,"Another very common material to store items and foods. However, this type of plastic is much harder to break and has a fixed shape. This is also very dangerous to wildlife as they can get trapped in plastic"
    ,"Glass is also commonly used as containers. Recycling them can save a lot of energy from producing glass with raw materials. However, broken glass can be dangerous to the workers! Don’t put those in the recycling bin."
    ,"Paper is very common in our daily lives (Writing, Reading, Tissues, etc…) However, the world is cutting down too many trees in order to produce enough paper for us. Recycling can help prevent or slow down deforestation"
    ,"A durable material usually used to store items as a container. Recycling this can help save a lot of energy costs from producing cardboard with raw materials. You can also reuse cardboard boxes for your own storage too!"
    ,"Bring big metal scraps or appliances to a scrapyard or any depot! Metal is very durable and can be used for a variety of purposes. (Container, vehicle frames, cooking, etc…)"
    ,"Anything related to or requires electricity should not be thrown away or recycled in the bin. These should only be recycled in designated depots hosted by the government! (To ensure that it is safely recycled)."
    ,"Textiles include any clothing, accessories for footwear. They usually can be recycled or donated for other people to use! Usually there are drop off places for textiles to donate."
    ,"A very useful material to help cushion fragile items inside packaging. It is also used as a container for food. A vast amount of styrofoam ends up in landfills every year, contaminating nearby environments."
]
all_related_items = [
    ["Milk bags", "Produce bags", "Bubble wrap", "Recycling bags", "Sandwich bags"],
    

    [ "Plastic jugs", "Plastic bottles", "Takeout containers", "Plastic packaging", "Plastic drink cups" ],
    ["Glass bottles", "Glass jars", "Packaging"],
    ["Newspaper", "Writing paper", "Receipts", "Magazines", "Paper bags"],
    ["Grocery cardboard boxes", "Paper cups", "Paper plats/bowls", "Milk Cartons"],
    ["Aluminum cans/foils", "Tin cans", "Bicycle frames", "Household appliances", "Cooking pots/pans"],
    ["Batteries", "Television", "Monitors", "Telephones", "Accessories (Keyboards, Mice)"],
    ["Clothing", "Footwear (Shoes, Boots...)", "Accessories (Backpacks, Gloves)"],
    ["Styrofoam packaging", "Takeout containers"]
]
info_store = {
    "soft-plastic": ["Soft Plastic", "bag.png", descriptions[0], all_related_items[0]], 
    "hard-plastic": ["Hard Plastic", "water-bottle.png", descriptions[1], all_related_items[1]], 
    "glass": ["Glass", "glass-jar.png", descriptions[2], all_related_items[2]], 
    "paper": ["Paper", "paper.png", descriptions[3], all_related_items[3]], 
    "cardboard": ["Cardboard", "cardboard-box.png", descriptions[4], all_related_items[4]], 
    "metal": ["Metal", "screw.png", descriptions[5], all_related_items[5]], 
    "electronics": ["Electronics", "electronic.png", descriptions[6], all_related_items[6]], 
    "textiles": ["Textiles", "knitting.png", descriptions[7], all_related_items[7]], 
    "styrofoam": ["Styrofoam", "styrofoam.png", descriptions[8], all_related_items[8]]
}

load_side_info(document.getElementById("soft-plastic"))
//login open and close logic
let TOTAL = 0
const n_tracker = document.getElementById("total-goal-meter").getElementsByTagName("div")[0]

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
const loadData = async () => {
    var total = 0;
    let items = await getItems(USERNAME);
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
    var json = await getGoalFromDate()
    var goal = json["daily_goal"]
    const d = document.getElementById("total-goal-meter")
    let progress_bar = d.getElementsByTagName("div")[0]
    progress_bar.setAttribute("style", "--goal-count: " + Math.min(100,100*total/goal) + "%;")
    const goal_label = document.getElementById("goal-label")
    goal_label.innerHTML = goal;
    $(progress_bar).removeClass('progress_anim').show();
    $(progress_bar).addClass('progress_anim').show();
    TOTAL = total
    n_tracker.innerHTML = TOTAL
}

const getData = async (item_id) => {
    let item_count = await getItemCount(item_id);
    let counter_label = document.getElementById(item_id).getElementsByClassName("counter")[0];
    counter_label.innerHTML = item_count;
}

    

async function increment(item, new_count) {
    const update = {
        "username": USERNAME,
        "item": item,
        "count": new_count,
        "date": DATE
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
        const d = document.getElementById("total-goal-meter")
        d.setAttribute("value", Number(d.value)+1)
        TOTAL++
        n_tracker.innerHTML = TOTAL
        setGoalProperties(TOTAL, Number(document.getElementById("goal-label").innerHTML))
    })
    c.addEventListener("click", function() {
        if(Number(counter_el.innerHTML) <= 0) {
            counter_el.classList.add("reverse")
        }
        else {
            let n = increment(parent.id, Number(counter_el.innerHTML) - 1)
            counter_el.innerHTML = Number(counter_el.innerHTML) - 1;
            const d = document.getElementById("total-goal-meter")
            d.setAttribute("value", Number(d.value)-1)
            TOTAL--
            n_tracker.innerHTML = TOTAL
            setGoalProperties(TOTAL, Number(document.getElementById("goal-label").innerHTML))

        }
    })
    counter_el.addEventListener("animationend", (e) => {
        console.log("testing")
        counter_el.classList.remove('reverse')
    })
}

const set_goal_el = document.getElementById("goal-submit")
set_goal_el.addEventListener("keypress", function a(event) {
    if(event.key === "Enter" ) {
        if(isNaN(set_goal_el.value)) {
            alert("Enter a numerical value.")
            return
        }
        if(Number(set_goal_el.value) < TOTAL) {
            alert("Set a higher goal number")
            return
        }
        setsGoal(Number(set_goal_el.value))
        const d = document.getElementById("total-goal-meter")
        d.setAttribute("max", Number(set_goal_el.value))
        document.getElementById("goal-label").innerHTML = set_goal_el.value
        set_goal_el.blur()
        let progress_bar = document.getElementById("total-goal-meter").getElementsByTagName("div")[0]
        let n = Number(set_goal_el.value)
        setGoalProperties(TOTAL, n)
        set_goal_el.value = "";
    }
})

function setGoalProperties(total, new_goal) {
        let progress_bar = document.getElementById("total-goal-meter").getElementsByTagName("div")[0]
        progress_bar.setAttribute("style","--old-width: " + getComputedStyle(progress_bar).getPropertyValue("--goal-count") + "; --goal-count: " + Math.min(100,100*total/new_goal) + "%;")
        $(progress_bar).removeClass('progress_anim').show();
        $(progress_bar).addClass('progress_anim').show();
}

async function setsGoal(new_goal) {
        console.log("shouldnted")
    const update = {
        "username": USERNAME,
        "goal": new_goal,
        "date": DATE
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
    };
    let rawData = await fetch('http://127.0.0.1:5000/input-daily-goal-values', options)
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

lastOpenedItemId = ITEM_IDS[0];
for(var i = 0; i < 9; i++) {
    const tray = document.getElementById("item-tray");
    const item_el = document.getElementById(ITEM_IDS[i]);
    const more_info_el = item_el.getElementsByClassName("more-info")[0]
    more_info_el.addEventListener("click", function() {
        if(lastOpenedItemId == item_el.id) {
            openCloseTray(item_el);
        }
        else if(lastOpenedItemId != item_el.id && $(tray).hasClass("selected")) {
            load_side_info(item_el)
            lastOpenedItemId = item_el.id
        }
        else {
            openCloseTray(item_el);
        }
    })
    
}
function load_side_info(item_el) {
    const tray = document.getElementById("item-tray");
    item_id = item_el.id
    const item_details = info_store[item_id];
    const box_title = tray.getElementsByClassName("box-title")[0].getElementsByTagName("div")[0];
    const box_image = tray.getElementsByClassName("box-image")[0].getElementsByTagName("img")[0];
    const box_description = tray.getElementsByClassName("box-description")[0].getElementsByTagName("p")[0];
    const box_related = tray.getElementsByClassName("box-related-items")[0].getElementsByTagName("ul")[0];
    box_title.innerHTML = item_details[0];
    box_image.src = iconsDir+ item_details[1]

    box_description.innerHTML = info_store[item_id][2]
    const len_related_items = info_store[item_id][3].length;
    while (box_related.firstChild) { 
        box_related.removeChild(box_related.firstChild); 
    }
    for(var i = 0; i < len_related_items; i++) {
        var related_item = document.createElement("li")
        related_item.innerHTML = info_store[item_id][3][i];
        box_related.appendChild(related_item)
    }
}

function openCloseTray(item_el) {
    const tray = document.getElementById("item-tray");
    if($(tray).hasClass('dismiss')) {
        $(tray).removeClass('dismiss').addClass('selected').show();
    }
    else if($(tray).hasClass('selected')) {
        $(tray).removeClass('selected').addClass("dismiss");
    }
    load_side_info(item_el)
}