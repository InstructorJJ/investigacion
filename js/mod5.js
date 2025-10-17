let selectedMethod = '';
let quizAnswers = {};
let quizAttempts = {};

// Generar hipótesis desde el constructor
function generateHypothesis() {
    const independent = document.getElementById('independent').value;
    const relation = document.getElementById('relation').value;
    const dependent = document.getElementById('dependent').value;
    const magnitude = document.getElementById('magnitude').value;
    const context = document.getElementById('context').value;

    if (!independent || !relation || !dependent) {
        alert('Por favor completa al menos los tres primeros campos');
        return;
    }

    let hypothesis = independent + ' ' + relation + ' ' + dependent;
    if (magnitude) hypothesis += ' ' + magnitude;
    if (context) hypothesis += ' ' + context;
    hypothesis += '.';

    // Generar hipótesis nula
    let nullHyp = independent + ' no afecta ' + dependent;
    if (context) nullHyp += ' ' + context;
    nullHyp += '.';

    document.getElementById('generatedHypothesis').textContent = hypothesis;
    document.getElementById('nullHypothesis').textContent = nullHyp;
    document.getElementById('hypothesisResult').classList.add('show');
}

// Verificar selección de método
function checkMethod(element, method) {
    selectedMethod = method;
    const feedback = document.getElementById('methodFeedback');
    const options = document.getElementById('methodQuestion').children;
    
    for (let opt of options) {
        opt.classList.remove('correct');
    }
    
    element.classList.add('correct');
    
    let feedbackText = '';
    if (method === 'cuantitativo') {
        feedbackText = '📊 Excelente elección si vas a medir variables numéricas como velocity, bugs, tiempo, cobertura de código, etc.';
    } else if (method === 'cualitativo') {
        feedbackText = '💬 Perfecta elección si vas a explorar experiencias, percepciones, motivaciones o comprender fenómenos en profundidad.';
    } else if (method === 'mixto') {
        feedbackText = '🔄 ¡Muy bien! El método mixto te dará una visión completa combinando datos numéricos con experiencias humanas.';
    }
    
    feedback.textContent = feedbackText;
    feedback.style.display = 'block';
    updateProgress();
}

// Validar hipótesis del ejercicio
function validateHypothesis() {
    const hypothesis = document.getElementById('exerciseHypothesis').value.trim();
    const result = document.getElementById('validationResult');
    
    if (!hypothesis) {
        alert('Por favor escribe tu hipótesis');
        return;
    }

    let score = 0;
    let feedback = '<h4>Análisis de tu Hipótesis:</h4><ul style="line-height: 2; margin: 10px 0 10px 20px;">';

    // Verificar longitud
    if (hypothesis.length > 20) {
        score += 20;
        feedback += '<li>✅ Tiene longitud adecuada</li>';
    } else {
        feedback += '<li>⚠️ Parece muy corta, intenta ser más específico</li>';
    }

    // Verificar variables
    if (hypothesis.toLowerCase().includes('entre') || hypothesis.toLowerCase().includes('relación') || 
        hypothesis.toLowerCase().includes('afecta') || hypothesis.toLowerCase().includes('aumenta') || 
        hypothesis.toLowerCase().includes('reduce')) {
        score += 25;
        feedback += '<li>✅ Establece una relación entre variables</li>';
    } else {
        feedback += '<li>⚠️ Intenta establecer una relación clara entre variables (causa-efecto o correlación)</li>';
    }

    // Verificar especificidad
    if (hypothesis.match(/\d+%?/) || hypothesis.toLowerCase().includes('scrum') || 
        hypothesis.toLowerCase().includes('sprint') || hypothesis.toLowerCase().includes('equipo')) {
        score += 25;
        feedback += '<li>✅ Es específica y contextualizada</li>';
    } else {
        feedback += '<li>⚠️ Intenta ser más específico con números o contexto</li>';
    }

    // Verificar claridad
    if (!hypothesis.toLowerCase().includes('quizás') && !hypothesis.toLowerCase().includes('tal vez') &&
        !hypothesis.toLowerCase().includes('probablemente')) {
        score += 15;
        feedback += '<li>✅ Es clara y asertiva</li>';
    } else {
        feedback += '<li>⚠️ Evita palabras ambiguas como "quizás", "tal vez", "probablemente"</li>';
    }

    // Verificar comprobabilidad
    if (hypothesis.toLowerCase().includes('medir') || hypothesis.toLowerCase().includes('comparar') || 
        score > 50) {
        score += 15;
        feedback += '<li>✅ Parece comprobable con datos</li>';
    } else {
        feedback += '<li>⚠️ Asegúrate de que puedas medirla con datos reales</li>';
    }

    feedback += '</ul>';

    let finalFeedback = '';
    if (score >= 80) {
        finalFeedback = '<p style="color: #28a745; font-weight: bold; margin-top: 15px;">🎉 ¡Excelente hipótesis! Está bien formulada y lista para ser probada.</p>';
        result.style.background = '#d4edda';
        result.style.borderColor = '#28a745';
    } else if (score >= 60) {
        finalFeedback = '<p style="color: #ffc107; font-weight: bold; margin-top: 15px;">👍 Buena hipótesis, pero puede mejorar. Revisa las sugerencias.</p>';
        result.style.background = '#fff3cd';
        result.style.borderColor = '#ffc107';
    } else {
        finalFeedback = '<p style="color: #dc3545; font-weight: bold; margin-top: 15px;">📝 Tu hipótesis necesita trabajo. Revisa los ejemplos del módulo e intenta nuevamente.</p>';
        result.style.background = '#f8d7da';
        result.style.borderColor = '#dc3545';
    }

    result.innerHTML = feedback + finalFeedback;
    result.style.display = 'block';
    result.classList.add('show');
    updateProgress();
}

