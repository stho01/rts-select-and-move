import { Vector2D } from './vector2d';
import { Point } from './point';
import { ICollisionBox } from './collisionbox';

export class Collider {
    private readonly _collisionBoxes: ICollisionBox[] = [];

    add(box: ICollisionBox): void {
        if(box  != null) {
            this._collisionBoxes.push(box);
        }
    }

    checkCollision(point: Point, position: Vector2D): boolean {
        for (let i = 0; i < this._collisionBoxes.length; i++) {
            if (this._collisionBoxes[i].inside(point, position)) {
                return true;
            }
        }

        return false;
    }
}