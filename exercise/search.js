var fruits = [
  { id: 1, name: 'Banana', color: 'Yellow' },
  { id: 2, name: 'Apple', color: 'Red' }
];

function serachByName(fruits, name) {
  fruits.find(function (fruit) {
    if (fruit.name.toLowerCase() == name.toLowerCase()) {
      console.log(fruit)
    }
  });
}
serachByName(fruits, 'apple');

// alternative way

// function searchByName(fruit) {
//     return fruit.name === 'Banana';
// }
// console.log(fruits.find(searchByName));
