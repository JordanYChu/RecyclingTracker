
console.log("testing information requests")



//Change soft-plastic count
const getItems = async (username) => {
    console.log("inside getitems", username)
    const post_info = {
        "username": username,
        "date": DATE
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(post_info)
    };
    let rawData = await fetch("http://127.0.0.1:5000/data", options);
    let jsonData = await rawData.json();
    return jsonData;
}

const getItemCount = async(item_id) => {
    let jsonData = await getItems();
    console.log(jsonData[item_id])
    return jsonData[item_id]
}