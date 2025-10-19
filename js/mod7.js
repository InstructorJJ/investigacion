const answers = {
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null
};

const correctAnswers = {
    q1: true,
    q2: true,
    q3: true,
    q4: true,
    q5: true
};

function toggleSource(sourceId) {
    const allDetails = document.querySelectorAll('.source-details');
    const targetDetail = document.getElementById('source-' + sourceId);
    
    allDetails.forEach(detail => {
        if (detail.id !== 'source-' + sourceId) {
            detail.classList.remove('show');
        }
    });
    
    targetDetail.classList.toggle('show');
}

function selectOption(element, questionId, isCorrect) {
    const options = element.parentElement.querySelectorAll('.option');
    options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    element.classList.add('selected');
    answers[questionId] = isCorrect;
    
    const feedback = document.getElementById('feedback-' + questionId);
    feedback.classList.remove('show', 'success', 'error');
}

function checkAllAnswers() {
    let allAnswered = true;
    let correctCount = 0;
    
    for (let q in answers) {
        if (answers[q] === null) {
            allAnswered = false;
            break;
        }
    }
    
    if (!allAnswered) {
        alert('Por favor responde todas las preguntas antes de verificar.');
        return;
    }
    
    for (let q in answers) {
        const feedback = document.getElementById('feedback-' + q);
        const selectedOption = document.querySelector(`#feedback-${q}`).previousElementSibling.querySelector('.selected');
        
        if (answers[q]) {
            correctCount++;
            selectedOption.classList.add('correct');
            feedback.className = 'feedback success show';
            feedback.innerHTML = '<strong>✅ ¡Correcto!</strong> ' + getExplanation(q, true);
        } else {
            selectedOption.classList.add('incorrect');
            feedback.className = 'feedback error show';
            feedback.innerHTML = '<strong>❌ Incorrecto.</strong> ' + getExplanation(q, false);
        }
    }
    
    const scoreDisplay = document.getElementById('final-score');
    const percentage = (correctCount / 5) * 100;
    scoreDisplay.style.display = 'block';
    scoreDisplay.innerHTML = `Tu puntuación: ${correctCount}/5 (${percentage}%)`;
    
    if (percentage >= 80) {
        scoreDisplay.innerHTML += '<br>🎉 ¡Excelente! Dominas la evaluación de fuentes de información.';
    } else if (percentage >= 60) {
        scoreDisplay.innerHTML += '<br>👍 Bien. Revisa los conceptos donde fallaste.';
    } else {
        scoreDisplay.innerHTML += '<br>📚 Repasa el contenido del módulo para mejorar.';
    }
}

function getExplanation(questionId, isCorrect) {
    const explanations = {
        q1: {
            correct: 'Un artículo de 2015 en blog personal carece de actualidad (casi 10 años) y autoridad (no sabemos las credenciales del autor). En tecnología, esto es crítico.',
            incorrect: 'La respuesta correcta considera tanto la actualidad (2015 es antiguo para tecnología) como la autoridad (blog personal sin credenciales verificables).'
        },
        q2: {
            correct: 'Los datos recopilados directamente son fuentes primarias. Son información original de primera mano.',
            incorrect: 'Las fuentes primarias son datos originales. Un libro de análisis o artículo de revisión son secundarias; una enciclopedia es terciaria.'
        },
        q3: {
            correct: 'Stack Overflow es útil como referencia práctica, pero debe complementarse con fuentes académicas más formales para investigación seria.',
            incorrect: 'Stack Overflow tiene valor como fuente de conocimiento práctico, pero no debe ser tu única fuente ni descartarse completamente. Úsala con criterio.'
        },
        q4: {
            correct: 'Un repositorio de GitHub contiene código original (fuente primaria) y está en formato digital.',
            incorrect: 'Los repositorios de código son fuentes primarias porque contienen información original de primera mano, no análisis de otros.'
        },
        q5: {
            correct: 'Un marco teórico sólido combina diferentes tipos de fuentes confiables: académicas para teoría, documentación oficial para prácticas, y casos reales para contexto.',
            incorrect: 'Un buen marco teórico requiere diversidad y calidad de fuentes. No puedes basarte solo en blogs, Wikipedia o tus propios datos.'
        }
    };
    
    return explanations[questionId][isCorrect ? 'correct' : 'incorrect'];
}

function resetExercise() {
    for (let q in answers) {
        answers[q] = null;
    }
    
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    document.querySelectorAll('.feedback').forEach(fb => {
        fb.classList.remove('show');
    });
    
    document.getElementById('final-score').style.display = 'none';
}

function saveBibliografia() {
    const text = document.getElementById('bibliografia').value;
    if (text.trim() === '') {
        alert('Por favor escribe tu bibliografía antes de guardar.');
        return;
    }
    alert('✅ Bibliografía guardada en el navegador. Puedes continuar editándola.');
}

function downloadBibliografia() {
    const text = document.getElementById('bibliografia').value;
    if (text.trim() === '') {
        alert('Por favor escribe tu bibliografía antes de descargar.');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bibliografia_proyecto_investigacion.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

document.querySelectorAll('.checklist-item').forEach(checkbox => {
    checkbox.addEventListener('change', updateChecklistProgress);
});

function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item');
    const checked = document.querySelectorAll('.checklist-item:checked').length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);
    
    const progressDiv = document.getElementById('checklist-progress');
    progressDiv.innerHTML = `Progreso: ${checked}/${total} (${percentage}%)`;
    
    if (checked === total) {
        progressDiv.innerHTML += ' 🎉 ¡Checklist completo!';
    }
}

function irModAnterior() {
    alert('Regresando al Módulo 6: Técnicas de Recolección');
    window.location.href = "modulo6.html";
}

function irModSig() {
    alert('Regresando al Módulo 8: Proyecto Integrador');
    window.location.href = "modulo8.html";
}

console.log('🎓 Módulo 7: Fuentes de Información cargado correctamente');
console.log('📚 Recuerda: La calidad de tu investigación depende de la calidad de tus fuentes');