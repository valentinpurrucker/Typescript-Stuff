// Primitive types

const message: string = "Hello World";

console.log(message.length);

const age: number = 22;

for (let i = 0; i < age; i++) {
	console.log(i.toString());
}

const isAdult: boolean = age > 18;

// Arrays

const names: string[] = [];
// alternatively
const namesAlt: Array<string> = [];

for (let i = 0; i < 10; i++) {
	names.push(`Name ${i}`);
}

// Normally you cant use features that loosly typed languages offer e.g. assign number to string var.
// typescript offers any type that means a variable can be of any type.

let anyVar: any = "Hello";
anyVar = 10;

// Type annotations
// can be inferred or explicit

const explicitType: string = "Hello world";
console.log(explicitType.charAt(4)); // o
const implicityType = "Hello world";
console.log(implicityType.charAt(4)); // o

// Functions in typescript
function greet(name: string) {
	console.log(`Hello ${name.toLowerCase()}`);
}

// return types are optional since ts will infer from type from return statement
function greetReturn(name: string): string {
	return `Hello ${name.toUpperCase()}`;
}

const greeting = greetReturn("Joe");
console.log(greeting);

// Anonymous function
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// parameter type is inferred because of its calling context -> calling a function on number array will get its items as numbers
const squaredNumbers = numbers.map(function (number): number {
	return number * number;
});

const squaredNumbersExpression = numbers.map((number) => number * number);

console.log(squaredNumbers);

// Object types

function sayHello(person: {
	name: string;
	age: number;
	gender?: string;
}): string {
	return `Hello there, ${person.name} who is ${
		person.age
	} years old and of gender ${person.gender ?? "no gender"}`;
}

console.log(
	sayHello({
		name: "Leo",
		age: 100,
	})
);

// Union Types -> Types from other types

// age is a union type of either number or string -> can be both
function getPeronsInfo(person: { name: string; age: number | string }): string {
	// to access specific methods on either type we must narrow them
	if (typeof person.age == "number") {
		// now ts is sure age is of type number
		const isAdult = person.age >= 18;
		return `${person.name} is ${person.age} years old, who is ${
			isAdult ? "an adult" : "a child"
		}`;
	} else {
		// else -> now age can only be of type string since age is of union type.
		return `${person.name.toUpperCase()} is ${person.age} years old`;
	}
}

console.log(getPeronsInfo({ name: "Vali", age: 22 }));
console.log(getPeronsInfo({ name: "Vali", age: "22" }));

// Type alias
// before age was manually declared of type number | string
// you might want to name this type

type Age = string | number;

// now Age is a valid type
function checkAdult(person: { name: string; age: Age }): string {
	if (typeof person.age == "string") {
		if (parseInt(person.age) >= 18) {
			return "this person is an adult";
		} else {
			return "this person is a child";
		}
	} else {
		if (person.age >= 18) {
			return "this person is an adult";
		} else {
			return "this person is a child";
		}
	}
}

// Interface -> declare object types

interface Person {
	name: string;
	age: number;
}

// TS only checks the resulting structure -> if me has at least the properties of 'Person' its considered of type Person
const me: Person = {
	name: "Vali",
	age: 22,
};

// Type assertions

class Person {
	name: string;
	age: number;
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}

class Student extends Person {
	degree: string;
	constructor(name: string, age: number, degree: string) {
		super(name, age);
		this.degree = degree;
	}
}

const student = new Student("Vali", 22, "Business Information Systems");

const people: Person[] = [];

people.push(student);

// getting the element will return it as a Person although we know its a student
const assertedStudent = people.pop() as Student;
