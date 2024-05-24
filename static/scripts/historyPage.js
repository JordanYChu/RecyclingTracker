ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "styrofoam"];
//GET request for data for specific day

const getItemsFromDate= async (date) => {
    let rawData = await fetch("http://127.0.0.1:5000/data");
    let jsonData = await rawData.json();
    return jsonData;
}

const loadItems = async() => {
    let jsonData = await getItemsFromDate();
    // const day_goal = jsonData[insert_key_here]
    const goal_el = document.getElementById 
    for(var i = 0; i < 8; i++) {
        var count = jsonData[ITEM_IDS[i]]
        const item_el = document.getElementById(ITEM_IDS[i]).getElementsByClassName("item-count")[0]
        a.innerHTML = count;
    }
}

loadItems()