
// getElementbyId
console.log(document.getElementById("first"));

//getElementsByClassName-HTML Collection
console.log(...document.getElementsByClassName("details"));

//queryselector
console.log(document.querySelector('#second'));

//querySelectorall-nodelist
console.log(document.querySelectorAll('button'));

//by tag name -Html collection

console.log(1, document.getElementsByTagName('img'))

console.log(2, document.getElementsByTagName('img')[0])

console.log(3, ...document.getElementsByTagName('img'))

const pic = document.getElementsByTagName('img')[0];

console.log(pic.hasAttribute('width'));

pic.style.border="10px solid black";

const para1 = document.getElementById("para-one");

const para2 = document.querySelector("#para-two");

console.log(para1, para2);

para1.innerHTML = `    <h1>Hi, I am a WEB DEVELOPER</h1>
    <h3>I am learning Frontend</h3>
`;

para2.innerText=`
    This is second Example 
    using innerText
`;

para2.setAttribute('height','150px');

para2.setAttribute('width','400px')

para2.style.background='yellow';

para2.style.fontWeight="bold";

para2.style.fontSize='18px';

console.log(para2.getAttribute('height'))




