class Database {
    #data = [
        {
            name: "Ivan",
            age: 30,
            gender: "m",
        },
        {
            name: "Christopher",
            age: 34,
            gender: "m",
        },
        {
            name: "Cheryl",
            age: 29,
            gender: "f",
        },
        {
            name: "Kelly",
            age: 27,
            gender: "f",
        },
    ];

    filter(prop, value) {
        return new Promise((resolve) => {
            resolve(this.#data.filter(person => person[prop] === value));
        });
    }
}

const db = new Database();
db.filter("gender", "f").then((r) => console.log("filter() returns", r));