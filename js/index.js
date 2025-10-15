let puntuacion = 0;
const maxPuntos = 100;

function verificarEjercicio1() {
    const respuesta = document.querySelector('input[name="ejercicio1"]:checked');
    const resultado = document.getElementById('resultado1');
    
    if (!respuesta) {
        resultado.textContent = '⚠️ Por favor selecciona una opción';
        resultado.className = 'resultado error';
        resultado.style.display = 'block';
        return;
    }

    if (respuesta.value === 'b') {
        resultado.innerHTML = '✅ ¡Correcto! La investigación es un proceso sistemático, metódico y riguroso. <strong>+25 puntos</strong>';
        resultado.className = 'resultado success';
        puntuacion += 25;
    } else {
        resultado.innerHTML = '❌ Incorrecto. La investigación es un proceso sistemático, metódico y riguroso de búsqueda y análisis de información.';
        resultado.className = 'resultado error';
    }
    
    resultado.style.display = 'block';
    actualizarProgreso();
}

function verificarEjercicio2() {
    const respuesta = document.querySelector('input[name="ejercicio2"]:checked');
    const resultado = document.getElementById('resultado2');
    
    if (!respuesta) {
        resultado.textContent = '⚠️ Por favor selecciona una opción';
        resultado.className = 'resultado error';
        resultado.style.display = 'block';
        return;
    }

    if (respuesta.value === 'b') {
        resultado.innerHTML = '✅ ¡Correcto! En Scrum, la investigación basada en datos es fundamental para mejorar. <strong>+25 puntos</strong>';
        resultado.className = 'resultado success';
        puntuacion += 25;
    } else {
        resultado.innerHTML = '❌ Incorrecto. La solución correcta es investigar sistemáticamente las causas con datos y comunicación.';
        resultado.className = 'resultado error';
    }
    
    resultado.style.display = 'block';
    actualizarProgreso();
}

function verificarEjercicio3() {
    const respuesta = document.querySelector('input[name="ejercicio3"]:checked');
    const resultado = document.getElementById('resultado3');
    
    if (!respuesta) {
        resultado.textContent = '⚠️ Por favor selecciona una opción';
        resultado.className = 'resultado error';
        resultado.style.display = 'block';
        return;
    }

    if (respuesta.value === 'b') {
        resultado.innerHTML = '✅ ¡Correcto! Esta es una investigación explicativa porque buscas entender las causas. <strong>+25 puntos</strong>';
        resultado.className = 'resultado success';
        puntuacion += 25;
    } else {
        resultado.innerHTML = '❌ Incorrecto. Cuando buscas entender POR QUÉ ocurre algo, es investigación explicativa.';
        resultado.className = 'resultado error';
    }
    
    resultado.style.display = 'block';
    actualizarProgreso();
}

function actualizarProgreso() {
    const porcentaje = Math.min(puntuacion, maxPuntos);
    document.getElementById('progressFill').style.width = porcentaje + '%';
    document.getElementById('progressText').textContent = porcentaje + '%';
    document.getElementById('puntos').textContent = puntuacion + '/' + maxPuntos;
}

function reiniciarModulo() {
    puntuacion = 0;
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    document.querySelectorAll('.resultado').forEach(div => {
        div.style.display = 'none';
    });
    actualizarProgreso();
}

function completarModulo() {
    if (puntuacion >= 50) {
        alert('🎉 ¡Felicidades! Has completado el Módulo 1 con ' + puntuacion + ' puntos.\n\n¡Continúa con el Módulo 2: Tema e idea de investigación!');
    } else {
        alert('⚠️ Para completar el módulo necesitas al menos 50 puntos. Actualmente tienes ' + puntuacion + ' puntos.\n\nCompleta los ejercicios para avanzar.');
    }
}
function modulo_2() {
  window.location.href = "modulo2.html";
}

// Inicializar progreso
actualizarProgreso();