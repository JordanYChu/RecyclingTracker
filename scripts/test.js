console.log("Running Test.js");
const categories = [4,1,1,1,10,1,1,1]
let total = 0
for(let i = 0; i < 8; i++) {
    total += categories[i];
}
console.log(total)


function setRatio(categories, total) {
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
setRatio(categories,total)

function updateItemGoal() {

}
function updateItemCount(item_id, count) {
    const m = document.getElementById(item_id).getElementsByTagName("meter")[0];
    m.value = count;
}

updateItemCount("soft-plastic",20);