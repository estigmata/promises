function promiseMap(items, mapper) {
  const reducer = (promise, item) =>
    promise.then(mappedItems => mapper(item).then(res => mappedItems.concat([res])));
  return items.reduce(reducer, Promise.resolve([]));
}

function wait(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(seconds), seconds * 1000);
  });
}

function sum(a, b) {
  return a + b
};

//promiseMap([1, 2, 3, 'Hola ', 'Nestor ', 'Puedes?', sum(4, 5)], wait).then(console.log);

function doFirstThing(){ return Promise.resolve(1); }
function doSecondThing(res){ return Promise.resolve(res + 1); }
function doThirdThing(res){ return Promise.resolve(res + 2); }
function lastThing(res){ console.log("result:", res); }

var fnlist = [ doFirstThing, doSecondThing, doThirdThing, lastThing];

function pseries(list) {
  var p = Promise.resolve();
  return list.reduce(function(pacc, fn) {
    return pacc = pacc.then(fn);
  }, p);
}

pseries(fnlist);

function promiseAll(items) {
  const execute = (item) => item.then(executeItems => executeItems.concat([executeItems]));
  return items.reduce(execute, Promise.resolve([]));
}

promiseAll([1, 2, 3, 'Hola ', 'Nestor ', 'Puedes?', sum(4, 5)], wait).then(console.log);
