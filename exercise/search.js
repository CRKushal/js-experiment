var fruits = [
  { id: 1, name: 'Banana', color: 'Yellow' },
  { id: 2, name: 'Apple', color: 'Red' }
];

function serachByName(fruits, name) {
  let newFruit = fruits.find(function (fruit) {
    if (fruit.name.toLowerCase() == name.toLowerCase()) {
      return fruit;
    }
  });
  return newFruit;
}
let searched = serachByName(fruits, 'apple');
console.log(searched);

// alternative way

// function searchByName(fruit) {
//     return fruit.name === 'Banana';
// }
// console.log(fruits.find(searchByName));
