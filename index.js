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

promiseMap([1, 2, 3], wait).then(console.log);
