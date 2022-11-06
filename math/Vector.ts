export {coords, Vector2, START_COORDS}

type coords<T extends 2 | 3> = T extends 2 ? {
	x: number,
	y: number,
	[index: string]: any
} : {
	x: number,
	y: number,
	z: number,
	[index: string]: any
}

const START_COORDS = {
	x: 0,
	y: 0,
	z: 0,
}

class Vector2{
	public x: number;
	public y: number;
	constructor({x, y}: coords<2> = START_COORDS) {
		this.x = x;
		this.y = y;
	}

	add(other: coords<2>): Vector2{
		const newPosition = {
			x: this.x + other.x,
			y: this.y + other.y,
		}
		return new Vector2(newPosition)
	}
	subtract(other: coords<2>): Vector2{
		const newPosition = {
			x: this.x - other.x,
			y: this.y - other.y,
		}
		return new Vector2(newPosition)
	}
	multiply(other: coords<2>): number
	multiply(factor: number): Vector2
	multiply(factor: number | coords<2>): number | Vector2{
		if (typeof factor === 'number') {
			const newPosition = {
				x: this.x * factor,
				y: this.y * factor,
			}
			return new Vector2(newPosition);
		}
		return this.x * factor.x + this.y * factor.y;
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
		return this.distance2(START_COORDS)
	}
	get length(): number{
		return this.distance(START_COORDS)
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

	static from(target: coords<2> | string): Vector2{
		if (typeof target === 'string') {
			const object = JSON.parse(target);
			return new Vector2({
				x: object.x,
				y: object.y,
			})
		}
		return new Vector2({
			x: target.x,
			y: target.y,
		})
	}
}