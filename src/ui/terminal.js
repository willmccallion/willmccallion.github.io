import { fileSystem } from '../data/filesystem.js';
import { config } from '../config.js';

// State
let currentPath = "~";
let commandHistory = [];
let historyIndex = -1;
let isBooting = false;
let hasBootedOnce = false;
let inVim = false;

// DOM Elements
const els = {
    simple: document.getElementById('simple-ui'),
    terminal: document.getElementById('terminal-ui'),
    scanlines: document.querySelector('.scanlines'),
    display: document.getElementById('display-area'),
    inputContainer: document.getElementById('input-container'),
    realInput: document.getElementById('real-input'),
    visualInput: document.getElementById('visual-input'),
    ghostInput: document.getElementById('ghost-input'),
    path: document.getElementById('path'),
    clock: document.getElementById('clock'),
    screen: document.getElementById('screen'),
    themeMenu: document.getElementById('theme-menu'),
    panicOverlay: document.getElementById('panic-overlay'),
    vim: document.getElementById('vim-overlay'),
    vimContent: document.getElementById('vim-content'),
    vimMessage: document.getElementById('vim-message')
};

// Audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTypingSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
        return;
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
}

// Manuals & Pages
const manuals = {
    "ls": "List directory contents.",
    "cat": "Concatenate files and print on the standard output.",
    "man": "Format and display the on-line manual pages.",
    "whoami": "Print effective userid.",
    "date": "Print or set the system date and time.",
    "echo": "Display a line of text.",
    "sudo": "Execute a command as another user.",
    "history": "Display the history list.",
    "exit": "Exit the shell.",
    "clear": "Clear the terminal screen.",
    "vim": "Vi IMproved, a programmer's text editor."
};

const pages = {
    'home': `
<span class="highlight" style="font-size: 10px; line-height: 10px;">
 __      __.__.__  .__   
/  \\    /  \\__|  | |  |  
\\   \\/\\/   /  |  | |  |  
 \\        /|  |  |_|  |__
  \\__/\\__/ |__|____/____/
</span>
<span class="bold secondary">SYSTEM v${config.version} :: WELCOME VISITOR</span>
=======================================

I am a <span class="bold primary">Honors Computer Science Student</span> interested in chess,
Emulation, compilers, and Computer Architecture.

<span class="dim">AVAILABLE COMMANDS:</span>
  > <span class="cmd-link" onclick="exec('ls projects')">projects</span>   ::  View engineering portfolio
  > <span class="cmd-link" onclick="exec('about')">about</span>      ::  Background & Education
  > <span class="cmd-link" onclick="exec('contact')">contact</span>    ::  Connect via Email/Socials
  > <span class="cmd-link" onclick="exec('ls')">ls</span>         ::  List files
  > <span class="cmd-link" onclick="exec('help')">help</span>       ::  List all commands
  > <span class="cmd-link" onclick="switchToSimple()">exit</span>       ::  Return to Simple View
`,
    'about': `
<span class="secondary bold">>> USER_PROFILE</span>
==================
<span class="dim">NAME:</span>     Will McCallion
<span class="dim">SCHOOL:</span>   University of Alberta (Class of 2027)
<span class="dim">FOCUS:</span>    Low-level Systems, Rust, C.

<span class="dim">Type <span class="cmd-link" onclick="exec('ls projects')">ls projects</span> to see my work.</span>
`,
    'contact': `
<span class="highlight">Email:</span> <a href="mailto:${config.email}">${config.email}</a>
<span class="highlight">GitHub:</span> <a href="https://github.com/${config.github}" target="_blank">github.com/${config.github}</a>
`
};

// Core Functions
export function initTerminal() {
    setupEventListeners();
    startClock();
    
    // Check theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
}

export function switchToTerminal() {
    els.simple.style.display = 'none';
    els.terminal.style.display = 'flex';
    els.scanlines.style.display = 'block';
    
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    if(!hasBootedOnce) {
        runBoot();
        hasBootedOnce = true;
    } else {
        els.realInput.focus();
    }
}

export function switchToSimple() {
    els.terminal.style.display = 'none';
    els.scanlines.style.display = 'none';
    els.simple.style.display = 'block';

    els.realInput.value = '';
    els.visualInput.textContent = '';
    els.ghostInput.textContent = '';
}

