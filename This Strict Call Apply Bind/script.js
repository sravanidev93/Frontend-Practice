'use strict'
console.log(this)

var name = "Sravani";


function printName() {
    var name = 'Derangula'
    console.log(this.name);
    console.log(name);
    console.log(this);
    console.log(printName.name, printName.length)
}

var sayHi = () => {
    console.log(this.name);
    console.log(this);
}

//in strict mode this is undefined
// sayHi();
// printName();

const quote = 'Nothing comes easier in Life'

//in strict mode inside objects this is not undefined
const myprofile = {
    name: "Derangula Sravani",
    interests: "Web Development",
    quote: "Live your best life",
    hobby: "Watching movies and Tv",
    greetGlobally: () => { //refers to global object in non strict mode 
        //refers to the object itself in strict mode
        console.log(this)
        console.log("hi,I am" + " " + this.name + " " + "Nice to meet you!!!")
    },
    sayHobby() { //refers to the object itself @method @method shorthand in both strict and non strict mode
        console.log(this)
        console.log("My hobbies are " + this.hobby)
    },
    sayRandom: function fn() { //refers to the object itself @named function expression @method
        console.log(this)
        console.log(this.quote)
    },
    greetLocally: function () { //refers to the object itself @function variable expression 
        console.log(this)
        console.log("hi,I am" + " " + this.name + " " + "Nice to meet you!!!")
    },
    sayAge(age){
        console.log("My age is"+age+"years old")
    }

}

myprofile.greetGlobally();
myprofile.greetLocally();
myprofile.sayHobby();
myprofile.sayRandom();


const person2 = {
    name: "jasmine",
    interests: "Art",
    quote: "Embrace your Flaws",
    hobby: "Painting,dancing and singing",

}

myprofile.greetGlobally.call(person2);
myprofile.greetLocally.call(person2);

myprofile.sayRandom.call(person2);
myprofile.sayAge.apply(person2,[21]);
const bindHobby=myprofile.sayHobby.bind(person2);
bindHobby();

