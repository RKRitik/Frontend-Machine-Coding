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

//implement PUB SUB library
//implement tic tac toe
//HLD of jira software
//box model ,flex, specificity
//flipkart ->
//FIND DEPTH OF A NODE IN HTML TREE
//IMPLEMENT LRU CACHE
//product list on left(from api), chat on right on click on product(options from api)
//redux implementation
//amazon
// Given a series of child-parent relations like
// capture the relationship of these entities so you can print the
// relationships in a nested format at any point.
//understand this!!!
function findAndAddChild(obj, child, parent) {
  // If we found the parent, add the child to it
  if (parent in obj) {
    obj[parent][child] = {};
    return true;
  }

  // Recursively search through all nested objects
  for (let key in obj) {
    if (
      typeof obj[key] === "object" &&
      findAndAddChild(obj[key], child, parent)
    ) {
      return true;
    }
  }
  return false;
}

function addRelation(map, [child, parent]) {
  // If parent doesn't exist anywhere in the structure, add it at top level
  if (!findAndAddChild(map, child, parent)) {
    if (!map[parent]) map[parent] = {};
    map[parent][child] = {};
  }
  return map;
}

let map = {};
map = addRelation(map, ["dog", "mammal"]);
map = addRelation(map, ["shark", "fish"]);
map = addRelation(map, ["cat", "mammal"]);
map = addRelation(map, ["mammal", "animal"]);
map = addRelation(map, ["fish", "animal"]);
map = addRelation(map, ["nemo", "fish"]);
map = addRelation(map, ["puppy", "dog"]);
map = addRelation(map, ["small-fish", "nemo"]);
console.log(JSON.stringify(map, null, 2));
return;

/**
 *
 * @param {*} input - eg "a.b.c",2
 * @param {*} finalValue {a: {b: c: 2}}
 */
function stringToObject(path, value) {
  if (typeof path !== "string" || path.length === 0) {
    throw new TypeError("Path must be a non-empty string.");
  }

  const result = {};
  const keys = [];
  let currentKey = "";
  let inQuotes = false;

  // Parse the keys from the path
  for (let i = 0; i < path.length; i++) {
    const char = path[i];

    if (char === '"') {
      inQuotes = !inQuotes; // Toggle inQuotes state
    } else if (char === "." && !inQuotes) {
      if (currentKey) {
        keys.push(currentKey);
        currentKey = "";
      }
    } else {
      currentKey += char;
    }
  }

  if (currentKey) {
    keys.push(currentKey); // Add the last key
  }

  let current = result;

  // Build the object structure
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // If it's the last key, assign the value
    if (i === keys.length - 1) {
      current[key] = value; // Assign the value to the final key
    } else {
      // Create a new object or array if it doesn't exist
      if (!current[key]) {
        current[key] = isNaN(keys[i + 1]) ? {} : []; // Create an array if the next key is numeric
      }
      current = current[key]; // Move to the next level
    }
  }

  return result;
}

// Test cases
console.log(stringToObject("a.b.c", 1)); // { a: { b: { c: 1 } } }
// console.log(stringToObject("", 1)); // Throws TypeError
console.log(stringToObject('a."b.c"."d.e"', 2)); // { a: { 'b.c': { 'd.e': 2 } } }
console.log(stringToObject("users.0.name", "devtools tech")); // { users: [{ name: "devtools tech" }] }
console.log(stringToObject("a.b.c", 1)); // { a: { b: { c: 1 } } }

// Test cases
// console.log(stringToObject("a.b.c", 1));
// { a: { b: { c: 1 } } }

// console.log(stringToObject("", 1));
// Throws TypeError

// console.log(stringToObject('a."b.c"."d.e"', 2));
// { a: { 'b.c': { 'd.e': 2 } } }

///console.log(stringToObject("users.0.name", "devtools tech"));
// { users: [{ name: "devtools tech" }] }

console.log(stringToObject("a.b.c", 1));
// { a: { b: { c: 1 } } }

// console.log(stringToObject("", 1));
// throw a TypeError

// console.log(stringToObject('a."b.c"."d.e"', 2));
// consider "b.c" and "d.e" as individual keys
// output => { a: { 'b.c': { 'd.e': 2 } } }

// console.log(stringToObject("users.0.name", "devtools tech"));
