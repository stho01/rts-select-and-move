import { Config } from './config';

import { Vector2D } from './vector2d';
export class RenderingUtils {

    private readonly _ctx: CanvasRenderingContext2D;

    /**
     *
     */
    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    renderUnit(pos: Vector2D) {
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

    renderSelectedUnit(pos: Vector2D) {
        this._ctx.strokeStyle = "green";
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

    renderLine(vec1: Vector2D, vec2: Vector2D, color: string = "#FF0000") {
        this._ctx.fillStyle = color;
        this._ctx.strokeStyle = color;
        this._ctx.beginPath();
        this._ctx.moveTo(vec1.x, vec1.y);
        this._ctx.lineTo(vec2.x, vec2.y);
        this._ctx.stroke();
    }
}