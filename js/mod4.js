let progreso = 0;
const totalSecciones = 3; // Tres ejercicios principales
let ejerciciosCompletados = {
    objetivos: false,
    alcance: false,
    niveles: false
};

function actualizarProgreso() {
    const completados = Object.values(ejerciciosCompletados).filter(v => v).length;
    progreso = Math.round((completados / totalSecciones) * 100);
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progreso + '%';
    progressBar.textContent = progreso + '%';

    // Habilitar botón siguiente si completó todo
    if (progreso === 100) {
        document.getElementById('btnSiguiente').disabled = false;
    }
}

function changeTab(evt, tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
    }

    const tabButtons = document.getElementsByClassName('tab-button');
    for (let button of tabButtons) {
        button.classList.remove('active');
    }

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function toggleCheck(element) {
    const checkbox = element.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    
    if (checkbox.checked) {
        element.classList.add('checked');
    } else {
        element.classList.remove('checked');
    }
}

function evaluarObjetivos() {
    const og = document.getElementById('objetivoGeneral').value.trim();
    const oe1 = document.getElementById('oe1').value.trim();
    const oe2 = document.getElementById('oe2').value.trim();
    const oe3 = document.getElementById('oe3').value.trim();
    const oe4 = document.getElementById('oe4').value.trim();

    const feedback = document.getElementById('feedbackObjetivos');
    feedback.style.display = 'block';

    if (!og || !oe1 || !oe2 || !oe3 || !oe4) {
        feedback.className = 'feedback warning';
        feedback.innerHTML = '<strong>⚠️ Ejercicio incompleto</strong><br>Por favor completa todos los campos antes de evaluar.';
        return;
    }

    let mensajes = [];
    let errores = 0;

    // Validar objetivo general
    const verbosOG = ['desarrollar', 'implementar', 'proponer', 'diseñar', 'evaluar', 'analizar', 'determinar', 'establecer'];
    const tieneVerboOG = verbosOG.some(v => og.toLowerCase().includes(v));
    
    if (!tieneVerboOG) {
        mensajes.push('• El objetivo general debería iniciar con un verbo en infinitivo apropiado.');
        errores++;
    }

    if (og.length < 50) {
        mensajes.push('• El objetivo general parece muy corto. Debe ser más descriptivo.');
        errores++;
    }

    // Validar objetivos específicos
    const objetivosEsp = [oe1, oe2, oe3, oe4];
    objetivosEsp.forEach((oe, index) => {
        const verbosOE = ['identificar', 'describir', 'caracterizar', 'comparar', 'diseñar', 'implementar', 'validar', 'medir', 'analizar'];
        const tieneVerboOE = verbosOE.some(v => oe.toLowerCase().includes(v));
        
        if (!tieneVerboOE) {
            mensajes.push(`• OE${index + 1}: Debería iniciar con un verbo en infinitivo apropiado.`);
            errores++;
        }

        if (oe.length < 30) {
            mensajes.push(`• OE${index + 1}: Parece muy corto. Debe ser más específico.`);
            errores++;
        }
    });

    if (errores === 0) {
        feedback.className = 'feedback success';
        feedback.innerHTML = '<strong>🎉 ¡Excelente trabajo!</strong><br>Tus objetivos están bien estructurados. ' +
            'Recuerda verificar que los objetivos específicos, al cumplirse, logren el objetivo general.';
        ejerciciosCompletados.objetivos = true;
        actualizarProgreso();
    } else {
        feedback.className = 'feedback warning';
        feedback.innerHTML = '<strong>📝 Sugerencias de mejora:</strong><br>' + mensajes.join('<br>');
    }
}

function verEjemplo() {
    const feedback = document.getElementById('feedbackObjetivos');
    feedback.style.display = 'block';
    feedback.className = 'feedback success';
    feedback.innerHTML = `
        <strong>💡 Ejemplo Sugerido:</strong><br><br>
        <strong>Objetivo General:</strong><br>
        "Implementar un framework de pruebas automatizadas basado en TDD para reducir en un 40% los bugs en producción 
        en equipos Scrum de desarrollo web."<br><br>
        <strong>OE1:</strong> Identificar los tipos de bugs más frecuentes en producción mediante análisis de 100 tickets de 5 equipos Scrum.<br><br>
        <strong>OE2:</strong> Diseñar un framework de pruebas automatizadas que incluya unitarias, integración y end-to-end usando Jest y Cypress.<br><br>
        <strong>OE3:</strong> Implementar el framework de pruebas en 3 equipos piloto durante 4 sprints consecutivos.<br><br>
        <strong>OE4:</strong> Evaluar la efectividad del framework comparando la tasa de bugs antes y después de la implementación.
    `;
}

