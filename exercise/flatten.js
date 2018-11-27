var arr = [[1, 2, 3], [2, 4, 5], 6];

function flatten(arr) {
  var array = [];
  while (arr.length) {
    var value = arr.shift();
    if (Array.isArray(value)) {
      arr = value.concat(arr);
    } else {
      array.push(value);
    }
  }
  return array;
}

var flattenArray = flatten(arr);
console.log(flattenArray);

// alternative

// var myNewArray = arr.reduce(function (prev, curr) {
//     return prev.concat(curr);
// });
// console.log(myNewArray);
