const calc = {
  total: 0,
  add: function (value) {
    this.total += value;
    return this;
  },
  multiply: function (value) {
    this.total *= value;
    return this;
  },
  subtract: function (value) {
    this.total -= value;
    return this;
  },
  divide: function (value) {
    this.total /= value;
    return this;
  },
};

const result = calc.add(10).add(10).subtract(1).divide(2);

//implement event emitters
//implement PUB SUB library
//implement tic tac toe
//HLD of jira software

console.log(result.total);
