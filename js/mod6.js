function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calcularMuestra() {
    const N = parseFloat(document.getElementById('universo').value);
    const Z = parseFloat(document.getElementById('confianza').value);
    const e = parseFloat(document.getElementById('error').value);
    const p = parseFloat(document.getElementById('proporcion').value);
    const q = 1 - p;

    if (!N || N <= 0) {
        alert('Por favor, ingresa un tamaño de universo válido');
        return;
    }

    const numerador = N * Math.pow(Z, 2) * p * q;
    const denominador = Math.pow(e, 2) * (N - 1) + Math.pow(Z, 2) * p * q;
    const n = Math.ceil(numerador / denominador);

    document.getElementById('resultValue').textContent = n;
    document.getElementById('resultText').textContent = `Necesitas una muestra de ${n} elementos para tu investigación`;
    
    const porcentaje = ((n / N) * 100).toFixed(1);
    const confianzaPct = Z === 1.96 ? '95%' : (Z === 1.645 ? '90%' : '99%');
    const errorPct = (e * 100).toFixed(0);
    
    document.getElementById('interpretacion').innerHTML = `
        Con una muestra de <strong>${n} elementos</strong> de un universo de <strong>${N}</strong> 
        (${porcentaje}% del total), puedes estar <strong>${confianzaPct} seguro</strong> de que tus 
        resultados tendrán un error máximo de <strong>±${errorPct}%</strong>.<br><br>
        <strong>Recomendación:</strong> ${n < 30 ? 
            'Esta muestra es pequeña. Considera aumentarla a mínimo 30 elementos para resultados más robustos.' : 
            (n > 100 ? 
                'Esta es una muestra amplia que te dará resultados confiables. Si tienes limitaciones de recursos, podrías considerar aumentar el margen de error.' :
                'Esta muestra es adecuada para tu investigación. Recuerda agregar 10-15% extra para compensar posibles no respuestas.')
        }
    `;
    
    document.getElementById('calcResult').classList.add('show');
}

function selectOption(element, questionId, isCorrect) {
    const options = element.parentElement.querySelectorAll('.option');
    options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    element.classList.add('selected');
    
    const feedback = document.getElementById('feedback-' + questionId);
    
    if (isCorrect) {
        element.classList.add('correct');
        feedback.style.color = '#15803d';
        feedback.style.background = '#dcfce7';
        feedback.style.padding = '15px';
        feedback.style.borderRadius = '8px';
        feedback.style.display = 'block';
        
        const feedbackTexts = {
            'q1': '✅ ¡Correcto! Una encuesta online es ideal para recolectar información de muchas personas (200) de forma rápida y estructurada. Permite cuantificar la satisfacción y analizar los datos estadísticamente.',
            'q2': '✅ ¡Exacto! Las entrevistas semiestructuradas permiten profundizar en las experiencias individuales de cada Scrum Master, explorar casos específicos y obtener información detallada sobre sus estrategias.',
            'q3': '✅ ¡Perfecto! La observación directa es la única forma de obtener datos objetivos y reales sobre la duración. Las percepciones pueden ser inexactas.',
            'q4': '✅ ¡Correcto! El análisis documental de burndown charts y reportes históricos te da datos cuantitativos precisos sobre la evolución de la velocidad del equipo.'
        };
        
        feedback.textContent = feedbackTexts[questionId];
    } else {
        element.classList.add('incorrect');
        feedback.style.color = '#dc2626';
        feedback.style.background = '#fef2f2';
        feedback.style.padding = '15px';
        feedback.style.borderRadius = '8px';
        feedback.style.display = 'block';
        feedback.textContent = '❌ Incorrecto. Piensa en qué técnica te daría la información más adecuada para responder esa pregunta específica.';
    }
}

