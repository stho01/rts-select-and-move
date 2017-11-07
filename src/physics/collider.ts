import { Transform } from './../components/transform';
import { Vector2D } from '../math/vector2d';
import { Point } from '../math/point';
import { ICollisionBox } from './collisionbox';

export class Collider {
    private readonly _collisionBoxes: ICollisionBox[] = [];
    
    /**
     *
     */
    constructor() {
    }

    add(box: ICollisionBox): void {
        if(box != null) {
            this._collisionBoxes.push(box);
        }
    }

    checkCollision(point: Point): boolean {
        for (let i = 0; i < this._collisionBoxes.length; i++) {
            if (this._collisionBoxes[i].intersects(point)) {
                return true;
            }
        }

        return false;
    }
}