// Verificar respuestas del quiz
function checkQuiz(element, questionNum, isCorrect) {
    if (quizAttempts[questionNum]) return;
    
    quizAttempts[questionNum] = true;
    quizAnswers[questionNum] = isCorrect;

    if (isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }

    if (Object.keys(quizAnswers).length === 5) {
        showQuizResults();
    }
    
    updateProgress();
}

function showQuizResults() {
    const score = Object.values(quizAnswers).filter(v => v).length;
    const percentage = (score / 5) * 100;
    
    document.getElementById('scoreText').textContent = `Puntuación: ${score}/5 (${percentage}%)`;
    
    let feedback = '';
    if (score === 5) {
        feedback = '🎉 ¡Perfecto! Has dominado completamente el módulo. ¡Excelente trabajo!';
    } else if (score >= 4) {
        feedback = '👏 ¡Muy bien! Tienes un buen dominio del tema. Repasa las preguntas incorrectas.';
    } else if (score >= 3) {
        feedback = '👍 Buen intento. Revisa los conceptos principales del módulo y vuelve a intentarlo.';
    } else {
        feedback = '📚 Necesitas repasar el módulo. Lee nuevamente los ejemplos y conceptos clave.';
    }
    
    document.getElementById('scoreFeedback').textContent = feedback;
    document.getElementById('quizScore').style.display = 'block';
}

// Guardar progreso
function saveProgress() {
    const variables = document.getElementById('exerciseVariables').value;
    const hypothesis = document.getElementById('exerciseHypothesis').value;
    const method = document.getElementById('exerciseMethod').value;

    if (!variables || !hypothesis || !method) {
        alert('Por favor completa todos los campos del ejercicio antes de guardar');
        return;
    }

    const progress = {
        module: 5,
        selectedMethod: selectedMethod,
        variables: variables,
        hypothesis: hypothesis,
        method: method,
        quizScore: Object.values(quizAnswers).filter(v => v).length,
        date: new Date().toISOString()
    };

    alert('✅ ¡Ejercicio guardado exitosamente!\n\nRecuerda: Esta información se guardará en tu sesión actual. Para un guardado permanente, copia el contenido a tu documento de proyecto.');
    
    console.log('Progreso guardado:', progress);
    updateProgress();
}

// Actualizar barra de progreso
function updateProgress() {
    const checks = document.querySelectorAll('input[type="checkbox"]:checked').length;
    const quizCompleted = Object.keys(quizAnswers).length === 5 ? 1 : 0;
    const methodSelected = selectedMethod ? 1 : 0;
    const hypothesisGenerated = document.getElementById('hypothesisResult').classList.contains('show') ? 1 : 0;
    
    const total = 8 + 1 + 1 + 1; // 8 checkboxes + quiz + method + hypothesis
    const completed = checks + quizCompleted + methodSelected + hypothesisGenerated;
    const percentage = Math.round((completed / total) * 100);
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
    progressBar.textContent = percentage + '%';
}

// Completar módulo
function completeModule() {
    const checks = document.querySelectorAll('input[type="checkbox"]:checked').length;
    
    if (checks < 6) {
        alert('⚠️ Completa al menos 6 items del checklist antes de continuar al siguiente módulo.');
        return;
    }

    if (confirm('✅ ¿Has completado todos los ejercicios y te sientes preparado para el Módulo 6?')) {
        alert('🎉 ¡Felicitaciones! Has completado el Módulo 5.\n\nAhora aprenderás sobre técnicas de recolección de información en el Módulo 6.');
        // Aquí iría la navegación real
        window.location.href = 'modulo6.html';
    }
}

function irModuloAnterior() {
    alert('Regresando al Módulo 4: Objetivos y Alcance del proyecto');
    window.location.href = "modulo4.html";
}

// Inicializar
window.onload = function() {
    updateProgress();
};