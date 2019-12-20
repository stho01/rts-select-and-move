import { IUpdateable } from '../abstract/update';
import { Collider } from '../physics/collider';
import { ICollisionBox, CircleCollision } from '../physics/collisionbox';
import { Config } from '../configuration/config';
import { GameObject } from './gameobject';
import { Vector2D } from '../math/vector2d';
import { Game } from '../game';

export enum UnitState {
    IDLE = 1,
    MOVING = 2
}

export class Unit extends GameObject implements IUpdateable {

    //********************************************
    //** attributes:
    //********************************************
    
    public readonly collider: Collider = new Collider();
    private _direction: Vector2D = new Vector2D();
    private _targetDestinationsQueue: Vector2D[] = [];
    private _state: UnitState = UnitState.IDLE;
    
    //********************************************
    //** ctor
    //********************************************

    /**
     *
     */
    constructor() {
        super();
        Game.Instance.updateables.add(this);
    }
    
    //********************************************
    //** getters:
    //********************************************
    
    /**
     * 
     */
    get direction(): Vector2D { return this._direction; }
    get state(): UnitState { return this._state; }
    get targetDestinations(): Vector2D[] { return this._targetDestinationsQueue; }
    get speed(): number { return Config.UnitSpeed; }
    get size(): number { return Config.UnitSize; }
    get targetDestination(): Vector2D { return this._targetDestinationsQueue[this._targetDestinationsQueue.length-1]; }
    
    //********************************************
    //** public:
    //********************************************
    
    /**
     * 
     * @param to 
     */
    moveTo(x: number, y: number): void {
        this._targetDestinationsQueue = [new Vector2D(x, y)];
        this._state = UnitState.MOVING; 
    }


    pushMoveTo(x: number, y: number): void {
        this._targetDestinationsQueue.unshift(new Vector2D(x, y));
        this._state = UnitState.MOVING;
    }

    /**
     * 
     * @param dt 
     */
    update(dt: number): void {
        if (this.targetDestinations.length == 0) {
            return;
        }

        if (this._targetDestinationsQueue != null && this.targetDestination) {
            this._direction = this.targetDestination.subtract(this.position).normalize();
        }

        if (this._direction != null && !this._direction.isZero) {
            let delta = this.speed * (dt / 1000);
            let nextPosition: Vector2D = this.position.add(this._direction.multiply(delta));            
            
            this._transform.position = nextPosition;
        }

        if (this._reachedTarget() && !this._direction.isZero) {
            this._targetDestinationsQueue.pop();
            this._direction = Vector2D.Zero;
            this._state = this._targetDestinationsQueue.length > 0 ? UnitState.MOVING : UnitState.IDLE;
        }
    }

    dispose(): void {
        Game.Instance.updateables.delete(this);
    }

    //********************************************
    //** private:
    //********************************************

    private _reachedTarget(): boolean {
        // we asume that unit has reached target if 
        // direction is zero. 
        if (this._direction.isZero) {
            return true;
        }

        let reachedX: boolean = true;
        if (this._direction.x > 0) {
            reachedX = this.position.x > this.targetDestination.x;
        } else if (this._direction.x < 0) {
            reachedX = this.position.x < this.targetDestination.x;
        }
        
        let reachedY: boolean = true;
        if (this._direction.y > 0) {
            reachedY = this.position.y > this.targetDestination.y;
        } else if (this._direction.y < 0) {
            reachedY = this.position.y < this.targetDestination.y;
        }
        
        return reachedX && reachedY;
    }
}
