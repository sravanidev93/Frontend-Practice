
const FRUITS = ["apple", "banana", "orange", "grapes", "kiwi", "papaya", "apple", "apple", "grapes", "kiwi", "orange", "apple", "apple"]

let fruitsCount = FRUITS.reduce(function (acc, fruit, index, FRUITS) {

    // console.log("I am "+" "+fruit," "+"at"+" "+index,"in Fruits");

    // fruitsCount[fruit]=fruitsCount[fruit]||0+1;

    if (acc[fruit]) {
        acc[fruit] += 1;
    } else {
        acc[fruit] = 1
    }
    return acc;

}, {});


// console.log(fruitsCount);

let isVisible=false;

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("toggle");

    const container = document.getElementById("main");

    container.innerHTML = "";

    function generateFruitList(){
        FRUITS.map(function (fruit) {
        // console.log(fruit,fruitsCount[fruit]);
        let element = `<h1>${fruit} ${fruitsCount[fruit]}<h1>`;
        container.innerHTML += element
    })
    }

    btn.addEventListener("click", function showHide(){
        if (!isVisible){
            generateFruitList();
            btn.innerText="Hide FruitList";
            isVisible=true;

        }else{
            isVisible=false;
            container.innerHTML="";
            btn.innerText="Show FruitList";
        }
    })

})


