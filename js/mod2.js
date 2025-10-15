let currentSection = 0;
const totalSections = 1;
const exercises = {
    tema: '',
    idea: '',
    enfoque: '',
    justificacion: ''
};

function changeTab(tabIndex) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.style.display = 'none');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById('tab' + tabIndex).style.display = 'block';
    buttons[tabIndex].classList.add('active');
    
    updateProgress();
}

function guardarTema() {
    const tema = document.getElementById('tema').value.trim();
    if (tema.length < 5) {
        alert('Por favor escribe un tema más descriptivo');
        return;
    }
    exercises.tema = tema;
    document.getElementById('feedbackTema').style.display = 'block';
    document.getElementById('feedbackTema').textContent = '✓ Tema guardado correctamente: ' + tema;
    updateResumen();
}

function guardarIdea() {
    const idea = document.getElementById('idea').value.trim();
    if (idea.length < 10) {
        alert('Por favor escribe una idea más detallada');
        return;
    }
    exercises.idea = idea;
    document.getElementById('feedbackIdea').style.display = 'block';
    document.getElementById('feedbackIdea').textContent = '✓ Idea guardada correctamente';
    updateResumen();
}

function guardarEnfoque() {
    const enfoque = document.getElementById('enfoque').value;
    const justificacion = document.getElementById('justificacion').value.trim();
    
    if (!enfoque) {
        alert('Por favor selecciona un enfoque');
        return;
    }
    if (justificacion.length < 10) {
        alert('Por favor justifica tu elección');
        return;
    }
    
    exercises.enfoque = enfoque;
    exercises.justificacion = justificacion;
    document.getElementById('feedbackEnfoque').style.display = 'block';
    document.getElementById('feedbackEnfoque').textContent = '✓ Enfoque guardado correctamente';
    updateResumen();
}

function updateResumen() {
    if (exercises.tema && exercises.idea && exercises.enfoque) {
        const resumenTexto = `
            <strong>Tema:</strong> ${exercises.tema}<br><br>
            <strong>Idea de Investigación:</strong> ${exercises.idea}<br><br>
            <strong>Enfoque:</strong> ${exercises.enfoque.charAt(0).toUpperCase() + exercises.enfoque.slice(1)}<br><br>
            <strong>Justificación:</strong> ${exercises.justificacion}
        `;
        document.getElementById('resumen').innerHTML = resumenTexto;
    }
}

function nextSection() {
    if (currentSection < totalSections) {
        currentSection++;
        updateSections();
    }
}

function previousSection() {
    if (currentSection > 0) {
        currentSection--;
        updateSections();
    }
}

function updateSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    if (sections[currentSection]) {
        sections[currentSection].classList.add('active');
    }
    updateProgress();
    updateNavButtons();
}

function updateNavButtons() {
    document.getElementById('prevBtn').disabled = currentSection === 0;
    document.getElementById('nextBtn').disabled = currentSection === totalSections;
}

function updateProgress() {
    const progress = ((currentSection + 1) / (totalSections + 1)) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function modulo_1() {
  window.location.href = "index.html";
}
function modulo_3() {
  window.location.href = "modulo3.html";
}
// Inicializar
updateNavButtons();
updateProgress();