function evaluarAlcance() {
    const espacial = document.getElementById('alcanceEspacial').value.trim();
    const temporal = document.getElementById('alcanceTemporal').value.trim();
    const poblacional = document.getElementById('alcancePoblacional').value.trim();
    const tematico = document.getElementById('alcanceTematico').value.trim();

    const feedback = document.getElementById('feedbackAlcance');
    feedback.style.display = 'block';

    if (!espacial || !temporal || !poblacional || !tematico) {
        feedback.className = 'feedback warning';
        feedback.innerHTML = '<strong>⚠️ Ejercicio incompleto</strong><br>Por favor completa todas las delimitaciones.';
        return;
    }

    let mensajes = [];
    let errores = 0;

    if (espacial.length < 20) {
        mensajes.push('• Delimitación espacial: Sé más específico sobre el lugar geográfico.');
        errores++;
    }

    if (temporal.length < 15) {
        mensajes.push('• Delimitación temporal: Especifica fechas o períodos más claros.');
        errores++;
    }

    if (poblacional.length < 25) {
        mensajes.push('• Delimitación poblacional: Describe mejor las características de los sujetos.');
        errores++;
    }

    if (!tematico.toLowerCase().includes('no')) {
        mensajes.push('• Delimitación temática: Es importante especificar también qué NO incluirás.');
        errores++;
    }

    if (errores === 0) {
        feedback.className = 'feedback success';
        feedback.innerHTML = '<strong>🎉 ¡Perfecto!</strong><br>Has definido correctamente todas las delimitaciones del alcance. ' +
            'Tu investigación tiene límites claros y manejables.';
        ejerciciosCompletados.alcance = true;
        actualizarProgreso();
    } else {
        feedback.className = 'feedback warning';
        feedback.innerHTML = '<strong>📝 Sugerencias de mejora:</strong><br>' + mensajes.join('<br>');
    }
}

function evaluarNiveles() {
    const respuestas = {
        nivelA: 'exploratorio',
        nivelB: 'descriptivo',
        nivelC: 'correlacional',
        nivelD: 'explicativo'
    };

    let correctas = 0;
    let total = 4;
    let detalles = [];

    for (let id in respuestas) {
        const seleccion = document.getElementById(id).value;
        const correcta = respuestas[id];

        if (seleccion === correcta) {
            correctas++;
            detalles.push(`✅ ${id.replace('nivel', 'Objetivo ')}: Correcto`);
        } else if (seleccion === '') {
            detalles.push(`⚠️ ${id.replace('nivel', 'Objetivo ')}: Sin responder`);
        } else {
            detalles.push(`❌ ${id.replace('nivel', 'Objetivo ')}: Incorrecto. La respuesta correcta es ${correcta}.`);
        }
    }

    const feedback = document.getElementById('feedbackNiveles');
    feedback.style.display = 'block';

    const porcentaje = Math.round((correctas / total) * 100);

    if (porcentaje === 100) {
        feedback.className = 'feedback success';
        feedback.innerHTML = `<strong>🎉 ¡Perfecto! ${correctas}/${total} correctas</strong><br><br>` +
            detalles.join('<br>') + '<br><br>Dominas los niveles de investigación.';
        ejerciciosCompletados.niveles = true;
        actualizarProgreso();
    } else if (porcentaje >= 50) {
        feedback.className = 'feedback warning';
        feedback.innerHTML = `<strong>📊 Bien, pero puedes mejorar: ${correctas}/${total} correctas</strong><br><br>` +
            detalles.join('<br>') + '<br><br>Revisa los conceptos de los niveles que fallaste.';
    } else {
        feedback.className = 'feedback warning';
        feedback.innerHTML = `<strong>📚 Necesitas repasar: ${correctas}/${total} correctas</strong><br><br>` +
            detalles.join('<br>') + '<br><br>Te recomendamos revisar nuevamente las definiciones de cada nivel.';
    }
}

function irModuloAnterior() {
    alert('Regresando al Módulo 3: El problema, la pregunta de investigación y la justificación del proyecto');
    window.location.href = "modulo3.html";
}

function irModuloSiguiente() {
    alert('¡Excelente! Has completado el Módulo 4. Avanzando al Módulo 5: Métodos de investigación e Hipótesis');
    window.location.href = "modulo5.html";
}

// Inicializar progreso
actualizarProgreso();