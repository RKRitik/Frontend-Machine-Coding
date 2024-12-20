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
      Promise.resolve(promise)
        .then((res) => {
          results[index] = res;
          count++;
          if (count === results.length) resolve(results);
        })
        .catch((e) => reject(e));
    });

    // If the array is empty, resolve immediately
    if (promises.length === 0) {
      resolve(results);
    }
  });
};

//Promise.any
//returns first resolved promise, of if all fails returns all rejected promises
Promise.customAny = function (promises) {
  if (!promises) throw new TypeError("not valid args");
  if (promises.constructor !== Array) throw new TypeError("not valid array");
  let settled = 0,
    errorArray = new Array(promises.length);
  return new Promise((outerResolve, outerReject) => {
    promises.forEach((promise, index) => {
      if (!promise.then) {
        //not a promise, resolve immediately
        outerResolve(promise);
      }
      Promise.resolve(promise)
        .then((res) => outerResolve(res)) //resolve as soon any any promise is success
        .catch((e) => {
          settled++;
          errorArray[index] = e;
          if (settled === promises.length)
            //all failed
            outerReject(errorArray);
        });
    });
  });
};

//Promise.allSettled polyfill
//return response to all promises , where resolved or not
Promise.myAllSettled = function (promises) {
  if (!promises) throw new TypeError("not valid args");
  if (promises.constructor !== Array) throw new TypeError("not valid array");
  const responses = new Array(promises.length);
  let settle = 0;
  return new Promise((outerResolve, outerReject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          responses[index] = { status: "fulfilled", value: res };
          settle++;
          if (settle === promises.length) outerResolve(responses);
        })
        .catch((e) => {
          responses[index] = { status: "rejected", reason: e };
          settle++;
          if (settle === promises.length) outerResolve(responses);
        });
    });
  });
};

//Promise.race polyfill
//return first fulfilled promise either rejected or resolved
Promise.myRace = function (promises) {
  if (!promises) throw new TypeError("not valid args");
  if (promises.constructor !== Array) throw new TypeError("not valid array");
  return new Promise((outerResolve, outerReject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => outerResolve(res)) //resolve as soon any any promise is success or failed
        .catch((e) => outerReject(e));
    });
  });
};

function flat(arr, depth = 1) {
  const result = [];
  //iterate over each element, if not array append
  //else if this is array, check current depth. and then do it.
  arr.forEach((value) => {
    if (Array.isArray(value) && depth >= 1) {
      const arrPart = flat(value, depth - 1);
      result.push(...flat(value, depth - 1));
    } else {
      result.push(value);
    }
  });
  return result;
}
