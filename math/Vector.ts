export {coords, Vector2, START_COORDS_2}

type coords<T extends 2 | 3> = T extends 2 ? {
	x: number,
	y: number,
} : {
	x: number,
	y: number,
	z: number,
}

const START_COORDS_2: coords<2> = {
	x: 0,
	y: 0,
}

class Vector2{
	public x: number;
	public y: number;
	constructor({x, y}: coords<2> = START_COORDS_2) {
		this.x = x;
		this.y = y;
	}

	add(other: Vector2 | coords<2>): coords<2>{
		const newPosition = {
			x: this.x + other.x,
			y: this.y + other.y,
		}
		return new Vector2(newPosition)
	}
	subtract(other: coords<2>): coords<2>{
		const newPosition = {
			x: this.x - other.x,
			y: this.y - other.y,
		}
		return new Vector2(newPosition)
	}
	multiply(other: coords<2>): number
	multiply(factor: number): coords<2>
	multiply(factor: number | coords<2>): number | coords<2>{
		if (typeof factor === 'number') {
			const newPosition = {
				x: this.x * factor,
				y: this.y * factor,
			}
			return new Vector2(newPosition);
		} else {
			return this.x * factor.x + this.y * factor.y;
		}
	}

	distance2(other: coords<2>): number{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return dx * dx + dy * dy;
	}
	distance(other: coords<2>): number{
		return Math.sqrt(this.distance2(other));
	}

	get length2(): number{
		return this.distance2(START_COORDS_2)
	}
	get length(): number{
		return this.distance(START_COORDS_2)
	}

	get normalized(): coords<2>{
		const newPosition = {
			x: this.x / this.length,
			y: this.y / this.length,
		}
		return new Vector2(newPosition)
	}

	get vertical(): coords<2>{
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

	static from(target: coords<2> | string): coords<2>{
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