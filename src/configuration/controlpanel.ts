import { Config } from './config';
import * as ko from "knockout";

// dirty. :)
class ViewModel {
    unitSpeed: KnockoutObservable<number> = ko.observable(Config.UnitSpeed);
    unitSize: KnockoutObservable<number> = ko.observable(Config.UnitSize);
    /**
     *
     */
    constructor() {
        this.unitSpeed.subscribe((newValue: number) => {
            if (!isNaN(newValue)) {
                Config.UnitSpeed = newValue;
            } 
        });

        this.unitSize.subscribe((newValue: number) => {
            if (!isNaN(newValue)) {
                Config.UnitSize = newValue;
            } 
        });
    }
}


export class ControlPanel {
    private static _controlPanelElement: HTMLElement;
    private static readonly model: ViewModel = new ViewModel();
    
    static init(): void {
        this._controlPanelElement = document.getElementById("controlpanel");

        ko.applyBindings(this.model, this._controlPanelElement);
    }
}