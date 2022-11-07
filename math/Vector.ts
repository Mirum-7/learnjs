export {coords2, coords3, Vector2, Vector3, START_COORDS}

interface coords2{
	x: number,
	y: number,
	[index: string]: any
}

interface coords3 extends coords2{
	z: number,
}

const START_COORDS = {
	x: 0,
	y: 0,
	z: 0,
}

class Vector2{
	public x: number;
	public y: number;
	constructor({x, y}: coords2 = START_COORDS) {
		this.x = x;
		this.y = y;
	}

	add(other: coords2): Vector2{
		const newPosition = {
			x: this.x + other.x,
			y: this.y + other.y,
		}
		return new Vector2(newPosition)
	}
	subtract(other: coords2): Vector2{
		const newPosition = {
			x: this.x - other.x,
			y: this.y - other.y,
		}
		return new Vector2(newPosition)
	}
	multiply(other: coords2): number
	multiply(factor: number): Vector2
	multiply(factor: number | coords2): number | Vector2{
		if (typeof factor === 'number') {
			const newPosition = {
				x: this.x * factor,
				y: this.y * factor,
			}
			return new Vector2(newPosition);
		}
		return this.x * factor.x + this.y * factor.y;
	}

	distance2(other: coords2): number{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return dx * dx + dy * dy;
	}
	distance(other: coords2): number{
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
	private toJSON(): object{
		return {'x': this.x, 'y':this.y}
	}

	static from(target: coords2 | string): Vector2{
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

class Vector3{
	public x: number;
	public y: number;
	public z: number;
	constructor({x, y, z}: coords3 = START_COORDS) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(other: coords3): Vector3{
		const newPosition = {
			x: this.x + other.x,
			y: this.y + other.y,
			z: this.z + other.z,
		}
		return new Vector3(newPosition)
	}
	subtract(other: coords3): Vector3{
		const newPosition = {
			x: this.x - other.x,
			y: this.y - other.y,
			z: this.z - other.z,
		}
		return new Vector3(newPosition)
	}
	multiply(other: coords3): number
	multiply(factor: number): Vector3
	multiply(factor: number | coords3): number | Vector3{
		if (typeof factor === 'number') {
			const newPosition = {
				x: this.x * factor,
				y: this.y * factor,
				z: this.z * factor,
			}
			return new Vector3(newPosition);
		}
		return this.x * factor.x + this.y * factor.y + this.z * factor.z;
	}

	distance2(other: coords3): number{
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		const dz = this.z - other.z;
		return dx * dx + dy * dy + dz * dz;
	}
	distance(other: coords3): number{
		return Math.sqrt(this.distance2(other));
	}

	get length2(): number{
		return this.distance2(START_COORDS)
	}
	get length(): number{
		return this.distance(START_COORDS)
	}

	get normalized(): Vector3{
		const newPosition = {
			x: this.x / this.length,
			y: this.y / this.length,
			z: this.z / this.length,
		}
		return new Vector3(newPosition)
	}

	cross(other: coords3): Vector3{
		const newPosition = {
			x: this.y * other.z - this.z * other.y,
			y: this.z * other.x - this.x * other.z,
			z: this.x * other.y - this.y * other.x,
		}
		return new Vector3(newPosition);
	}

	get JSON(): string{
		return JSON.stringify(this);
	}

	toString(): string{
		return `(${this.x}, ${this.y}, ${this.z})`;
	}
	valueOf(): number{
		return this.length;
	}
	private toJSON(): object{
		return {'x': this.x, 'y':this.y, 'z':this.z}
	}

	static from(target: coords3 | string): Vector3{
		if (typeof target === 'string') {
			const object = JSON.parse(target);
			return new Vector3({
				x: object.x,
				y: object.y,
				z: object.z,
			})
		}
		return new Vector3({
			x: target.x,
			y: target.y,
			z: target.z,
		})
	}
}