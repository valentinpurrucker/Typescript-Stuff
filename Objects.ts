// Object Types
// Most basic form

// make props that will never change readonly
type Vehicle = {
	readonly name: string;
	seats: number;
	readonly wheels: number;
	steering: "wheel" | "handlebar";
	// optional property
	gears?: number;
};

const car: Vehicle = {
	name: "VW",
	seats: 5,
	wheels: 4,
	steering: "wheel",
};

// car.name = "Audi"; isnt allowed since its a readonly prop.

function processVehicle(vehicle: Vehicle) {
	console.log(
		`this is a ${vehicle.name} and it has ${
			vehicle.gears === undefined ? "no" : vehicle.gears
		} gears`
	);
}
processVehicle(car);

interface Person {
	name: string;
	age: number;
}
// Student essentially gets all props from Person copied to its declaration
interface Student extends Person {
	studId: number;
	subjectOfStudy: string;
}

// Intersection
interface A {
	propA: string;
}
interface B {
	propB: number;
}

function doAb(ab: A & B) {
	// ab now is of type that contains all props from A AND from B.
	ab.propA;
	ab.propB;
}

// Generic object types.
// besides the interface, also a type alias can be generic -> type Stack<Element> {...}
interface Stack<Element> {
	elements: Array<Element>;
	push: (element: Element) => void;
	pop: () => Element | undefined;
}

const numberStack: Stack<number> = {
	elements: new Array<number>(),
	push: function (element: number) {
		this.elements.push(element);
	},
	pop: function (): number | undefined {
		return this.elements.pop();
	},
};

// Readonly array
function printArrayContents<Type>(array: ReadonlyArray<Type>) {
	console.log(array.join(", "));
}

const content = ["Hello", "World", "!"];
// now the caller knows this array isnt being modified so it can be passed to the function safely
printArrayContents(content);

// Tuple type
type HttpStatus = [number, string];
function download(): HttpStatus {
	// do http stuff here ....
	return [200, "Download succeeded"];
}

// TS knows its an array with ever only 2 elements, first a number, second a string.
const [code, msg] = download();