export function exec(cmd) {
    if (isBooting) return;
    
    const rawCmd = cmd.trim();
    const cleanCmd = rawCmd.toLowerCase();
    const parts = cleanCmd.split(/\s+/);
    const baseCmd = parts[0];
    const arg = parts[1];

    const scrollBottom = () => els.screen.scrollTop = els.screen.scrollHeight;

    if (cleanCmd === "sudo rm -rf /") {
        triggerPanic();
        return;
    }

    let output = "";
    els.display.innerHTML = '';

    // 1. Check Static Pages
    if (pages[baseCmd]) {
        output = pages[baseCmd];
    }
    
    // 2. Check LS
    else if (baseCmd === 'ls' || baseCmd === 'dir') {
        let targetDir = fileSystem["~"]; // Default to root
        let isProject = false;
        
        // Determine directory
        if (arg === 'projects') {
            targetDir = fileSystem["~/projects"];
            isProject = true;
        } else if (currentPath === "~/projects") {
            targetDir = fileSystem["~/projects"];
            isProject = true;
        }

        // Build output
        let rows = [];
        let maxNameLen = 0;
        for (const file of Object.values(targetDir)) {
            let name = file.name;
            if (file.type === 'exec') name += '*';
            if (name.length > maxNameLen) maxNameLen = name.length;
        }
        maxNameLen += 2;

        for (const [key, file] of Object.entries(targetDir)) {
            let nameHtml = '';
            let rawName = file.name;
            
            if (file.type === 'dir') {
                if (file.action) {
                    nameHtml = `<span class="ls-dir" style="cursor:pointer" onclick="${file.action}">${file.name}</span>`;
                } else {
                    nameHtml = `<span class="ls-dir">${file.name}</span>`;
                }
            } else if (file.type === 'exec') {
                rawName += '*';
                nameHtml = `<span class="ls-exec" onclick="${file.action}">${file.name}*</span>`;
            } else if (file.type === 'link') {
                nameHtml = `<a href="${file.url}" target="_blank" class="ls-link">${file.name}</a>`;
            } else {
                nameHtml = `<span class="ls-file">${file.name}</span>`;
            }
            
            const padding = "&nbsp;".repeat(Math.max(0, maxNameLen - rawName.length));
            const perm = `<span class="ls-perm">${file.perm}</span>`;
            const size = `<span class="ls-meta">${file.size}</span>`;
            const date = `<span class="ls-meta">${file.date}</span>`;
            
            rows.push(`${nameHtml}${padding}  ${perm}  ${size.padEnd(6)}  ${date}`);
        }
        
        output = `<div style="display:flex; flex-direction:column;">${rows.map(r => `<span class="ls-row">${r}</span>`).join('')}</div>`;
        
        if (isProject) {
             output = `<span class="secondary bold">>> PROJECTS_DIRECTORY</span><br>` + output;
        }
    }

    // 3. Shortcuts
    else if (baseCmd === 'projects') {
        exec('ls projects');
        return;
    }

    // 4. CAT
    else if (baseCmd === 'cat') {
        if (!arg) {
            output = `<span class="alert">Usage: cat [filename]</span>`;
        } else {
            // Check if user typed 'projects/something'
            if (arg.startsWith('projects/')) {
                const projName = arg.split('/')[1];
                const projDir = fileSystem["~/projects"];
                if (projDir[projName]) {
                    output = projDir[projName].content;
                } else {
                    output = `<span class="alert">cat: ${arg}: No such file</span>`;
                }
            }
            else {
                // Check current directory
                const currentDir = (currentPath === '~/projects') ? fileSystem["~/projects"] : fileSystem["~"];
                
                if (currentDir[arg]) {
                    if (currentDir[arg].type === 'file' || currentDir[arg].type === 'link') {
                        output = currentDir[arg].content;
                    } else if (currentDir[arg].type === 'dir') {
                        output = `<span class="alert">cat: ${arg}: Is a directory</span>`;
                    } else {
                        output = `<span class="alert">Binary file ${arg} matches.</span>`;
                    }
                } else {
                     // Fallback: check if they are in root but typed a project name directly
                     if (currentPath === '~' && fileSystem["~/projects"][arg]) {
                         output = fileSystem["~/projects"][arg].content;
                     } else {
                         output = `<span class="alert">cat: ${arg}: No such file or directory</span>`;
                     }
                }
            }
        }
    }

    // 5. Other Utils
    else if (baseCmd === 'man') {
        if (!arg) output = `<span class="alert">What manual page do you want?</span>`;
        else if (manuals[arg]) output = `<span class="bold">NAME</span><br>    ${arg} - ${manuals[arg]}`;
        else output = `<span class="alert">No manual entry for ${arg}</span>`;
    }
    else if (baseCmd === 'vim' || baseCmd === 'vi') {
        startVim();
        return; 
    }
    else if (baseCmd === 'whoami') output = "visitor";
    else if (baseCmd === 'date') output = new Date().toString();
    else if (baseCmd === 'echo') output = rawCmd.substring(5);
    else if (baseCmd === 'history') {
        output = commandHistory.map((c, i) => `<span class="dim">${i + 1}</span> ${c}`).join('<br>');
    }
    else if (baseCmd === 'sudo') {
        output = `<span class="alert">Permission denied:</span> User 'visitor' is not in the sudoers file. This incident will be reported.`;
    }
    else if (baseCmd === 'clear') {
        output = ''; 
    }
    else if (baseCmd === 'exit') {
        switchToSimple();
        return;
    }
    else if (baseCmd === 'help') {
        output = `<span class="dim">Available Commands:</span><br>
<span class="highlight">ls [projects]</span> <span class="dim">List files/projects</span>
<span class="highlight">cat [file]</span>    <span class="dim">Read file content</span>
<span class="highlight">man [cmd]</span>     <span class="dim">Manual pages</span>
<span class="highlight">vim</span>          <span class="dim">Text editor</span>
<span class="highlight">about, contact</span> <span class="dim">Info pages</span>
<span class="highlight">clear, exit</span>    <span class="dim">Term controls</span>`;
    } 
    else if (baseCmd === 'cd') {
        if (!arg || arg === '~') {
            currentPath = "~";
        } 
        else if (arg === 'projects' || arg === 'projects/') {
            currentPath = "~/projects";
        } 
        else if (arg === '..' && currentPath === "~/projects") {
            currentPath = "~";
        }
        else if (arg === '.') {
            // do nothing
        }
        else {
            output = `<span class="alert">cd: ${arg}: No such file or directory</span>`;
        }
        els.path.innerText = currentPath;
    }
    else if (cleanCmd !== '') {
        output = `<span class="alert">Command not found: ${cleanCmd}</span>`;
    }

    if (output) {
        const div = document.createElement('div');
        div.className = 'content-layer';
        div.innerHTML = output;
        els.display.appendChild(div);
    }

    els.realInput.value = '';
    els.visualInput.textContent = '';
    els.ghostInput.textContent = ''; 
    scrollBottom();
    els.realInput.focus();
}