function generarResumen() {
    const pregunta = document.getElementById('pregunta').value;
    const universoDef = document.getElementById('universo-def').value;
    const tamanoUniverso = document.getElementById('tamano-universo').value;
    const tipoMuestreo = document.getElementById('tipo-muestreo').value;
    const tamanoMuestra = document.getElementById('tamano-muestra').value;
    const justificacion = document.getElementById('justificacion').value;
    const inclusion = document.getElementById('inclusion').value;
    const exclusion = document.getElementById('exclusion').value;
    
    const tecnicas = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        tecnicas.push(cb.value);
    });

    if (!pregunta || !universoDef || !tamanoUniverso || !tipoMuestreo || !tamanoMuestra || tecnicas.length < 2) {
        alert('Por favor completa todos los campos. Recuerda seleccionar al menos 2 técnicas de recolección.');
        return;
    }

    const tiposMuestreo = {
        'aleatorio': 'Aleatorio Simple (Probabilístico)',
        'estratificado': 'Estratificado (Probabilístico)',
        'sistematico': 'Sistemático (Probabilístico)',
        'conveniencia': 'Por Conveniencia (No probabilístico)',
        'intencional': 'Intencional (No probabilístico)'
    };

    const nombresTecnicas = {
        'encuesta': 'Encuesta',
        'entrevista': 'Entrevista',
        'observacion': 'Observación',
        'documental': 'Análisis Documental',
        'focal': 'Grupo Focal'
    };

    const tecnicasTexto = tecnicas.map(t => nombresTecnicas[t]).join(', ');
    const porcentajeMuestra = ((tamanoMuestra / tamanoUniverso) * 100).toFixed(1);

    const resumenHTML = `
        <div style="line-height: 1.8;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: #667eea; margin-bottom: 10px;">📋 Pregunta de Investigación</h5>
                <p style="font-size: 1.1em;">${pregunta}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: #667eea; margin-bottom: 10px;">🌍 Universo</h5>
                <p>${universoDef}</p>
                <p style="margin-top: 8px;"><strong>Tamaño:</strong> ${tamanoUniverso} elementos</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: #667eea; margin-bottom: 10px;">👥 Muestra</h5>
                <p><strong>Tipo de muestreo:</strong> ${tiposMuestreo[tipoMuestreo]}</p>
                <p style="margin-top: 8px;"><strong>Tamaño:</strong> ${tamanoMuestra} elementos (${porcentajeMuestra}% del universo)</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: #667eea; margin-bottom: 10px;">🔍 Técnicas de Recolección</h5>
                <p>${tecnicasTexto}</p>
                ${justificacion ? `<p style="margin-top: 10px;"><strong>Justificación:</strong> ${justificacion}</p>` : ''}
            </div>

            ${inclusion ? `
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: #667eea; margin-bottom: 10px;">✅ Criterios de Inclusión</h5>
                <p>${inclusion}</p>
            </div>
            ` : ''}

            ${exclusion ? `
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                <h5 style="color: #667eea; margin-bottom: 10px;">❌ Criterios de Exclusión</h5>
                <p>${exclusion}</p>
            </div>
            ` : ''}

            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <h5 style="color: #1e40af; margin-bottom: 10px;">💡 Recomendaciones</h5>
                <ul style="margin-left: 20px; line-height: 1.8;">
                    ${tamanoMuestra < 30 ? '<li>⚠️ Tu muestra es pequeña. Considera aumentarla a mínimo 30 elementos para mayor validez estadística.</li>' : ''}
                    ${tecnicas.length === 1 ? '<li>⚠️ Considera agregar al menos una técnica complementaria para triangular tus datos.</li>' : '<li>✅ Excelente: Estás usando múltiples técnicas para triangular información.</li>'}
                    ${tipoMuestreo.includes('probabilistico') || tipoMuestreo === 'aleatorio' || tipoMuestreo === 'estratificado' || tipoMuestreo === 'sistematico' ? '<li>✅ Tu muestreo probabilístico te permitirá generalizar resultados.</li>' : '<li>⚠️ Con muestreo no probabilístico, ten cuidado al generalizar resultados.</li>'}
                    <li>💾 Guarda este resumen y úsalo en tu documento de proyecto.</li>
                    <li>📅 Estima el tiempo necesario: recolección suele tomar 2-4 semanas.</li>
                </ul>
            </div>
        </div>
    `;

    document.getElementById('resumenContenido').innerHTML = resumenHTML;
    document.getElementById('resumenPlan').style.display = 'block';
    document.getElementById('resumenPlan').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function mostrarSolucionCaso() {
    document.getElementById('solucionCaso').style.display = 'block';
    event.target.style.display = 'none';
}

// Agregar interactividad a las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    // Animación de progreso
    setTimeout(() => {
        document.querySelector('.progress-fill').style.width = '75%';
    }, 500);
});

// Completar módulo
function completeModule() {
    if (confirm('✅ ¿Has completado todos los ejercicios y te sientes preparado para el Módulo 7?')) {
        alert('🎉 ¡Felicitaciones! Has completado el Módulo 6.\n\nAhora aprenderás sobre Fuentes de Información.');
        // Aquí iría la navegación real
        window.location.href = 'modulo7.html';
    }
}

function irModuloAnterior() {
    alert('Regresando al Módulo 5: Métodos de Investigación e Hipótesis');
    window.location.href = "modulo5.html";
}
