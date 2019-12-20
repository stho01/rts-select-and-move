import { Point } from './math/point';
import { CircleCollision, BoxCollision } from './physics/collisionbox';
import { Unit } from './gameobjects/unit';

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
            unit.collider.add(new CircleCollision(unit.transform, unit.size/2));
            this.addUnit(unit);
        }
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
    select(start: Point, end: Point, combine: boolean = false) {
        let selected:Unit[] = [];

        if (combine && Array.isArray(this._selectedUnits)) {
            selected = selected.concat(this._selectedUnits);
        }
        
        let boxCollision = new BoxCollision(start, end);
        this._units.forEach(u => {
            if (u.collider.checkCollision(start) 
            || u.collider.checkCollision(end) 
            || boxCollision.intersects({x: u.position.x, y: u.position.y })) {
                selected.push(u);
            }
        });

        this._selectedUnits = selected;
    }


    /**
     * 
     * @param to 
     */
    moveUnits(point: Point): void {
        this._selectedUnits.forEach(u => u.moveTo(point.x, point.y));
    }

    /**
     *
     * @param point
     */
    queueMove(point: Point): void {
        this._selectedUnits.forEach(u => u.pushMoveTo(point.x, point.y));
    }
}
