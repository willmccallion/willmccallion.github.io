const config = {
    github: "willmccallion",
    email: "wcmccallion@gmail.com"
};

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

let currentPath = "~";
let commandHistory = [];
let historyIndex = -1;
let isBooting = false;
let hasBootedOnce = false;
let inVim = false;

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

const rootDirectory = {
    "projects/": { 
        type: 'dir', 
        perm: 'drwxr-xr-x', 
        size: '4096', 
        date: 'Oct 12', 
        name: 'projects/', 
        action: "exec('ls projects')" 
    },
    "about": { type: 'exec', perm: '-rwxr-xr-x', size: '8.4M', date: 'Nov 01', name: 'about', action: "exec('about')" },
    "contact": { type: 'exec', perm: '-rwxr-xr-x', size: '1.2K', date: 'Oct 28', name: 'contact', action: "exec('contact')" },
    "transcript.txt": { 
        type: 'file', perm: '-rw-r--r--', size: '2.1K', date: 'Dec 12', name: 'transcript.txt', 
        content: `
<span class="primary bold">UNIVERSITY OF ALBERTA // ACADEMIC RECORD</span>
------------------------------------------
<span class="dim">Major:</span>  Honors Computer Science
<span class="dim">Status:</span> 3rd Year (Class of 2027)

<span class="secondary bold">>> CS & ENGINEERING</span>
 * Advanced Algorithms
 * Machine Learning I
 * Computer Architecture
 * Database Management
 * Procedural Programming

<span class="secondary bold">>> MATHEMATICS & STATISTICS</span>
 * Calculus IV
 * Linear Algebra II
 * Ordinary Differential Equations
 * Numerical Methods
 * Statistics
` 
    },
    "exit": { type: 'exec', perm: '-rwxr-xr-x', size: '500B', date: 'Jan 01', name: 'exit', action: "switchToSimple()" },
    "resume.pdf": { type: 'file', perm: '-rw-r--r--', size: '4.2M', date: 'Aug 15', name: 'resume.pdf', content: "Binary file resume.pdf matches." },
    "vim_buffer.txt": { type: 'file', perm: '-rw-------', size: '0B', date: 'Dec 12', name: 'vim_buffer.txt', content: "" }
};

