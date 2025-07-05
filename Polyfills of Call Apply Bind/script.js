
const state1 = {
    stateName: "Andhra Pradesh",
    capital: "Amaravathi"
}



const state2 = {
    stateName: "Telangana",
    capital: "Hyderabad",
    sayCapital() {
        console.log(this.capital + " " + "is the capital city of" + " " + this.stateName);
    }
}


const Book1 = {
    name: "Frontend Course",
    author: "JTD",
    bookInfo(cost, pages) {
        console.log(this.name + "is written by" + " " + this.author + " " +
            "and it is written in " + " " + pages + " " + "pages" + " "+"and it costs" + " " + `$${cost}`);

    }
};

const Book2 = {
    name: "Frontend Course",
    author: "Joining The Dots",

}


Object.prototype.myCall = function (obj) {
    obj.fn = this;
    // console.log(this);
    if (Object.prototype.toString.call(this) == "[object Function]") {
        return obj.fn();
    }
    else {
        throw console.error("can only be called on functions");

    }
};

Object.prototype.MyCall = function (obj, ...args) {
    obj.method = this;
    // console.log(this, args);
    // console.log(Object.prototype.toString.call(this));
    if (Object.prototype.toString.call(this) == "[object Function]") {
        return obj.method(...args);
    }
    else {
        throw console.error("can only be called on functions");

    }
}


Object.prototype.MyApply = function (obj,args) {
    obj.applyMethod = this;
    // console.log(this, args);
    // console.log(Object.prototype.toString.call(this));
    if (Object.prototype.toString.call(this) !== "[object Function]") {
        throw console.error("can only be called on functions");

    }

    else if (!Array.isArray(args)) {
        throw new Error("Arguments should be in list type")
    }

    else {
        return obj.applyMethod(...args);

    }
}


Object.prototype.myBind = function (obj) {
    obj.bindFn = this;
    // console.log(Object.prototype.toString.call(this))
    if (Object.prototype.toString.call(this) !== "[object Function]") {
        throw console.error("can only be called on functions");

    }
    else {
        return function(){
            obj.bindFn();
        }

    }
}



Object.prototype.MyBind = function (obj, ...args) {
    obj.bindMethod = this;
    // console.log(this, args);
    // console.log(Object.prototype.toString.call(this))
    if (Object.prototype.toString.call(this) !== "[object Function]") {
        throw console.error("can only be called on functions");

    }
    else {
        return function(...params2){
            const params=[args,params2];
            obj.bindMethod(...params);
        }

    }
}

console.log("mycall with arguments");

Book1.bookInfo.MyCall(Book2,670,1678);

console.log("mycall without arguments");
state2.sayCapital.myCall(state2);


console.log("myapply with arguments array");
Book1.bookInfo.MyApply(Book2,[237,600]);

console.log("mybind with arguments")

const bindedBook2=Book1.bookInfo.MyBind(Book2,567);

bindedBook2(800);

console.log("my bind without arguments");
const bindedState1=state2.sayCapital.myBind(state1);

bindedState1();

