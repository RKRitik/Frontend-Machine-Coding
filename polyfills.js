Function.prototype.myBind = function (obj = {}, ...args1) {
  obj.function = this;
  return function (...args2) {
    obj.function(...args1, ...args2);
  };
};

Function.prototype.myCall = function (obj = {}, ...args) {
  obj.fn = this;
  obj.fn(...args);
};

Function.prototype.myApply = function (obj = {}, args) {
  obj.fn = this;
  //args is array
  obj.fn(...args);
};

Array.prototype.myMap = function (fn, thisArg) {
  if (typeof fn !== "function") throw new TypeError(fn, "is not a function");
  //return an array
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(fn.call(thisArg, this[i], i));
  }
  //perform the function on each value from array
  return result;
};

Array.prototype.myFilter = function (fn, thisArg) {
  if (typeof fn !== "function") throw new Error("value is not a function");
  //return an array
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisArg, this[i], i)) result.push(this[i]);
  }
  //perform the function on each value from array
  return result;
};

Array.prototype.myReduce = function (fn, thisArg) {};

function once(func, context) {
  let result,
    hasRun = false;
  return function (...args) {
    if (!hasRun) {
      result = func.apply(context || this, args);
      hasRun = true;
      return result;
    }
  };
}

function memoize(fn, thisArg) {
  const cache = new Map(); // Or use: const cache = {}; for a plain object
  return function (...args) {
    const argsString = args.join("-"); // Works for both Map and object
    if (cache.has(argsString)) {
      // Or: if (argsString in cache) for a plain object
      return cache.get(argsString); // Or: cache[argsString]
    } else {
      const result = fn.call(thisArg || this, ...args);
      cache.set(argsString, result); // Or: cache[argsString] = result
      return result;
    }
  };
}

Function.prototype.myDebounce = function (fn, thisArg) {};

const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last > delay) {
      fn.apply(this, args);
      last = now;
    }
  };
};

//Promise polyfill

//Promise.all polyfill
//fail fast, if any fails return error
//otherwise return all results
Promise.customAll = function (promises) {
  if (!promises) throw new TypeError("arg is not an iterable");
  if (promises.constructor !== Array)
    throw new TypeError("not an array of promises");

  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let count = 0;

    promises.forEach((promise, index) => {
      // Check if the item is thenable
      if (promise && typeof promise.then === "function") {
        promise
          .then((res) => {
            results[index] = res;
            count++;
            if (count === results.length) resolve(results);
          })
          .catch((e) => reject(e));
      } else {
        // If it's not thenable, treat it as a resolved value
        results[index] = promise;
        count++;
        if (count === results.length) resolve(results);
      }
    });

    // If the array is empty, resolve immediately
    if (promises.length === 0) {
      resolve(results);
    }
  });
};

//Promise.any
//returns first resolved promise, of if all fails returns all rejected promises

//Promise.allSettled polyfill
//return response to all promises , where resolved or not

//Promise.race polyfill
//return first fulfilled promise either rejected or resolved
