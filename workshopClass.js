class Vehicule {
    constructor(color, model) {
        this.color = color;
        this.model = model;
    }
    display() {
        return `This Véhicule has ${this.color} and ${this.model}`;
    }
}

class Car extends Vehicule {
    constructor(color, model) {
        super(color, model);
    }
    display() {
        if (this.model === "BMW" || this.model === "Mercedes") {
            return `This vehicule is ${this.color}, is a ${this.model}, so this is a car!`;
        } else {
            return `Hum...This is not a real car!`
        }
    }
}

class Moto extends Vehicule {
    constructor(color, model) {
        super(color, model);
    }
    display() {
        if (this.model === "Suzuki" || this.model === "Harley Davidson") {
            return `This vehicule is ${this.color}, is a ${this.model}, so this is a Moto!`;
        } else {
            return `Hum...This is not a real moto!`
        }
    }
}

console.log((new Moto("blue", "Harley Davidson")).display());