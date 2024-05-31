


//Change soft-plastic count
const getItems = async (username) => {
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
    let rawData = await fetch("/data", options);
    let jsonData = await rawData.json();
    return jsonData;
}

const getItemCount = async(item_id) => {
    let jsonData = await getItems();
    return jsonData[item_id]
}