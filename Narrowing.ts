function getSize(width: number, padding: string | number): number {
	if (typeof padding == "string") {
		// TS knows that padding now is a string
		if (padding.includes(".")) {
			return width + parseFloat(padding);
		} else {
			return width + parseInt(padding);
		}
	} else {
		// now padding is considered as a number
		return width + padding;
	}
}

console.log(getSize(10, "20"));

interface Person {
	name: string;
	age: number;
}

function greet(person?: Person) {
	if (person != undefined) {
		return `Hello ${person.name}`; // here person is definitely not undefined
	} else {
		// here person is undefined
		return `Not a valid person to greet`;
	}
}

console.log(greet(undefined));

function greetAll(name: string | string[] | undefined) {
	if (name == undefined) {
		return "no valid name";
	} else {
		if (Array.isArray(name)) {
			return `hello ${name.join(" and ")}`;
		} else if (typeof name == "string") {
			return `Hello ${name}`;
		}
	}
}

console.log(greetAll(["Paul", "Josh", "Mike"]));

// Equality narrowing
function check(a: string | number, b: string | boolean) {
	if (a === b) {
		// since a and b are equal, this is only possible if both are of type string so ts treats them like strings.
		return `No difference between ${a.toUpperCase()} and ${b.toUpperCase()}`;
	} else {
		return `${a} and ${b} are not equal`;
	}
}

// Narrowing by 'in'

interface Car {
	wheels: number;
	drive: () => void;
}

interface Bike {
	wheels: number;
	pedals: number;
	drive: () => void;
}

function drive(vehicle: Car | Bike) {
	if ("pedals" in vehicle) {
		// ts now knows that vehicle can only be a bike
		console.log(`Bike with ${vehicle.pedals} pedals is driving`);
	} else {
		console.log(`Car is driving`);
	}
}

drive({
	wheels: 2,
	pedals: 2,
	drive: () => console.log("driving"),
});

// Instance of
class Message {
	msg: string;
	constructor(msg: string) {
		this.msg = msg;
	}
}

function sendMessage(msg: Message | string) {
	if (msg instanceof Message) {
		console.log(`sending "${msg.msg}"`);
	} else {
		console.log(`sending "${msg}"`);
	}
}

sendMessage(new Message("Hello world"));

// Type predicates

interface Fish {
	swim: () => void;
}

interface Bird {
	fly: () => void;
}

// Return type is a type predicate
function isFish(animal: Fish | Bird): animal is Fish {
	return (animal as Fish)!.swim !== undefined;
}

function getAnimal(isFish: boolean = true): Fish | Bird {
	if (isFish) {
		return { swim: () => console.log("swim") };
	} else {
		return { fly: () => console.log("fly") };
	}
}

let animal = getAnimal();

if (isFish(animal)) {
	// Typescript now knows that animal is a fish, so we can threat it like one
	animal.swim();
} else {
	// since animal can only be fish or bird, and its not a fish it must be of type bird.
	animal.fly();
}

// Discriminated unions
interface Shape {
	kind: "circle" | "square";
	radius?: number;
	length?: number;
}

function getArea(shape: Shape) {
	if (shape.kind === "circle") {
		// Math.PI * shape.radius ** 2; doesnt work since radius is still optional
	}
}

// so a better solution
interface Circle {
	kind: "circle";
	radius: number;
}

interface Square {
	kind: "square";
	length: number;
}

// Trick: Both objects have a prop in common so TS knows that if kind is 'circle' it is definitly not a Square, since its kind prop has value 'square'
type ShapeType = Circle | Square;

function getAres(shape: ShapeType) {
	if (shape.kind === "circle") {
		return Math.PI * shape.radius ** 2;
	} else {
		return shape.length ** 2;
	}
}