const projectsDirectory = {
    ".": { type: 'dir', perm: 'drwxr-xr-x', size: '4096', date: 'Oct 12', name: '.' },
    "..": { type: 'dir', perm: 'drwxr-xr-x', size: '4096', date: 'Oct 12', name: '..' },
    "chess": { 
        type: 'link', perm: 'lrwxrwxrwx', size: '26', date: 'Nov 01', name: 'chess -> git/chess',
        url: `https://github.com/${config.github}/chess`,
        content: `
<span class="primary bold">PROJECT: Chess Engine (Rust)</span>
=======================================
A high-performance, UCI-compliant chess engine designed for 
correctness and strength. Features NNUE evaluation and 
Polyglot opening book support.

<span class="highlight bold">>> ENGINE FEATURES</span>
<span class="primary">*</span> <span class="bold">Search:</span>    Alpha-Beta Pruning with PVS & Transposition Tables.
<span class="primary">*</span> <span class="bold">Rules:</span>     Full support (Castling, En Passant, 50-move rule).
<span class="primary">*</span> <span class="bold">Eval:</span>      Supports NNUE (Neural Network).
<span class="primary">*</span> <span class="bold">Protocol:</span>  Universal Chess Interface (UCI) compatible.
<span class="primary">*</span> <span class="bold">Verify:</span>    Includes 'perft' move generation tester.

<span class="highlight bold">>> HOW TO USE</span>

<span class="dim"># 1. Play in Terminal (5 seconds per move)</span>
<span class="ls-exec">cargo run --release -- play-cli --time 5000</span>

<span class="dim"># 2. Run in GUI (Arena, Scid, etc)</span>
<span class="ls-exec">cargo run --release -- uci</span>

<span class="dim"># 3. Watch Self-Play (5 rounds)</span>
<span class="ls-exec">cargo run --release -- self-play --rounds 5 --time 1000</span>

<span class="highlight bold">>> NNUE SETUP</span>
To enable neural network evaluation, download the network file:
<a href="https://tests.stockfishchess.org/api/nn/nn-82215d0fd0df.nnue" target="_blank" class="ls-link">nn-82215d0fd0df.nnue</a>
`
    },
    "riscv-cpu-sim": { 
        type: 'link', perm: 'lrwxrwxrwx', size: '32', date: 'Sep 20', name: 'riscv-cpu-sim -> git/riscv-cpu-sim',
        url: `https://github.com/${config.github}/riscv-cpu-sim`,
        content: `
<span class="primary bold">RISC-V SYSTEM EMULATOR & MICROKERNEL</span>
=======================================
A cycle-accurate RISC-V (RV64IM) processor simulator written in Rust.
It boots a custom C-based microkernel with a 5-stage pipeline,
branch prediction, and cache hierarchy.

<span class="highlight bold">>> FEATURES :: CPU ARCHITECTURE</span>
<span class="dim">-</span> <span class="bold">ISA:</span>        RV64IM (Integer + Multiply/Divide)
<span class="dim">-</span> <span class="bold">Pipeline:</span>   5-Stage (Fetch, Decode, Execute, Memory, Writeback)
<span class="dim">-</span> <span class="bold">Prediction:</span> GShare (Global History), BTB, and RAS
<span class="dim">-</span> <span class="bold">Memory:</span>     L1 (16KB I/D), L2 (128KB), L3 (2MB)
<span class="dim">-</span> <span class="bold">MMU:</span>        Sv39-style translation with TLB

<span class="highlight bold">>> FEATURES :: OPERATING SYSTEM</span>
<span class="dim">-</span> <span class="bold">Bootloader:</span> M-Mode Assembly loader
<span class="dim">-</span> <span class="bold">Kernel:</span>     C-based S-Mode Microkernel
                <span class="dim">drivers: UART, VFS, ELF-loading, Malloc</span>
<span class="dim">-</span> <span class="bold">User Space:</span> Interactive Shell ('sh'), 'ls', and user programs

<span class="highlight bold">>> BUILD & RUN</span>
<span class="dim">1. Build Simulator:</span>  <span class="ls-exec">cargo build --release</span>
<span class="dim">2. Run System:</span>       <span class="ls-exec">cargo run --release</span>
<span class="dim">3. Pipeline Trace:</span>   <span class="ls-exec">cargo run --release -- --trace</span>

<span class="highlight bold">>> MEMORY MAP</span>
<span class="dim">----------------------------------------------------</span>
<span class="secondary">ADDRESS       DESCRIPTION                 PRIVILEGE</span>
<span class="dim">----------------------------------------------------</span>
0x1000_0000   UART I/O (Byte-wise)        RW
0x8000_0000   Bootloader Entry (M-Mode)   RX
0x8010_0000   Kernel Base (S-Mode)        RWX
0x8020_0000   User Program Load Address   RWX
0x9000_0000   Virtual Disk (MMIO)         R
<span class="dim">----------------------------------------------------</span>
`
    },
    "compiler": { 
        type: 'link', perm: 'lrwxrwxrwx', size: '28', date: 'Oct 15', name: 'compiler -> git/compiler',
        url: `https://github.com/uofa-systems/compiler`,
        content: `
<span class="primary bold">PROJECT: C to RISC-V Compiler</span>
=======================================
A Rust-based compiler that translates a C-subset language into 
RISC-V 64-bit Assembly (RV64I). Supports recursion and stack frames.

<span class="highlight bold">>> LANGUAGE SUPPORT</span>
<span class="dim">-</span> <span class="bold">Types:</span>    64-bit signed integers (int)
<span class="dim">-</span> <span class="bold">Control:</span>  if/else, while loops
<span class="dim">-</span> <span class="bold">Funcs:</span>    Recursive calls, arguments, return values
<span class="dim">-</span> <span class="bold">Ops:</span>      Arithmetic (+-*/) and Comparison (== != < >)

<span class="highlight bold">>> TECHNICAL DETAILS</span>
<span class="dim">Target:</span>   RISC-V 64-bit (RV64I)
<span class="dim">Method:</span>   Stack-machine based code generation
<span class="dim">Regs:</span>     Uses <span class="secondary">a0</span> (return/arg), <span class="secondary">s0</span> (frame ptr), <span class="secondary">sp</span> (stack)

<span class="highlight bold">>> USAGE PIPELINE</span>

<span class="dim"># 1. Compile Source (C -> Assembly)</span>
<span class="ls-exec">cargo run --quiet -- input.c > output.s</span>

<span class="dim"># 2. Assemble & Link (using GCC)</span>
<span class="ls-exec">riscv64-linux-gnu-gcc -static output.s -o program</span>

<span class="dim"># 3. Run (using QEMU)</span>
<span class="ls-exec">qemu-riscv64 ./program</span>
`
    }
};;

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
<span class="bold secondary">SYSTEM v2.5.0 :: WELCOME VISITOR</span>
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

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Resume.pdf'; 
    link.download = 'Will_McCallion_Resume.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function switchToTerminal() {
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

function switchToSimple() {
    els.terminal.style.display = 'none';
    els.scanlines.style.display = 'none';
    els.simple.style.display = 'block';

    els.realInput.value = '';
    els.visualInput.textContent = '';
    els.ghostInput.textContent = '';
}

function handleScreenClick() {
    if (inVim) {
        els.vimContent.focus();
    } else {
        const selection = window.getSelection();
        if (selection.type !== 'Range') {
            els.realInput.focus();
        }
    }
}

function toggleThemeMenu(e) {
    e.stopPropagation();
    els.themeMenu.classList.toggle('show');
}

