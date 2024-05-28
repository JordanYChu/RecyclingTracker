//load User Data
ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "textiles", "styrofoam"];

const preloadData = async () => {
    let items = await getItems();
    for(var i = 0; i < 8; i++) {
        let counter_label = document.getElementById(ITEM_IDS[i]).getElementsByClassName("counter")[0];
        if(items[ITEM_IDS[i]] == null) {
            counter_label.innerHTML = 0
        }
        else {
            counter_label.innerHTML = items[ITEM_IDS[i]];
        }
    }

}
preloadData()


const getData = async (item_id) => {
    let item_count = await getItemCount(item_id);
    let counter_label = document.getElementById(item_id).getElementsByClassName("counter")[0];
    counter_label.innerHTML = item_count;
}


    

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




