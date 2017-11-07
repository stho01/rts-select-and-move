import { Transform } from './../components/transform';
import { ICollisionBox } from './collisionbox';
import { Vector2D } from '../math/vector2d';
import { Point } from '../math/point';

/**
 * A collision box 
 */
export interface ICollisionBox {
    /**
     * Checks if point is inside collision box bounds.
     * 
     * @param {Point} point
     */
    intersects(point: Point): boolean;
}

/**
 * 
 */
export class CircleCollision implements ICollisionBox {
    
    private readonly _transform: Transform;
    private readonly _r: number;
    
    /**
     * 
     */
    constructor(transform: Transform, radius: number) {
        this._transform = transform;
        this._r = radius;
    }

    intersects(point: Point): boolean {
        let direction: Vector2D = this._transform.position.subtract(new Vector2D(point.x, point.y));
        
        return direction.lenght() <= this._r;
    }
}

/**
 * Basic box collision.
 */
export class BoxCollision implements ICollisionBox {

    private _x1: number;
    private _y1: number;
    private _x2: number;
    private _y2: number;

    /**
     *
     */
    constructor(p1: Point, p2: Point) {
        this._x1 = Math.max(p1.x, p2.x),
        this._y1 = Math.max(p1.y, p2.y),
        this._x2 = Math.min(p1.x, p2.x),
        this._y2 = Math.min(p1.y, p2.y);
    }

    intersects(point: Point): boolean {
        return (point.x < this._x1 && point.x > this._x2) 
            && (point.y < this._y1 && point.y > this._y2);
    }
}