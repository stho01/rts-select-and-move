import { Point } from './../math/point';
import { Config } from '../configuration/config';
import { Vector2D } from '../math/vector2d';

/**
 * A really simple rendering class just for testing purposes. 
 */
export class RenderingUtils {

    private readonly _ctx: CanvasRenderingContext2D;

    /**
     *
     */
    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    renderUnit(pos: Vector2D): void {
        this._ctx.fillStyle = "#222222";
        this._ctx.beginPath();
        let r: number = Config.UnitSize/2;
        this._ctx.arc(
            pos.x,
            pos.y,
            r,
            0,
            2*Math.PI);
        this._ctx.fill();
    }

    renderSelectedUnit(pos: Vector2D): void{
        this._ctx.strokeStyle = "rgba(85, 255, 15, 1)";
        this._ctx.beginPath();

        let r: number = Config.UnitSize/2;
        this._ctx.arc(
            pos.x,
            pos.y,
            r,
            0,
            2*Math.PI);
        this._ctx.lineWidth = 5;
        this._ctx.stroke();
    }

    renderSelectionBox(start: Point, end: Point): void {
        let x1      : number = Math.max(start.x, end.x),
            y1      : number = Math.max(start.y, end.y),
            x2      : number = Math.min(start.x, end.x),
            y2      : number = Math.min(start.y, end.y),
            width   : number = x2 - x1,
            height  : number = y2 - y1;

        this._ctx.strokeStyle = "rgba(85, 255, 15, 0.75)";
        this._ctx.fillStyle = "rgba(85, 255, 15, 0.3)";
        this._ctx.lineWidth = 1;
        this._ctx.beginPath();
        this._ctx.rect(x1, y1, width, height);
        this._ctx.fill();
        this._ctx.stroke();
    }

    renderLine(vec1: Vector2D, vec2: Vector2D, color: string = "#FF0000"): void {
        this._ctx.fillStyle = color;
        this._ctx.strokeStyle = color;
        this._ctx.lineWidth = 1;
        this._ctx.beginPath();
        this._ctx.moveTo(vec1.x, vec1.y);
        this._ctx.lineTo(vec2.x, vec2.y);
        this._ctx.stroke();
    }
}