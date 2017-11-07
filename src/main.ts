import { ControlPanel } from './configuration/controlpanel';
import { Game } from './game';
import { InputManager } from './input/inputmanger';

InputManager.Instance.init();
ControlPanel.init();
Game.Instance.init().run(); 
