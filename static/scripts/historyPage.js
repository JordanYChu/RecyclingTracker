ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "styrofoam"];
//GET request for data for specific day

const getItemsFromDate= async (date) => {
    //make post request
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
    let rawData = await fetch('http://127.0.0.1:5000/all-item-values', options)
    // .then(data => {
    //     if (!data.ok) {
    //         throw Error(data.status);
    //     }
    //     return data.json();
    //     }).then(update => {
    //         console.log("writing update")
    //         console.log(update);
    //     }).catch(e => {
    //     console.log(e);
    //     });

    //make get request
    console.log("test", rawData)
    // let rawData = await fetch("http://127.0.0.1:5000/all-item-values");
    let jsonData = await rawData.json();
    return jsonData;
}

const loadItems = async() => {
    console.log("loading items..")
    let jsonData = await getItemsFromDate("2024-05-17");
    console.log(jsonData["cardboard"])
    // const day_goal = jsonData[insert_key_here]
    const goal_el = document.getElementsByClassName("circle-progress")[0]
    let total = 0;
    for(var i = 0; i < 8; i++) {
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
    goal_el.setAttribute("style", "--total: \"" + total + "\";")
}

loadItems()