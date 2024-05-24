
console.log("testing information requests")

//Change soft-plastic count
const getItems = async () => {
    let rawData = await fetch("http://127.0.0.1:5000/data");
    let jsonData = await rawData.json();
    return jsonData;
}

const getItemCount = async(item_id) => {
    let jsonData = await getItems();
    console.log(jsonData[item_id])
    return jsonData[item_id]
}
getItemCount("soft-plastic");