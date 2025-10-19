let datosProyecto = {};

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function calcularProgreso() {
    const campos = [
        'titulo', 'autores', 'enfoque', 'tema',
        'descripcion-problema', 'pregunta-principal', 'preguntas-secundarias', 'justificacion',
        'objetivo-general', 'objetivos-especificos', 'alcance-temporal', 'alcance-espacial', 'nivel',
        'metodo', 'poblacion', 'muestra', 'tecnicas',
        'palabras-clave', 'referencias-bib', 'marco-teorico'
    ];
    
    let completados = 0;
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento && elemento.value.trim() !== '') {
            completados++;
        }
    });
    
    const porcentaje = Math.round((completados / campos.length) * 100);
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    progressFill.style.width = porcentaje + '%';
    progressFill.textContent = porcentaje + '%';
    
    if (porcentaje < 30) {
        progressText.textContent = '¡Comienza a completar las secciones de tu proyecto!';
    } else if (porcentaje < 70) {
        progressText.textContent = '¡Buen avance! Continúa completando las secciones restantes';
    } else if (porcentaje < 100) {
        progressText.textContent = '¡Casi terminas! Solo faltan algunos detalles';
    } else {
        progressText.textContent = '¡Excelente! Tu proyecto está completo. Genera el documento final';
    }
    
    return porcentaje;
}

function guardarProgreso() {
    const campos = document.querySelectorAll('input, textarea, select');
    campos.forEach(campo => {
        datosProyecto[campo.id] = campo.value;
    });
    
    const progreso = calcularProgreso();
    
    alert(`✅ Progreso guardado exitosamente!\n\nCompletado: ${progreso}%\n\nTus datos están guardados en esta sesión.`);
}

function generarDocumento() {
    const progreso = calcularProgreso();
    
    if (progreso < 70) {
        alert('⚠️ Debes completar al menos el 70% del proyecto antes de generar el documento final.\n\nProgreso actual: ' + progreso + '%');
        return;
    }
    
    const titulo = document.getElementById('titulo').value;
    const autores = document.getElementById('autores').value;
    const enfoque = document.getElementById('enfoque').value;
    const tema = document.getElementById('tema').value;
    const problema = document.getElementById('descripcion-problema').value;
    const preguntaPrincipal = document.getElementById('pregunta-principal').value;
    const preguntasSecundarias = document.getElementById('preguntas-secundarias').value;
    const justificacion = document.getElementById('justificacion').value;
    const objetivoGeneral = document.getElementById('objetivo-general').value;
    const objetivosEspecificos = document.getElementById('objetivos-especificos').value;
    const alcanceTemporal = document.getElementById('alcance-temporal').value;
    const alcanceEspacial = document.getElementById('alcance-espacial').value;
    const nivel = document.getElementById('nivel').value;
    const metodo = document.getElementById('metodo').value;
    const hipotesis = document.getElementById('hipotesis').value;
    const variables = document.getElementById('variables').value;
    const poblacion = document.getElementById('poblacion').value;
    const muestra = document.getElementById('muestra').value;
    const tecnicas = document.getElementById('tecnicas').value;
    const palabrasClave = document.getElementById('palabras-clave').value;
    const referencias = document.getElementById('referencias-bib').value;
    const marcoTeorico = document.getElementById('marco-teorico').value;
    
    const documento = `
        <div style="padding: 30px; background: white; border-radius: 10px;">
            <div style="text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #667eea; margin-bottom: 10px;">${titulo || '[Título del Proyecto]'}</h1>
                <p style="font-size: 1.1em; color: #666;"><strong>Autor(es):</strong> ${autores || '[Autor(es)]'}</p>
                <p style="color: #888;">Fecha: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">1. INFORMACIÓN GENERAL</h2>
                <p style="margin: 15px 0;"><strong>Enfoque de Investigación:</strong> ${enfoque || '[No especificado]'}</p>
                <p style="margin: 15px 0;"><strong>Nivel de Investigación:</strong> ${nivel || '[No especificado]'}</p>
                <p style="margin: 15px 0;"><strong>Palabras Clave:</strong> ${palabrasClave || '[No especificadas]'}</p>
                <p style="margin: 15px 0; line-height: 1.8;"><strong>Tema:</strong> ${tema || '[Tema no especificado]'}</p>
            </section>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">2. PLANTEAMIENTO DEL PROBLEMA</h2>
                <h3 style="color: #764ba2; margin-top: 20px;">2.1 Descripción del Problema</h3>
                <p style="text-align: justify; line-height: 1.8; margin: 15px 0;">${problema || '[Descripción del problema pendiente]'}</p>
                
                <h3 style="color: #764ba2; margin-top: 20px;">2.2 Pregunta de Investigación</h3>
                <p style="margin: 15px 0;"><strong>Pregunta Principal:</strong> ${preguntaPrincipal || '[Pregunta principal pendiente]'}</p>
                <p style="margin: 15px 0;"><strong>Preguntas Secundarias:</strong></p>
                <ul style="margin-left: 30px; line-height: 1.8;">
                    ${preguntasSecundarias ? preguntasSecundarias.split(';').map(p => `<li>${p.trim()}</li>`).join('') : '<li>[Preguntas secundarias pendientes]</li>'}
                </ul>
            </section>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">3. JUSTIFICACIÓN</h2>
                <p style="text-align: justify; line-height: 1.8; margin: 15px 0;">${justificacion || '[Justificación pendiente]'}</p>
            </section>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">4. OBJETIVOS</h2>
                <h3 style="color: #764ba2; margin-top: 20px;">4.1 Objetivo General</h3>
                <p style="margin: 15px 0; line-height: 1.8;">${objetivoGeneral || '[Objetivo general pendiente]'}</p>
                
                <h3 style="color: #764ba2; margin-top: 20px;">4.2 Objetivos Específicos</h3>
                <ul style="margin-left: 30px; line-height: 1.8;">
                    ${objetivosEspecificos ? objetivosEspecificos.split('\n').filter(o => o.trim()).map(o => `<li>${o.trim()}</li>`).join('') : '<li>[Objetivos específicos pendientes]</li>'}
                </ul>
            </section>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">5. ALCANCE</h2>
                <p style="margin: 15px 0;"><strong>Alcance Temporal:</strong> ${alcanceTemporal || '[No especificado]'}</p>
                <p style="margin: 15px 0;"><strong>Alcance Espacial:</strong> ${alcanceEspacial || '[No especificado]'}</p>
            </section>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">6. MARCO TEÓRICO</h2>
                <p style="text-align: justify; line-height: 1.8; margin: 15px 0;">${marcoTeorico || '[Marco teórico pendiente]'}</p>
            </section>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">7. METODOLOGÍA</h2>
                <p style="margin: 15px 0;"><strong>Método de Investigación:</strong> ${metodo || '[No especificado]'}</p>
                ${hipotesis ? `<p style="margin: 15px 0;"><strong>Hipótesis:</strong> ${hipotesis}</p>` : ''}
                ${variables ? `<p style="margin: 15px 0;"><strong>Variables:</strong> ${variables}</p>` : ''}
                <p style="margin: 15px 0;"><strong>Población:</strong> ${poblacion || '[No especificada]'}</p>
                <p style="margin: 15px 0;"><strong>Muestra:</strong> ${muestra || '[No especificada]'}</p>
                <p style="margin: 15px 0; line-height: 1.8;"><strong>Técnicas de Recolección:</strong> ${tecnicas || '[No especificadas]'}</p>
            </section>
            
            <section style="margin-bottom: 30px;">
                <h2 style="color: #667eea; border-left: 5px solid #667eea; padding-left: 15px;">8. REFERENCIAS BIBLIOGRÁFICAS</h2>
                <div style="margin: 15px 0; line-height: 2;">
                    ${referencias ? referencias.split('\n').filter(r => r.trim()).map(r => `<p style="margin-left: 20px; text-indent: -20px;">${r.trim()}</p>`).join('') : '<p>[Referencias pendientes]</p>'}
                </div>
            </section>
            
            <div style="text-align: center; margin-top: 50px; padding-top: 20px; border-top: 2px solid #e9ecef;">
                <p style="color: #888; font-style: italic;">Documento generado el ${new Date().toLocaleDateString()} - Curso de Fundamentos de Investigación</p>
            </div>
        </div>
    `;
    
    document.getElementById('documento-generado').innerHTML = documento;
    document.getElementById('output').classList.add('active');
    document.getElementById('output').scrollIntoView({ behavior: 'smooth' });
    
    alert('📄 ¡Documento generado exitosamente!\n\nRevisa el documento completo abajo y descárgalo cuando estés listo.');
}

