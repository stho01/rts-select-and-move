import { Vector2D } from './vector2d';
import { Config } from './config';
import { CircleCollision } from './collisionbox';
import { Point } from './point';
import { Unit } from './unit';

export class Player {
    //********************************************
    //** attributes:
    //********************************************
    
    private readonly _units : Unit[] = [];
    private _selectedUnits  : Unit[] = [];
    
    //********************************************
    //** ctor:
    //********************************************
    
    constructor() {

    }
    
    //********************************************
    //** getters:
    //********************************************
    
    get units(): Unit[] { return this._units; }
    get selectedUnits(): Unit[] { return this._selectedUnits; }

    //********************************************
    //** public:
    //********************************************

    /**
     * 
     */
    init(): void {
        for (let i = 0; i < 5; i++) {
            let unit: Unit = new Unit();
            unit.setPosition((i * 150) + 50, 100);
            unit.collider.add(new CircleCollision(unit.size/2));
            this.addUnit(unit);
        }
        console.log(this._units.map(u => u.position));
    }

    /**
     * 
     */
    addUnit(unit: Unit): void {
        if(unit != null) {
            this._units.push(unit);
        }
    }

    /**
     * Select all units that is under the point given. 
     * 
     * @param {Point} point     - the point to check units against
     * @param {boolean} combine - combine selection with current selection
     */
    select(point: Point, combine: boolean = false) {
        let selected:Unit[] = [];

        if (combine && Array.isArray(this._selectedUnits)) {
            selected.concat(this._selectedUnits);
        }
        
        this._units.forEach(u => {
            if (u.collider.checkCollision(point, u.position)) {
                selected.push(u);
            }
        })

        this._selectedUnits = selected;
        console.log(this._selectedUnits);
    }


    /**
     * 
     * @param to 
     */
    moveUnits(x: number, y: number): void {
        this._selectedUnits.forEach(u => u.moveTo(x, y));
    }
}