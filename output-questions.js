const obj = {
  name: "ritik",
  greet: function () {
    setTimeout(function () {
      console.log("hi", this.name);
    }, 1000);
  },
};

obj.greet(); //prints hi, undefined
//setTimeout has it own this context, and does not have access to outer this

const obj1 = {
  name: "ritik",
  greet: function () {
    setTimeout(() => {
      console.log("hi", this.name);
    }, 1000);
  },
};

obj1.greet(); //prints hi, ritik

//or do
//setTimeout(function () {
//      console.log("hi", this.name);
//    }.bind(this), 1000);
/////////////////////////////////////////////////////

//for OR, prints first truthy value, or last value if all falsey
//for AND, prints first falsey value or last truthy value
console.log(42 && "ritik" && 9); // 9
console.log(undefined && "ritik" && 0); //undefined
console.log(true || "ritik" || 45); //true
console.log(false || 0 || undefined); //undefined
console.log(45 ?? 0); // 45
console.log(0 ?? "default"); // 0
console.log(null ?? 0); // 0
console.log(undefined ?? 10); // 10

////////////////////////////////////////////////////////

var employee = { company: "abc" };
var emp1 = Object.create(employee);
delete emp1.company;
console.log(emp1.company); //prints abc, because company propery is part of prototype, which is not deleted
//dot operator which checks for property in object, then checks its prototype chain for matching properties
delete employee.company;
console.log(emp1.company); //prints null, because propeerty as deleted from object added a protoype

////////////////////////////////////////////
var output = (function (a) {
  delete a;
  return a;
})(0);
console.log(output); //ouputs 0, delete only works on object and not on primitives

////////////////////////////////////////////////
