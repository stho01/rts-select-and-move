import { Transform } from './../components/transform';
import { Vector2D } from '../math/vector2d';

export class GameObject {
    protected readonly _transform: Transform = new Transform();
    
    get transform(): Transform { return this._transform; }
    get position(): Vector2D { return this._transform.position; }

    setPosition(x: number, y: number): void {
        this._transform.position = new Vector2D(x, y);
    }
}