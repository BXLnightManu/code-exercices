class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    tellMyName() {
        let myName = this.name;
        return `I'm ${myName}`;
    }
    tellMyAge() {
        let myAge = this.age;
        return `I'm ${myAge} years old`;
    }
}

const john = new Person('John', 40);
const mary = new Person('Mary', 35);

const johnName = john.tellMyName();
const jonhAge = john.tellMyAge();
console.log(`${johnName} and ${jonhAge}.`);

const maryName = mary.tellMyName();
const maryAge = mary.tellMyAge();
console.log(`${maryName} and ${maryAge}.`);