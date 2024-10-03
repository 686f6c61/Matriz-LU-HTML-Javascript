// Función que realiza la descomposición LU con explicaciones paso a paso
function descomposicionLU() {
    // Obtenemos el tamaño de la matriz ingresado por el usuario
    let m = parseInt(document.getElementById("tamano").value);

    // Inicializamos matrices vacías para L, U y la matriz original
    let matriz = [];
    let u = [];
    let l = [];
    
    // Limpiar cualquier contenido anterior de la sección de resultados
    document.getElementById("resultado").innerHTML = "";

    // Rellenar la matriz original con los valores proporcionados por el usuario
    for (let r = 0; r < m; r++) {
        matriz[r] = [];
        u[r] = [];
        l[r] = [];
        for (let c = 0; c < m; c++) {
            // Obtenemos el valor del input y lo convertimos en número flotante
            let valor = parseFloat(document.getElementById("a" + r + c).value);
            matriz[r][c] = valor; // Asignamos el valor a la matriz original
            u[r][c] = valor;      // Inicialmente U es igual a la matriz original
            l[r][c] = 0;          // L inicia con ceros
        }
    }

    // Proceso de eliminación gaussiana para descomponer en L y U
    for (let k = 0; k < m; k++) {
        // Mostrar paso actual
        document.getElementById("resultado").innerHTML += `<h5>Paso ${k + 1}: Eliminar elementos debajo de la columna ${k + 1}</h5>`;
        document.getElementById("resultado").innerHTML += `<p>Hacemos ceros debajo del elemento en la posición [${k + 1},${k + 1}] en la matriz U. Usamos esos valores para calcular los factores en la matriz L.</p>`;
        
        for (let r = 0; r < m; r++) {
            if (k === r) {
                // La diagonal de L debe ser 1
                l[k][r] = 1;
            }
            if (k < r) {
                // Calcular el factor para hacer ceros debajo de la diagonal
                let factor = matriz[r][k] / matriz[k][k];
                l[r][k] = factor;  // Guardamos el factor en la matriz L
                document.getElementById("resultado").innerHTML += `<p>Factor en L[${r + 1},${k + 1}] = ${factor.toFixed(2)}</p>`;
                
                // Actualizar la matriz U restando el factor
                for (let c = 0; c < m; c++) {
                    matriz[r][c] = matriz[r][c] - factor * matriz[k][c];
                    u[r][c] = matriz[r][c];  // Actualizar U
                }
            }
        }
        // Mostrar las matrices L y U después de cada paso
        mostrarMatriz("Matriz L después del Paso " + (k + 1), l);
        mostrarMatriz("Matriz U después del Paso " + (k + 1), u);
    }
}

// Función para mostrar las matrices L y U en la interfaz
function mostrarMatriz(nombre, matriz) {
    let m = matriz.length;
    let resultado = `<h6>${nombre}</h6><table>`;
    
    // Crear filas y columnas de la matriz
    for (let r = 0; r < m; r++) {
        resultado += "<tr>";
        for (let c = 0; c < m; c++) {
            resultado += `<td>${matriz[r][c].toFixed(2)}</td>`;
        }
        resultado += "</tr>";
    }
    resultado += "</table>";
    
    // Mostrar las matrices L y U
    document.getElementById("resultado").innerHTML += resultado;
}

// Función para generar los inputs dinámicamente basados en el tamaño de la matriz
function generarInputs() {
    let m = parseInt(document.getElementById("tamano").value);  // Obtener tamaño de la matriz
    let inputs = "<h5>Introduce los elementos de la matriz</h5><table>";
    
    // Crear inputs para cada elemento de la matriz
    for (let r = 0; r < m; r++) {
        inputs += "<tr>";
        for (let c = 0; c < m; c++) {
            inputs += `<td><input type='number' id='a${r}${c}' step='any' placeholder='a[${r + 1},${c + 1}]'></td>`;
        }
        inputs += "</tr>";
    }
    inputs += "</table>";
    
    // Agregar botón para realizar la descomposición LU
    inputs += "<button class='btn' onclick='descomposicionLU()'>Calcular Descomposición LU</button>";
    
    // Mostrar los inputs generados
    document.getElementById("inputsMatriz").innerHTML = inputs;
}
