import { IUpdateable } from './update';
import { Collider } from './collider';
import { ICollisionBox, CircleCollision } from './collisionbox';
import { Config } from './config';
import { GameObject } from './gameobject';
import { Vector2D } from './vector2d';
import { Game } from './game';

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
    private _targetDestination: Vector2D = null;
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
    get targetDestination(): Vector2D { return this._targetDestination; }
    get speed(): number { return Config.UnitSpeed; }
    get size(): number { return Config.UnitSize; }
    
    //********************************************
    //** public:
    //********************************************
    
    /**
     * 
     * @param to 
     */
    moveTo(x: number, y: number): void {
        this._targetDestination = new Vector2D(x, y);
        this._state = UnitState.MOVING; 
    }

    /**
     * 
     * @param dt 
     */
    update(dt: number): void {
        if (this._targetDestination != null) {
            this._direction = this._targetDestination.subtract(this._position).normalize();
        }

        if (this._direction != null && !this._direction.isZero) {
            let delta = this.speed * (dt / 1000);
            let nextPosition: Vector2D = this._position.add(this._direction.multiply(delta));            
            this._position = nextPosition;
        }

        if (this._reachedTarget()) {
             this._direction = Vector2D.Zero;
             this._targetDestination = null;
             this._state = UnitState.IDLE;
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
            reachedX = this._position.x > this._targetDestination.x;
        } else if (this._direction.x < 0) {
            reachedX = this._position.x < this._targetDestination.x;
        }
        
        let reachedY: boolean = true;
        if (this._direction.y > 0) {
            reachedY = this._position.y > this._targetDestination.y;
        } else if (this._direction.y < 0) {
            reachedY = this._position.y < this._targetDestination.y;
        }
        
        return reachedX && reachedY;
    }
}