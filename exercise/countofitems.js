var names = ['John', 'Mary', 'John', 'John', 'Sherlock', 'Sherlock'];
var countedNames = names.reduce(function (acc, val) {
  if (val in acc) {
    acc[val]++;
  }
  else {
    acc[val] = 1;
  }
  return acc;
}, {});

console.log(countedNames);
// console.log(Array.isArray(names));
