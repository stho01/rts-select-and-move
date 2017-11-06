import { Vector2D } from './vector2d';

export class GameObject {
    protected _position: Vector2D = new Vector2D();

    get position(): Vector2D { return this._position; }

    setPosition(x: number, y: number): void {
        this._position = new Vector2D(x, y);
    }
}