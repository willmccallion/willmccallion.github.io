import { projects } from '../data/projects.js';
import { skills, coursework } from '../data/skills.js';

export function initSimpleUI() {
    renderProjects();
    renderSkills();
    renderCoursework();
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects.map(p => `
        <div class="item-box">
            <div class="item-head">
                <span>${p.title}</span> 
                <a class="simple-link" href="${p.link}" target="_blank">[source]</a>
            </div>
            <div class="item-desc">${p.desc}</div>
            <div>${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    container.innerHTML = skills.map(s => `
        <div>
            <span class="dim">></span> <strong>${s.category}</strong><br>
            <span class="dim">${s.items}</span>
        </div>
    `).join('');
}

function renderCoursework() {
    const container = document.getElementById('coursework-container');
    if (!container) return;

    container.innerHTML = coursework.map(c => 
        `<span class="tag">${c}</span>`
    ).join('');
}
