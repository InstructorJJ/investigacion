// Toggle para tarjetas interactivas
function toggleCard(card) {
    const content = card.querySelector('.card-content');
    const arrow = card.querySelector('.card-header span:last-child');
    
    content.classList.toggle('active');
    arrow.textContent = content.classList.contains('active') ? '▲' : '▼';
}

// Validación del ejercicio
function validarEjercicio() {
    const problema = document.getElementById('problema').value.trim();
    const pregunta = document.getElementById('pregunta').value.trim();
    const secundarias = document.getElementById('secundarias').value.trim();
    const justificacion = document.getElementById('justificacion').value.trim();
    const feedback = document.getElementById('feedbackEjercicio');

    let mensajes = [];
    let errores = 0;

    // Validar problema
    if (problema.length < 100) {
        errores++;
        mensajes.push('❌ El problema debe tener al menos 100 palabras para ser suficientemente descriptivo.');
    } else if (!problema.match(/\d/)) {
        mensajes.push('⚠️ Considera incluir datos cuantitativos en tu problema (porcentajes, cantidades, tiempos).');
    }

    // Validar pregunta principal
    if (!pregunta.startsWith('¿') || !pregunta.endsWith('?')) {
        errores++;
        mensajes.push('❌ La pregunta principal debe iniciar con ¿ y terminar con ?');
    } else if (pregunta.length < 50) {
        mensajes.push('⚠️ Tu pregunta principal parece muy corta. Asegúrate de incluir contexto y delimitación.');
    }

    // Validar preguntas secundarias
    const numSecundarias = (secundarias.match(/¿/g) || []).length;
    if (numSecundarias < 2) {
        errores++;
        mensajes.push('❌ Debes incluir al menos 2 preguntas secundarias.');
    }

    // Validar justificación
    if (justificacion.length < 200) {
        errores++;
        mensajes.push('❌ La justificación debe ser más extensa (al menos 200 palabras).');
    }

    const tiposJustificacion = ['teórica', 'práctica', 'metodológica', 'social'];
    let tiposEncontrados = 0;
    tiposJustificacion.forEach(tipo => {
        if (justificacion.toLowerCase().includes(tipo)) {
            tiposEncontrados++;
        }
    });

    if (tiposEncontrados < 2) {
        mensajes.push('⚠️ Tu justificación debería mencionar explícitamente al menos 2 tipos (teórica, práctica, metodológica o social).');
    }

    // Mostrar feedback
    if (errores === 0) {
        feedback.className = 'feedback success';
        feedback.style.display = 'block';
        feedback.innerHTML = `
            <h3 style="margin-bottom: 15px;">🎉 ¡Excelente trabajo!</h3>
            <p>Tu formulación del problema, pregunta y justificación cumple con los requisitos básicos.</p>
            ${mensajes.length > 0 ? '<p style="margin-top: 15px;"><strong>Sugerencias de mejora:</strong></p><ul style="margin-left: 20px;">' + mensajes.map(m => '<li>' + m + '</li>').join('') : ''}
            ${mensajes.length > 0 ? '</ul>' : ''}
            <p style="margin-top: 15px;"><strong>Próximos pasos:</strong></p>
            <ul style="margin-left: 20px; margin-top: 10px;">
                <li>Revisa el checklist de autoevaluación completo</li>
                <li>Comparte tu trabajo con un compañero para recibir feedback</li>
                <li>Cuando estés listo, avanza al Módulo 4</li>
            </ul>
        `;
    } else {
        feedback.className = 'feedback info';
        feedback.style.display = 'block';
        feedback.innerHTML = `
            <h3 style="margin-bottom: 15px;">📝 Tu trabajo necesita algunos ajustes</h3>
            <p><strong>Revisa los siguientes puntos:</strong></p>
            <ul style="margin: 15px 0 15px 20px;">
                ${mensajes.map(m => '<li>' + m + '</li>').join('')}
            </ul>
            <p style="margin-top: 15px;">💡 <strong>Consejo:</strong> Revisa los ejemplos del módulo y vuelve a intentarlo. ¡Vas por buen camino!</p>
        `;
    }

    // Scroll al feedback
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Guardar progreso (simula almacenamiento local)
function guardarProgreso() {
    const data = {
        problema: document.getElementById('problema').value,
        pregunta: document.getElementById('pregunta').value,
        secundarias: document.getElementById('secundarias').value,
        justificacion: document.getElementById('justificacion').value,
        fecha: new Date().toLocaleString('es-CO')
    };

    // Mostrar confirmación
    const feedback = document.getElementById('feedbackEjercicio');
    feedback.className = 'feedback success';
    feedback.style.display = 'block';
    feedback.innerHTML = `
        <h3>💾 Progreso guardado exitosamente</h3>
        <p>Tu trabajo del Módulo 3 ha sido guardado en tu navegador.</p>
        <p style="margin-top: 10px;"><small>Última actualización: ${data.fecha}</small></p>
        <p style="margin-top: 15px;"><strong>💡 Tip:</strong> Puedes copiar tu trabajo a un documento externo para mayor seguridad.</p>
    `;
    
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Simular guardado (en una aplicación real, esto iría a una base de datos)
    console.log('Progreso guardado:', data);
}

// Animación de entrada
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
function modulo_2() {
  window.location.href = "modulo2.html";
}
function modulo_4() {
  window.location.href = "modulo4.html";
}