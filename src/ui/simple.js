import { projects } from '../data/projects.js';
import { experiments } from '../data/experiments.js';
import { skills, coursework } from '../data/skills.js';

export function initSimpleUI() {
    renderProjects();
    renderExperiments();
    renderSkills();
    renderCoursework();
    initLightbox();
}

function renderProjectCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.className = '';
    container.innerHTML = data.map(p => `
        <div class="item-box project-card${p.image ? ' has-image' : ''}" ${p.image ? `data-image="${p.image}" data-title="${p.title}"` : ''}>
            <div class="item-head">
                <span>${p.title}${p.image ? ' <span class="project-img-hint dim">[img]</span>' : ''}</span>
                <a class="simple-link" href="${p.link}" target="_blank">[source]</a>
            </div>
            <div class="item-desc">${p.desc}</div>
            <div>${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>
    `).join('');
}

function renderProjects() {
    renderProjectCards(projects, 'projects-container');
}

function renderExperiments() {
    renderProjectCards(experiments, 'experiments-container');
}

function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'img-lightbox';
    lightbox.innerHTML = `<div id="lightbox-inner"><img id="lightbox-img" src="" alt=""><div id="lightbox-title"></div></div>`;
    document.body.appendChild(lightbox);

    document.querySelectorAll('.has-image').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            document.getElementById('lightbox-img').src = card.dataset.image;
            document.getElementById('lightbox-title').textContent = card.dataset.title;
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
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
