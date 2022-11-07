import {Vector2, Vector3} from "./math/Vector";

const a = new Vector3({x: 0, y: 1, z: 0});
const b = new Vector3({x: 1, y: 0, z: 0});

console.log(b.cross(a));