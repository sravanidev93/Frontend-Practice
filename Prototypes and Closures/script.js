
let person1={
    name:"Sravani",
    age:21,
    place:"Mpl"
};

let person2={
    name:"Derangula",
    age:25,
    place:"Madanapalle",
    fn:function details(){
        console.log(this.name+" "+"who lives in"+" "+this.place+" "+"is"+" "+this.age+" "+"years old");
    }

};

// person2.fn();

// person2.fn.call(person1);

Object.prototype.MyBind=function(obj){
    console.log(this);
    obj.addedMethod=this;
    console.log(obj);
    return function(){
        obj.addedMethod();
    }

}

const bindFnP1=person2.fn.MyBind(person1);

console.log(bindFnP1);
// bindFnP1()


function World(name,speciality){
    this.name=name;
    this.speciality=speciality;
};

World.prototype.introduceFn=function (obj){
        console.log(this.name+" "+"which is known for"+" "+this .speciality +" "+"is a part of "+this);

}

Object.prototype.sayHi=function (obj){
    console.log("Hi!,"+"I am "+this.name);
    console.log(this);

}

let tree=new World("tree","greenary");
let water=new World("water","purity");

tree.introduceFn();
tree.sayHi();
water.introduceFn();
water.sayHi();
person2.sayHi();
person1.sayHi();
