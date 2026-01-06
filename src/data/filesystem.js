import { projects } from './projects.js';
import { config } from '../config.js';

// Static files in root
const rootFiles = {
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
    "vim_buffer.txt": { type: 'file', perm: '-rw-------', size: '0B', date: 'Dec 12', name: 'vim_buffer.txt', content: "" }
};

// Static files in projects directory
const projectDirFiles = {
    ".": { type: 'dir', perm: 'drwxr-xr-x', size: '4096', date: 'Oct 12', name: '.' },
    "..": { type: 'dir', perm: 'drwxr-xr-x', size: '4096', date: 'Oct 12', name: '..' }
};

// Dynamically add projects to the project directory
projects.forEach(p => {
    const t = p.terminal;
    projectDirFiles[t.name] = {
        type: 'link',
        perm: 'lrwxrwxrwx',
        size: t.size,
        date: t.date,
        name: `${t.name} -> git/${p.id}`,
        url: p.link,
        content: t.content
    };
});

// Add the projects directory to root
rootFiles["projects/"] = { 
    type: 'dir', 
    perm: 'drwxr-xr-x', 
    size: '4096', 
    date: 'Oct 12', 
    name: 'projects/', 
    action: "exec('ls projects')" 
};

export const fileSystem = {
    "~": rootFiles,
    "~/projects": projectDirFiles
};
