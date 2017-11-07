import { IUpdateable } from './update';
import { MouseButtonType, InputManager } from './inputmanger';
import { Player } from './player';
import { RenderingUtils } from './renderingutils';
import { Config } from './config';
import { Unit, UnitState } from './unit';

export class Game {
    
    public static readonly Instance: Game = new Game();

    //********************************************
    //** attributes:
    //********************************************
    
    private _canvas             : HTMLCanvasElement;
    private _ctx                : CanvasRenderingContext2D;
    private _viewPort           : {width: number, height: number};
    private _previousFrameTime  : number = 0;
    private _rendrer            : RenderingUtils;
    public readonly updateables : Set<IUpdateable> = new Set<IUpdateable>();
    private readonly _player    : Player = new Player();
    
    /**
     * 
     */
    private constructor() {
        this._updateViewPort();
    }

    //********************************************
    //** public:
    //********************************************

    /**
     * 
     */
    init(): Game {
        this._initCanvas();
        this._player.init();
        window.oncontextmenu = this._onContextMenuClickHandler.bind(this);
        this._canvas.addEventListener("mousedown", this._onClickEventHandler.bind(this));

        return this;
    }
    
    /**
     * 
     */
    run(): void {
        console.log("game is running..123"); 
        this._update(0);
    }

    //********************************************
    //** private:
    //********************************************

    /**
     * Initializes the canvas. 
     */
    private _initCanvas(): void {
        this._canvas = document.getElementById("c") as HTMLCanvasElement;
        this._canvas.width = this._viewPort.width;
        this._canvas.height = this._viewPort.height;
        this._ctx = this._canvas.getContext("2d");
        this._rendrer = new RenderingUtils(this._ctx);
    }
    
    /**
     * Updates the view port.
     */
    private _updateViewPort(): void {
        
        this._viewPort = {
            width:   Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 200,
            height:  Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        }
    }

    /**
     * 
     * @param dt 
     */
    private _update(now: number): void {
        let dt: number = now - this._previousFrameTime;
        this._previousFrameTime = now;

        this._updateViewPort();
        
        this._canvas.width = this._viewPort.width;
        this._canvas.height = this._viewPort.height;

        this.updateables.forEach(u => u.update(dt));

        this._render();
        requestAnimationFrame(this._update.bind(this));

        InputManager.Instance.update();
    }

    /**
     * Render
     */
    private _render(): void {
        // clear the screen/canvas. 
        this._ctx.fillStyle = "#7ea6bb"
        this._ctx.fillRect(0,0,this._viewPort.width, this._viewPort.height);

        // render units.
        this._player.units.forEach(u => this._rendrer.renderUnit(u.position));

        this._player.units.filter(u => u.state === UnitState.MOVING && u.targetDestination != null)
                          .forEach(u =>  this._rendrer.renderLine(u.position, u.targetDestination));

        this._player.selectedUnits.forEach(u => this._rendrer.renderSelectedUnit(u.position));
    }

    //********************************************
    //** event handlers
    //********************************************

    private _onClickEventHandler(event: MouseEvent): void {
        if(event.target === this._canvas) {
            event.stopImmediatePropagation();
            event.preventDefault();

            let bbox    : ClientRect = this._canvas.getBoundingClientRect(),
                canvasX : number     = event.clientX - bbox.left,
                canvasY : number     = event.clientY - bbox.top;

            if (event.buttons == MouseButtonType.Left) {
                this._player.select({
                    x: canvasX,
                    y: canvasY
                });
            } else if(event.buttons === MouseButtonType.Right) {
                this._player.moveUnits(canvasX, canvasY);
            }
        }
    }

    /**
     * 
     * @param event 
     */
    private _onContextMenuClickHandler(event: Event): boolean {
        return (event.target !== this._canvas);
    }
}