function descargarDocumento() {
    const contenido = document.getElementById('documento-generado').innerHTML;
    const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Proyecto de Investigación</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
                h1 { color: #667eea; }
                h2 { color: #667eea; margin-top: 30px; }
                h3 { color: #764ba2; }
                p { line-height: 1.8; text-align: justify; }
            </style>
        </head>
        <body>${contenido}</body>
        </html>
    `;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proyecto_investigacion.html';
    a.click();
    URL.revokeObjectURL(url);
}

function iniciarProyecto() {
    document.querySelector('.tabs .tab').click();
    document.getElementById('titulo').focus();
    alert('🚀 ¡Excelente decisión!\n\nComienza completando la información básica de tu proyecto en la primera pestaña.\n\nRecuerda guardar tu progreso regularmente.');
}

function verEjemplosCompletos() {
    alert('📚 Ejemplos Completos de Proyectos\n\n' +
            'Los ejemplos mostrados en esta página son proyectos reales que han sido destacados por su calidad.\n\n' +
            'Observa cómo:\n' +
            '• Definen claramente el problema\n' +
            '• Plantean objetivos medibles\n' +
            '• Justifican la investigación\n' +
            '• Estructuran la metodología\n\n' +
            'Usa estos ejemplos como inspiración, pero recuerda que tu proyecto debe ser original y responder a tu contexto específico.');
}

document.querySelectorAll('input, textarea, select').forEach(elemento => {
    elemento.addEventListener('input', calcularProgreso);
});

window.addEventListener('load', () => {
    calcularProgreso();
    
    setTimeout(() => {
        alert('🎓 ¡Bienvenido al Proyecto Final Integrador!\n\n' +
                'Este es el último módulo donde aplicarás todo lo aprendido.\n\n' +
                '✅ Revisa cada sección con cuidado\n' +
                '✅ Completa el formulario interactivo\n' +
                '✅ Sigue la metodología Scrum\n' +
                '✅ Genera tu documento final\n\n' +
                '¡Mucho éxito en tu proyecto!');
    }, 1000);
});