// Internal Helpers
async function runBoot() {
    isBooting = true;
    els.inputContainer.style.display = 'none';
    els.display.innerHTML = '';
    
    const bootSteps = [
        "Starting version 251.4-1-arch",
        "/dev/nvme0n1p2: clean, 404/64003 files, 1234/5678 blocks",
        { msg: "Found device /dev/mapper/cryptroot.", delay: 150 },
        { msg: "Started Cryptography Setup for luks-00d3-4d2a-...", delay: 200 },
        { msg: "Reached target Local Encrypted Volumes.", delay: 50 },
        { msg: "Scanning for Btrfs filesystems...", delay: 100 },
        { msg: "Found Btrfs filesystem at /dev/mapper/cryptroot.", delay: 100 },
        { msg: "Started LUKS Decryption using TPM2.", delay: 300 },
        { msg: "Mounted /home (btrfs filesystem).", delay: 150 },
        { msg: "Reached target System Initialization.", delay: 50 },
        { msg: "Started Daily Man-db Regeneration.", delay: 200 },
        { msg: "Reached target Graphical Interface.", delay: 100 },
        { msg: "Startup finished in 540ms.", delay: 300 }
    ];

    for (let step of bootSteps) {
        if (typeof step === 'string') {
            els.display.innerHTML += `<div class="boot-line">${step}</div>`;
        } else {
            els.display.innerHTML += `<div class="boot-line"><span class="boot-bracket">[</span> <span class="boot-ok"> OK </span> <span class="boot-bracket">]</span> <span class="boot-text">${step.msg}</span></div>`;
        }
        els.screen.scrollTop = els.screen.scrollHeight;
        await new Promise(r => setTimeout(r, step.delay || 100));
    }

    await new Promise(r => setTimeout(r, 400));
    els.display.innerHTML = '';
    isBooting = false;
    els.inputContainer.style.display = 'flex';
    exec('home');
}

function startVim() {
    inVim = true;
    els.vim.style.display = 'flex';
    els.vimContent.value = "";
    els.vimContent.focus();
    els.vimMessage.textContent = '"vim_buffer.txt" [New File]';
}

function closeVim() {
    inVim = false;
    els.vim.style.display = 'none';
    els.vimContent.value = ""; 
    els.realInput.value = ""; 
    els.visualInput.textContent = ""; 
    els.realInput.focus();
    
    const div = document.createElement('div');
    div.className = 'content-layer';
    div.innerHTML = `<span class="dim">Vim session closed.</span>`;
    els.display.appendChild(div);
}

function triggerPanic() {
    els.panicOverlay.style.display = 'block';
    els.panicOverlay.innerHTML = `
<span class="bold">KERNEL PANIC: CRITICAL ERROR</span><br><br>
Instruction at 0x00007FF7423 referenced memory at 0xFFFFFFFF.<br>
System halting...
`;
    setTimeout(() => { location.reload(); }, 3000);
}

