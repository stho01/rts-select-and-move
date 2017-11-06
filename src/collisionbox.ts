import { Vector2D } from './vector2d';
import { ICollisionBox } from './collisionbox';
import { Point } from './point';

/**
 * A collision box 
 */
export interface ICollisionBox {
    /**
     * Checks if point is inside collision box bounds.
     * 
     * @param {Point} point
     */
    inside(point: Point, position: Vector2D): boolean;
}

/**
 * 
 */
export class CircleCollision implements ICollisionBox {
    private readonly _r: number;
    
    /**
     * 
     */
    constructor(radius: number) {
        this._r = radius;
    }

    inside(point: Point, position: Vector2D): boolean {
        let direction: Vector2D = position.subtract(new Vector2D(point.x, point.y));
        
        return direction.lenght() <= this._r;
    }
}