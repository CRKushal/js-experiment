var people = [{
    id: 1,
    name: "Aegon Targaryen",
    children: [{
        id: 2,
        name: "Jaehaerys Targaryen",
        children: [{
            id: 4,
            name: "Daenerys Targaryen"
        }, {
            id: 5,
            name: "Rhaegar Targaryen",
            children: [{
                id: 6,
                name: "Aegon Targaryen"
            }]
        }]
    }, {
        id: 3,
        name: "Rhaelle Targaryen"
    }],
}];

function toNormalize(people) {
    var output = {};
    for (var i = 0; i < people.length; i++) {
        var obj = { id: people[i].id, name: people[i].name, children: [] };
        // console.log(output[people[i].id] = obj);
        output[people[i].id] = obj;
        output = forChildren(people[i], output);
    }
    return output;
}

function forChildren(obj, output) {
    if (!obj.children) {
        return output;
    }
    for (var i = 0; i < obj.children.length; i++) {
        var data = { id: obj.children[i].id, name: obj.children[i].name, children: [] };
        output[obj.children[i].id] = data;
        output[obj.id].children.push(obj.children[i].id);
        forChildren(obj.children[i], output);
    }
    return output;
}

var output = toNormalize(people);
console.log(output);