function startClock() {
    setInterval(() => {
        const now = new Date();
        els.clock.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }, 1000);
}

// Event Listeners
function setupEventListeners() {
    // Theme Menu
    document.getElementById('theme-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        els.themeMenu.classList.toggle('show');
    });
    
    document.addEventListener('click', () => {
        els.themeMenu.classList.remove('show');
    });

    // Screen Click
    els.terminal.addEventListener('click', () => {
        if (inVim) {
            els.vimContent.focus();
        } else {
            const selection = window.getSelection();
            if (selection.type !== 'Range') {
                els.realInput.focus();
            }
        }
    });

    // Vim Keys
    els.vimContent.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || (e.ctrlKey && e.key === 'c')) {
            e.preventDefault();
            els.vimMessage.textContent = 'Escape won\'t save you. Try :q';
            return;
        }

        if (e.key === 'Enter') {
            const lines = els.vimContent.value.split('\n');
            const lastLine = lines[lines.length - 1].trim();

            if (lastLine === ':q' || lastLine === ':q!' || lastLine === ':wq') {
                e.preventDefault();
                closeVim();
            } else if (lastLine.startsWith(':')) {
                els.vimMessage.textContent = `E492: Not an editor command: ${lastLine.substring(1)}`;
            }
        }
    });

    // Input Handling
    els.realInput.addEventListener('input', () => {
        const val = els.realInput.value;
        els.visualInput.textContent = val;

        if (val.length > (els.visualInput.dataset.len || 0)) {
             playTypingSound();
        }
        els.visualInput.dataset.len = val.length;

        // Autocomplete Ghost
        els.ghostInput.textContent = ''; 
        if (val.length > 0) {
            const parts = val.toLowerCase().split(' ');
            const cmd = parts[0];
            
            if (parts.length > 1) {
                const arg = parts[1];
                let options = [];
                
                // Context aware autocomplete
                if (cmd === 'ls' || cmd === 'cd') {
                    if (currentPath === '~' && 'projects'.startsWith(arg)) options.push('projects');
                    if (currentPath === '~/projects' && '..'.startsWith(arg)) options.push('..');
                } 

                if (cmd === 'cat') {
                    const targetDir = (currentPath === '~/projects') ? fileSystem["~/projects"] : fileSystem["~"];
                    const match = Object.keys(targetDir).find(k => {
                        return k.startsWith(arg) && k !== '.' && k !== '..' && targetDir[k].type !== 'dir';
                    });
                    if (match) options.push(match);
                }

                if (options.length > 0) {
                    const suggestion = options[0];
                    if (suggestion.length > arg.length) {
                        els.ghostInput.textContent = suggestion.slice(arg.length);
                    }
                }
            } else {
                const availableCmds = Object.keys(pages).concat(['ls','cat','cd','man','whoami','date','sudo','history','echo','clear','exit','help','vim']);
                const match = availableCmds.find(c => c.startsWith(cmd));
                if (match) {
                    els.ghostInput.textContent = match.slice(cmd.length);
                }
            }
        }
    });

    els.realInput.addEventListener('keydown', (e) => {
        // Tab Completion
        if (e.key === 'Tab' || (e.key === 'ArrowRight' && els.realInput.selectionStart === els.realInput.value.length)) {
            if (els.ghostInput.textContent !== '') {
                e.preventDefault();
                els.realInput.value += els.ghostInput.textContent;
                els.visualInput.textContent = els.realInput.value;
                els.ghostInput.textContent = '';
                return;
            }
            if (e.key === 'Tab') e.preventDefault(); 
        }

        // History Up
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                els.realInput.value = commandHistory[historyIndex];
                els.visualInput.textContent = els.realInput.value;
                els.ghostInput.textContent = '';
            }
            return;
        }
        // History Down
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                els.realInput.value = commandHistory[historyIndex];
                els.visualInput.textContent = els.realInput.value;
                els.ghostInput.textContent = '';
            } else {
                historyIndex = commandHistory.length;
                els.realInput.value = '';
                els.visualInput.textContent = '';
                els.ghostInput.textContent = '';
            }
            return;
        }

        // Execute
        if (e.key === 'Enter') {
            const val = els.realInput.value.trim();
            if (val) {
                commandHistory.push(val);
                historyIndex = commandHistory.length;
                exec(val);
            }
        }
    });
}

// Theme Helper
export function setTheme(theme) {
    if (theme === 'gruvbox') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme); 
    els.themeMenu.classList.remove('show');
    els.realInput.focus();
}
