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

function wait(seconds) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(seconds), seconds * 1000));
}

function sum(a, b) {
  return a + b
};

function promiseAll(items, mapper) {
  return items.
    reduce((execute, item) => execute.
      then(mappedItems => mapper(item).
        then(res => mappedItems.concat([item]))), Promise.resolve([]));
}

promiseAll([sum(1, 2), sum(3, 8), sum(4, 5)], wait).then(console.log);
