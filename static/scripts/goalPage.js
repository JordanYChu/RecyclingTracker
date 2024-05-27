console.log("Running Test.js");
// const categories = [4,1,10,1,10,1,1,1]
// let total = 0
// for(let i = 0; i < 8; i++) {
//     total += categories[i];
// }
// console.log(total)



ITEM_IDS = ["soft-plastic", "hard-plastic", "glass", "paper", "cardboard", "metal", "electronics", "styrofoam"];

const totalQuantityItem = async (item) => {
    const post_info = {
        "userId": 1,
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
async function updateTotalMeter() {
    var categories = [0,0,0,0,0,0,0,0]
    var total =0;
    for(var i = 0;i < 8; i++) {
        let b =  await totalQuantityItem(ITEM_IDS[i])
        categories[i] = b["total"]
        console.log("cat:", categories[i])
        total+=categories[i]
    }

    console.log("Inside Ratio")
    const meter = document.getElementById("global-meter");
    //calculate percentages
    let percentages = [0,0,0,0,0,0,0,0]
    percentages[0] = categories[0]/total
    for(let i = 1; i < 7; i++) {
        percentages[i] = percentages[i-1] + categories[i]/total
    }
    //set items percentages
    let cssText = "";
    cssText += "--soft-plastic: " + percentages[0]*100 + "%;";
    cssText += "--hard-plastic: " + percentages[1]*100 + "%;";
    cssText += "--glass: " + percentages[2]*100 + "%;";
    cssText += "--paper: " + percentages[3]*100 + "%;";
    cssText += "--cardboard: " + percentages[4]*100 + "%;";
    cssText += "--metal: " + percentages[5]*100 + "%;";
    cssText += "--textiles: " + percentages[6]*100 + "%;";
    cssText += "--styrofoam: " + percentages[7]*100 + "%;";
    meter.setAttribute("style",  cssText)
}
updateTotalMeter()

function updateItemGoal() {

}
function updateItemCount(item_id, count) {
    const m = document.getElementById(item_id).getElementsByTagName("meter")[0];
    m.value = count;
}

updateItemCount("soft-plastic",20);