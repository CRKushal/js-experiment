var arr = [[1, 2, 3], [2, 4, 5], 6, { name: 'kushal' }, { address: 'pokhara' }];

var outPut = arr.reduce(function (acc, curr) {
    if (Array.isArray(curr)) {
        curr.forEach(function (item) {
            if (acc.indexOf(item) == -1) {
                acc.push(item)
            };
        });
    } else if (acc.indexOf(curr) == -1) {
        acc.push(curr);
    }
    return acc;
}, []);

console.log(outPut);

// alternative to flatten only

// var myNewArray = arr.reduce(function (prev, curr) {
//   return prev.concat(curr);
// });
// console.log(myNewArray);

