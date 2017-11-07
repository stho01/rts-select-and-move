import { ControlPanel } from './controlpanel';
import { Game } from './game';
import { InputManager } from './inputmanger';

// no context menu in this application
// window.oncontextmenu = () => {
//     return false;
// };

InputManager.Instance.init();
ControlPanel.init();
Game.Instance.init().run(); 
