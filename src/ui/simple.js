import { projects } from '../data/projects.js';
import { builds } from '../data/builds.js';
import { experiments } from '../data/experiments.js';
import { skills, coursework } from '../data/skills.js';

let currentPage = 1;

const pages = {
    1: { data: projects, title: '01_FEATURED', subtitle: '// RISC-V system simulator' },
    2: { data: builds, title: '02_PROJECTS', subtitle: '// Other things I have built' },
    3: { data: experiments, title: '03_EXPLORATIONS', subtitle: '// Smaller side projects' }
};

export function initSimpleUI() {
    renderPage(1);
    renderSkills();
    renderCoursework();
    initLightbox();
}

function renderPage(page) {
    currentPage = page;
    const { data, title, subtitle } = pages[page];

    document.getElementById('projects-title').textContent = title;
    document.getElementById('projects-subtitle').textContent = subtitle;

    // Page switcher
    const switcher = document.getElementById('page-switcher');
    const totalPages = Object.keys(pages).length;
    let switcherHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === page) {
            switcherHtml += `<span class="page-btn page-btn-active">[${i}]</span>`;
        } else {
            switcherHtml += `<span class="page-btn" data-page="${i}">[${i}]</span>`;
        }
    }
    switcher.innerHTML = switcherHtml;

    switcher.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            renderPage(parseInt(btn.dataset.page));
            rebindLightbox();
            // Scroll to top of projects section
            document.getElementById('projects-title').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Render cards
    const container = document.getElementById('projects-container');
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

function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'img-lightbox';
    lightbox.innerHTML = `<div id="lightbox-inner"><img id="lightbox-img" src="" alt=""><div id="lightbox-title"></div></div>`;
    document.body.appendChild(lightbox);
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
    rebindLightbox();
}

function rebindLightbox() {
    const lightbox = document.getElementById('img-lightbox');
    document.querySelectorAll('#projects-container .has-image').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            document.getElementById('lightbox-img').src = card.dataset.image;
            document.getElementById('lightbox-title').textContent = card.dataset.title;
            lightbox.classList.add('active');
        });
    });
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
