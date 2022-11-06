export {position, Vector2, START_COORDS_2}

type position<T extends 2 | 3> = T extends 2 ? {
	x: number,
	y: number,
} : {
	x: number,
	y: number,
	z: number,
}

const START_COORDS_2: position<2> = {
	x: 0,
	y: 0,
}

class Vector2{
	public coords: position<2>;
	constructor({x, y}: position<2> = START_COORDS_2) {
		this.coords = {x,y};
	}

	get x(): number{
		return this.coords.x;
	}
	set x(value: number) {
		this.coords.x = value;
	}

	get y(): number{
		return this.coords.y;
	}
	set y(value: number) {
		this.coords.y = value;
	}

	add(other: Vector2 | position<2>): Vector2{
		const newPosition = {
			x: this.x + other.x,
			y: this.y + other.y,
		}
		return new Vector2(newPosition)
	}
	subtract(other: Vector2 | position<2>): Vector2{
		const newPosition = {
			x: this.x - other.x,
			y: this.y - other.y,
		}
		return new Vector2(newPosition)
	}
	multiply(other: Vector2): number
	multiply(factor: number): Vector2
	multiply(factor: number | Vector2): number | Vector2{
		if (factor instanceof Vector2){
			return this.x * factor.x + this.y * factor.y;
		} else{
			const newPosition = {
				x: this.x * factor,
				y: this.y * factor,
			}
			return new Vector2(newPosition);
		}
	}

	distance2(other: Vector2 | position<2>): number{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return dx * dx + dy * dy;
	}
	distance(other: Vector2 | position<2>): number{
		return Math.sqrt(this.distance2(other));
	}

	get length2(): number{
		return this.distance2(START_COORDS_2)
	}
	get length(): number{
		return this.distance(START_COORDS_2)
	}

	get normalized(): Vector2{
		const newPosition = {
			x: this.x / this.length,
			y: this.y / this.length,
		}
		return new Vector2(newPosition)
	}

	get vertical(): Vector2{
		const newPosition = {
			x: this.y,
			y: -this.x,
		}
		return new Vector2(newPosition);
	}

	get JSON(): string{
		return JSON.stringify(this);
	}

	toString(): string{
		return `(${this.x}, ${this.y})`;
	}
	valueOf(): number{
		return this.length;
	}
	toJSON(): object{
		return {'x': this.x, 'y':this.y}
	}

	static getPosition(target: Vector2 | position<2>): position<2>{
		return {
			x: target.x,
			y: target.y,
		};
	}
	static from(target: Vector2 | position<2> | string): Vector2{
		if(typeof target === 'string'){
			const object = JSON.parse(target);
			return new Vector2({
				x: object.x,
				y: object.y,
			})
		} else {
			return new Vector2({
				x: target.x,
				y: target.y,
			})
		}
	}
}