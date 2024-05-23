//load User Data
ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "styrofoam"];

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
const setData = async (item_id) => {
    let item_count = await getItemCount(item_id);
    let counter_label = document.getElementById(item_id).getElementsByClassName("counter")[0];
    counter_label.innerHTML = item_count;
}
preloadData()

const update = {
    "soft-plastic": 31,
    "hard-plastic": 31
};
    
const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(update)
    };

function fn() {
    fetch('http://127.0.0.1:5000/retrieve-data', options)
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

const a =document.getElementById("soft-plastic");
const b = a.getElementsByClassName("plus")[0]

b.addEventListener("click", function() {
    fn()
    // const counter_el = b.previousElementSibling;
    // counter_el.innerHTML = Number(counter_el.innerHTML) + 1;   
    // updateItemCount("soft-plastic")
})




