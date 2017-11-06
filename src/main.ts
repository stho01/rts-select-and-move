import { ControlPanel } from './controlpanel';
import { Game } from './game';

// no context menu in this application
// window.oncontextmenu = () => {
//     return false;
// };

ControlPanel.init();
Game.Instance.init().run(); 
 