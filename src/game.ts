import { Point } from './math/point';
import { MouseButtonCode } from './input/mousebuttoncode';
import { IUpdateable } from './abstract/update';
import { InputManager } from './input/inputmanger';
import { Player } from './player';
import { RenderingUtils } from './rendering/renderingutils';
import { Config } from './configuration/config';
import { Unit, UnitState } from './gameobjects/unit';
import { KeyCode } from './input/keycode';

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
    private _mouseStart: Point;
    

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
        return this;
    }
    
    /**
     * 
     */
    run(): void {
        console.log("game is running..."); 
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
        
        if (InputManager.Instance.isMouseButtonPressed(MouseButtonCode.Left)) {
            // track mouse start for later when the button is released.
            this._mouseStart = InputManager.Instance.getMousePosition(this._canvas);

        } else if (InputManager.Instance.isMouseButtonPressed(MouseButtonCode.Right)) {
            // move units to clicked position.
            this._player.moveUnits(InputManager.Instance.getMousePosition(this._canvas));
        }

        if (this._mouseStart != null && InputManager.Instance.isMouseButtonReleased(MouseButtonCode.Left)) {

            this._player.select(
                this._mouseStart, 
                InputManager.Instance.getMousePosition(this._canvas), 
                InputManager.Instance.isKeyDown(KeyCode.Shift));

            this._mouseStart = null;
        }

        this._updateViewPort();
        
        this._canvas.width = this._viewPort.width;
        this._canvas.height = this._viewPort.height;

        this.updateables.forEach(u => u.update(dt));

        this._render();
        InputManager.Instance.update();
        requestAnimationFrame(this._update.bind(this));
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
        this._player.selectedUnits.forEach(u => this._rendrer.renderSelectedUnit(u.position));

        this._player.units.filter(u => u.state === UnitState.MOVING && u.targetDestination != null)
                          .forEach(u =>  this._rendrer.renderLine(u.position, u.targetDestination));


        if(this._mouseStart != null) {
            this._rendrer.renderSelectionBox(this._mouseStart, InputManager.Instance.getMousePosition(this._canvas));
        }
    }

    //********************************************
    //** event handlers
    //********************************************

    /**
     * 
     * @param event 
     */
    private _onContextMenuClickHandler(event: Event): boolean {
        return (event.target !== this._canvas);
    }
}