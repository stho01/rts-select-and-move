export enum MouseButtonType {
    Left = 1,
    Right = 2,
    Middle = 4
}

export enum KeyCodes  {
    Shift = 16,
    Cntr = 17,
}

export class InputManager {
    
    //********************************************
    //** attributes:
    //********************************************
    
    public static readonly Instance: InputManager = new InputManager();

    private _currentKeyMap          : {[key:number]: boolean} = {};
    private _previousKeyMap         : {[key:number]: boolean} = {};
    private _currentMouseBtnMap     : {[key:number]: boolean} = {};
    private _previousMouseBtnMap    : {[key:number]: boolean} = {};

    private InputManager() {}

    init(): void {
        window.addEventListener("mousedown", this._onMouseDownEventHandler.bind(this));
        window.addEventListener("keydown", this._onKeyDownEventHandler.bind(this));
    }

    update(): void {
        this._previousKeyMap = this._currentKeyMap;
        this._currentKeyMap = {};
    }


    isKeyDown(keyCode: number|KeyCodes) {
        return (this._currentKeyMap[keyCode]);
    }

    
    private _onMouseDownEventHandler(event: MouseEvent): void {
        console.log(event.buttons);
        this._currentMouseBtnMap[event.buttons] = true;
    }

    private _onKeyDownEventHandler(event: KeyboardEvent): void {
        console.log(event.keyCode);
        this._currentKeyMap[event.keyCode] = true;
    }
}