function setTheme(theme) {
    if (theme === 'gruvbox') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme', theme); 
    els.themeMenu.classList.remove('show');
    els.realInput.focus();
}


document.addEventListener('click', () => {
    els.themeMenu.classList.remove('show');
});

window.exec = function(cmd) {
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

    if (pages[baseCmd]) {
        output = pages[baseCmd];
    }
    
    else if (baseCmd === 'ls' || baseCmd === 'dir') {
        let targetDir = rootDirectory;
        let isProject = false;
        
        if (arg === 'projects') {
            targetDir = projectsDirectory;
            isProject = true;
        } else if (currentPath === "~/projects") {
            targetDir = projectsDirectory;
            isProject = true;
        }        let rows = [];
        
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

    else if (baseCmd === 'projects') {
        window.exec('ls projects');
        return;
    }

    else if (baseCmd === 'cat') {
        if (!arg) {
            output = `<span class="alert">Usage: cat [filename]</span>`;
        } else {
            if (arg.startsWith('projects/')) {
                const projName = arg.split('/')[1];
                if (projectsDirectory[projName]) {
                    output = projectsDirectory[projName].content;
                } else {
                    output = `<span class="alert">cat: ${arg}: No such file</span>`;
                }
            }
            else if (rootDirectory[arg]) {
                if (rootDirectory[arg].type === 'file') {
                    output = rootDirectory[arg].content;
                } else if (rootDirectory[arg].type === 'dir') {
                    output = `<span class="alert">cat: ${arg}: Is a directory</span>`;
                } else {
                    output = `<span class="alert">Binary file ${arg} matches.</span>`;
                }
            } 
            else if (projectsDirectory[arg]) {
                 output = projectsDirectory[arg].content;
            }
            else {
                output = `<span class="alert">cat: ${arg}: No such file or directory</span>`;
            }
        }
    }

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
};

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

function triggerPanic() {
    els.panicOverlay.style.display = 'block';
    els.panicOverlay.innerHTML = `
<span class="bold">KERNEL PANIC: CRITICAL ERROR</span><br><br>
Instruction at 0x00007FF7423 referenced memory at 0xFFFFFFFF.<br>
System halting...
`;
    setTimeout(() => { location.reload(); }, 3000);
}

els.realInput.addEventListener('input', () => {
    const val = els.realInput.value;
    els.visualInput.textContent = val;

    if (val.length > (els.visualInput.dataset.len || 0)) {
         playTypingSound();
    }
    els.visualInput.dataset.len = val.length;

    els.ghostInput.textContent = ''; 
    if (val.length > 0) {
        const parts = val.toLowerCase().split(' ');
        const cmd = parts[0];
        
        if (parts.length > 1) {
            const arg = parts[1];
            let options = [];
            
            if (cmd === 'ls') {
                if (currentPath === '~' && 'projects'.startsWith(arg)) options.push('projects');
            } 
            
            else if (cmd === 'cd') {
                if (currentPath === '~') {
                    if ('projects'.startsWith(arg)) options.push('projects');
                } else if (currentPath === '~/projects') {
                    if ('..'.startsWith(arg)) options.push('..');
                }
            }

            else if (cmd === 'cat') {
                if (arg.startsWith('projects/')) {
                    const subArg = arg.split('/')[1];
                    const match = Object.keys(projectsDirectory).find(k => k.startsWith(subArg) && k !== '.' && k !== '..');
                    if (match) options.push(`projects/${match}`);
                } else {
                    const targetDir = (currentPath === '~/projects') ? projectsDirectory : rootDirectory;

                    const match = Object.keys(targetDir).find(k => {
                        return k.startsWith(arg) && k !== '.' && k !== '..' && targetDir[k].type !== 'dir';
                    });
                    if (match) options.push(match);
                }
            }

            if (options.length > 0) {
                const suggestion = options[0];
                if (suggestion.length > arg.length) {
                    els.ghostInput.textContent = suggestion.slice(arg.length);
                }
            }
        } else {
            const availableCmds = Object.keys(pages).concat(['ls','cat','cd','man','whoami','date','sudo','history','echo','clear','exit','help','vim','neofetch']);
            const match = availableCmds.find(c => c.startsWith(cmd));
            if (match) {
                els.ghostInput.textContent = match.slice(cmd.length);
            }
        }
    }
});

els.realInput.addEventListener('keydown', (e) => {
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

    if (e.key === 'Enter') {
        const val = els.realInput.value.trim();
        if (val) {
            commandHistory.push(val);
            historyIndex = commandHistory.length;
            exec(val);
        }
    }
});

async function runBoot() {
    isBooting = true;
    els.inputContainer.style.display = 'none';
    els.display.innerHTML = '';
    
    const bootSteps = [
        "Starting version 251.4-1-arch",
        "/dev/nvme0n1p2: clean, 420/69000 files, 1234/5678 blocks",
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

setInterval(() => {
    const now = new Date();
    els.clock.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}, 1000);

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}
