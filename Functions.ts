// Functions
// function expression

const sum: (a: number, b: number) => number = (a, b) => a + b;

console.log(sum(10, 20));

// Add properties on function (callable signature)
// -> a callable that also has a prop

type SumWithDescription = {
	description: string;
	(a: number, b: number): number;
};

function sumWDescription(a: number, b: number): number {
	return a + b;
}
sumWDescription.description = "Add two numbers and return the sum.";

function performSum(sum: SumWithDescription, a: number, b: number) {
	console.log(
		`this function does: ${sum.description}, and its result is ${sum(a, b)}`
	);
}

performSum(sumWDescription, 10, 50);

// Generic functions

// this function can only return any since the accepted param is an any array
function getFirstElement(elements: any[]): any {
	return elements[0];
}

// <Element> defines a type parameter
function getFirstElementGeneric<Element>(elements: Element[]): Element {
	return elements[0];
}

console.log(getFirstElement([1, 2, 3]));
console.log(getFirstElement(["1", "2", "3"]));
console.log(getFirstElement([true, false, false]));

// Constraints
interface Length {
	length: number;
}
function getLongest<Item extends Length>(itemA: Item, itemB: Item): Item {
	if (itemA.length > itemB.length) {
		return itemA;
	} else {
		return itemB;
	}
}

console.log(getLongest("Hello", "world"));
console.log(getLongest([1, 2], [1, 2, 3, 4]));

// Constraint Infer
function combine<Type>(a: Type[], b: Type[]): Type[] {
	return a.concat(b);
}

console.log(combine([1, 2], [3, 4]));
// this isnt allowed since the Type parameter says a AND b MUST be of same type.
// console.log(combine([1, 2], ["hello", "world"));
// Solution -> use a type that allows both
console.log(combine<number | string>([1, 2], ["hello", "world"]));

// Optional parameters
function multiply(multiplier: number, multiplicandOptional?: number) {
	// since multiplier is optional, the actual type is 'number'|'undefined'
	const multiplicand = multiplicandOptional ?? 1;
	return multiplier * multiplicand;
}

console.log(multiply(100, 2));
console.log(multiply(200));

// Default args
// since multiplicand argument will always at least be 1, its of type 'number'
function multiplyDefault(multiplier: number, multiplicand: number = 1) {
	return multiplier * multiplicand;
}

// Overloads
function makeObj(a: number): void;
function makeObj(c: number, b: number): void;
// this is now the implementation signature of the overload function
function makeObj(a: number, c?: number, b?: number): void {
	if (c !== undefined && b !== undefined) {
		console.log(`this is a function called with ${c} and ${b}`);
	} else {
		console.log(`this is a function called with ${a}`);
	}
}

function greet(person: string): string;
function greet(person: { name: string }): string;
function greet(person: { name: string } | string): string {
	if (typeof person === "string") {
		return `hello, ${person}`;
	} else {
		return `Hello, ${person.name}`;
	}
}

console.log(greet({ name: "Valentin" }));

// now we can call this function either with a single argument or with two
makeObj(2, 3);
makeObj(1);

// This in TS
const person = {
	name: "Valentin",
	age: 22,
	greet: function () {
		console.log(`Hello, ${this.name}!`);
	},
};

// Rest parameters
function addNumbers(...numbers: number[]): number {
	return numbers.reduce((prev, current) => prev + current, 0);
}

const sumNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(`sum of ${sumNumbers} is ${addNumbers(...sumNumbers)}`); // 45

const sumObj = {
	a: 1,
	b: 2,
	c: 3,
};

function sumByObj({ a, b, c }: { a: number; b: number; c: number }): number {
	return a + b + c;
}

console.log(sumByObj(sumObj));
