import { initSimpleUI } from './ui/simple.js';
import { initTerminal, switchToTerminal, switchToSimple, exec, setTheme } from './ui/terminal.js';

// Expose functions to global scope for HTML onclick handlers
window.switchToTerminal = switchToTerminal;
window.switchToSimple = switchToSimple;
window.exec = exec;
window.setTheme = setTheme;

// Initialize
window.onload = () => {
    initSimpleUI();
    initTerminal();
};
