const datosPersonas = JSON.parse(`[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis",
"publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica",
"publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central",
"publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,
"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,
"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,
"asesinatos":1}]`);

let siguienteId = datosPersonas.map(p => p.id).reduce((max, curr) => {
    return Math.max(max, curr);
})

const getId = () => ++siguienteId;

let personas = datosPersonas.map((p) => {
    let nuevaPersona;
    
    try {
        if (p.alterego) {
            nuevaPersona = new Heroe(p.id, p.nombre, p.apellido, p.edad, p.alterego, p.ciudad, p.publicado);
        } else {
            nuevaPersona = new Villano(p.id, p.nombre, p.apellido, p.edad, p.enemigo, p.robos, p.asesinatos);
        }
    } catch(err) {
        console.log(err.message);
        return null;
    }
    
    return nuevaPersona;
});

const cargarCheckboxes = (contenedor, datos) => {
    datos.forEach(dato => {
        const label = document.createElement('label');
        label.innerHTML = dato;
        label.className = "checkboxContainer";

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = dato;
        checkbox.className = "checkboxes";
        checkbox.checked = true;

        checkbox.addEventListener('change', (e) => {
            const columnas = [];
            for (item of document.getElementsByClassName("checkboxes")) {
                if(item.checked) {
                    columnas.push(item.id);
                }
            }
            cargarTabla(tabla, columnas, personas);
        });

        label.appendChild(checkbox);
        contenedor.appendChild(label);
    });
};

const cargarTabla = (tabla, columnas, datos) => {
    tabla.innerHTML = "";
    const primerFila = document.createElement("tr");
    columnas.forEach((c, i) => {
                    const celda = primerFila.insertCell(i);
                    celda.innerHTML = c;
                    celda.addEventListener("click", (e) => {
                        datosOrdenados = datos.sort((a, b) => {
                            if(!isNaN(a[c]) && !isNaN(b[c])) {
                                return a[c] - b[c];
                            } else if(typeof a[c] === "string") {
                                return a[c].localeCompare(b[c]);
                            }
                        });
                        cargarTabla(tabla, columnas, datosOrdenados);
                    })
                });
    tabla.appendChild(primerFila);
    datos.forEach((dato) => {
        if (!dato) {
            return;
        }
        
        const fila = document.createElement("tr");
        fila.id = dato.id;
        
        columnas.forEach((c, i) => {
            const celda = fila.insertCell(i);
            celda.innerHTML = dato[c] === undefined ? "--" : dato[c];
        });
        
        fila.addEventListener("dblclick", (e) => {
            const persona = personas.find(p => p.id == fila.id);
            cargarABM(persona);
        });
        
        tabla.appendChild(fila);
    });
}

const cargarABM = (persona) => {
    const formDatos = document.getElementById("FormDatos");
    formDatos.style.display = "none";
    const formABM = document.getElementById("FormABM");
    formABM.style.display = "block";
    const camposExtra = document.getElementById("camposExtra");
    const botonesABM = document.getElementById("botonesABM");
    cargarCamposHeroe(camposExtra);

    if (!persona) {
        document.getElementById("selectTipoContainer").style.display = "block";
        const selectTipo = document.getElementById("selectTipo");
        selectTipo.addEventListener("change", (e) => {
            if (selectTipo.value === "Heroe") {
                cargarCamposHeroe(camposExtra);
            } else {
                cargarCamposVillano(camposExtra);
            }
        });
        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Agregar";
        botonAgregar.addEventListener("click", (e) => {
            e.preventDefault();
            agregarPersona();
        });
        botonesABM.appendChild(botonAgregar);
    }

    if (persona) {
        const idPersona = document.getElementById("idPersona");
        idPersona.value = persona.id;
        document.getElementById("nombreInput").value = persona.nombre;
        document.getElementById("apellidoInput").value = persona.apellido;
        document.getElementById("edadInput").value = persona.edad;
        if (persona instanceof Heroe) {
            cargarCamposHeroe(camposExtra, persona);
        }
        if (persona instanceof Villano) {
            cargarCamposVillano(camposExtra, persona);
        }

        const botonModificar = document.createElement("button");
        botonModificar.textContent = "Modificar";
        botonModificar.addEventListener("click", (e) => {
            e.preventDefault();
            modificarPersona();
        });
        botonesABM.appendChild(botonModificar);

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", (e) => {
            e.preventDefault();
            eliminarPersona();
        });
        botonesABM.appendChild(botonEliminar);
    }

    const botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar";
    botonCancelar.addEventListener("click", cerrarABM);
    botonesABM.appendChild(botonCancelar);
}

const cargarCamposHeroe = (contenedor, heroe) => {
    console.log(heroe)
    contenedor.innerHTML = "";
    const labelAlterego = document.createElement("label");
    labelAlterego.innerHTML = "Alterego";
    const inputAlterego = document.createElement("input");
    inputAlterego.type = "text";
    inputAlterego.className = "inputABM";
    inputAlterego.placeHolder = "Shiberus";
    inputAlterego.id = "alteregoInput";

    const labelCiudad = document.createElement("label");
    labelCiudad.innerHTML = "Ciudad";
    const inputCiudad = document.createElement("input");
    inputCiudad.type = "text";
    inputCiudad.className = "inputABM";
    inputCiudad.placeHolder = "Ciudad Autonoma de Buenos Aires";
    inputCiudad.id = "ciudadInput";

    const labelPublicado = document.createElement("label");
    labelPublicado.innerHTML = "Anio de publicacion";
    const inputPublicado = document.createElement("input");
    inputPublicado.type = "number";
    inputPublicado.className = "inputABM";
    inputPublicado.placeHolder = "1998";
    inputPublicado.id = "publicadoInput";

    if (heroe) {
        inputAlterego.value = heroe.alterego;
        inputCiudad.value = heroe.ciudad;
        inputPublicado.value = heroe.publicado;
    }

    contenedor.appendChild(labelAlterego);
    contenedor.appendChild(inputAlterego);
    contenedor.appendChild(labelCiudad);
    contenedor.appendChild(inputCiudad);
    contenedor.appendChild(labelPublicado);
    contenedor.appendChild(inputPublicado);
}

const cargarCamposVillano = (contenedor, villano = null) => {
    contenedor.innerHTML = "";
    const labelEnemigo = document.createElement("label");
    labelEnemigo.innerHTML = "Enemigo";
    const inputEnemigo = document.createElement("input");
    inputEnemigo.type = "text";
    inputEnemigo.className = "inputABM";
    inputEnemigo.placeHolder = "CSS";
    inputEnemigo.id = "enemigoInput";

    const labelRobos = document.createElement("label");
    labelRobos.innerHTML = "Robos";
    const inputRobos = document.createElement("input");
    inputRobos.type = "number";
    inputRobos.className = "inputABM";
    inputRobos.placeHolder = "132";
    inputRobos.id = "robosInput";

    const labelAsesinatos = document.createElement("label");
    labelAsesinatos.innerHTML = "Asesinatos";
    const inputAsesinatos = document.createElement("input");
    inputAsesinatos.type = "number";
    inputAsesinatos.className = "inputABM";
    inputAsesinatos.placeHolder = "3";
    inputAsesinatos.id = "asesinatosInput";

    if (villano) {
        inputEnemigo.value = villano.enemigo;
        inputRobos.value = villano.robos;
        inputAsesinatos.value = villano.asesinatos;
    }

    contenedor.appendChild(labelEnemigo);
    contenedor.appendChild(inputEnemigo);
    contenedor.appendChild(labelRobos);
    contenedor.appendChild(inputRobos);
    contenedor.appendChild(labelAsesinatos);
    contenedor.appendChild(inputAsesinatos);
}

const cerrarABM = () => {
    document.getElementById("FormABM").style.display = "none";
    document.getElementById("botonesABM").innerHTML = "";
    document.getElementById("FormDatos").style.display = "block";
}

const agregarPersona = () => {
    const rol = document.getElementById("selectTipo").value;
    const nombre = document.getElementById("nombreInput").value;
    const apellido = document.getElementById("apellidoInput").value;
    const edad = document.getElementById("edadInput").value;
    
    if (rol === "Heroe") {
        const alterego = document.getElementById("alteregoInput").value;
        const ciudad = document.getElementById("ciudadInput").value;
        const publicado = document.getElementById("publicadoInput").value;
        console.log(alterego)
        let heroe;
        
        try {
            heroe = new Heroe(getId(), nombre, apellido, edad, alterego, ciudad, publicado);
        } catch(err) {
            alert(err.message);
            return null;
        }
        
        personas.push(heroe);
        cerrarABM();
        cargarTabla(tabla, columnas, personas);
    }
    
    if (rol === "villano") {
        const enemigo = document.getElementById("enemigoInput").value;
        const robos = document.getElementById("robosInput").value;
        const asesinatos = document.getElementById("asesinatosInput").value;
        let villano;
        
        try {
            villano = new Villano(getId(), nombre, apellido, edad, enemigo, robos, asesinatos);
        } catch(err) {
            alert(err.message);
            return null;
        }

        personas.push(villano);
        cerrarABM();
        cargarTabla(tabla, columnas, personas);
    }
}

const modificarPersona = () => {
    const idInput = document.getElementById("idPersona");
    const persona = personas.find((p) => p.id == idInput.value);
    const rol = persona instanceof Heroe ? "Heroe" : "Villano";
    const nombre = document.getElementById("nombreInput").value;
    const apellido = document.getElementById("apellidoInput").value;
    const edad = document.getElementById("edadInput").value;
    
    
    if (rol === "Heroe") {
        const alterego = document.getElementById("alteregoInput").value;
        const ciudad = document.getElementById("ciudadInput").value;
        const publicado = document.getElementById("publicadoInput").value;
        let heroe;
        
        try {
            heroe = new Heroe(1, nombre, apellido, edad, alterego, ciudad, publicado);
        } catch(err) {
            alert(err.message);
            return null;
        }

        heroe = persona;
        idInput.value = "";
        heroe.nombre = nombre;
        heroe.apellido = apellido;
        heroe.edad = edad;
        heroe.alterego = alterego;
        heroe.ciudad = ciudad;
        heroe.publicado = publicado;
        
        cerrarABM();
        cargarTabla(tabla, columnas, personas);
    }
    
    if (rol === "Villano") {
        const enemigo = document.getElementById("enemigoInput").value;
        const robos = document.getElementById("robosInput").value;
        const asesinatos = document.getElementById("asesinatosInput").value;
        let villano;
        
        try {
            villano = new Villano(1, nombre, apellido, edad, enemigo, robos, asesinatos);
        } catch(err) {
            alert(err.message);
            return null;
        }

        villano = persona;
        idInput.value = "";
        villano.nombre = nombre;
        villano.apellido = apellido;
        villano.edad = edad;
        villano.enemigo = enemigo;
        villano.robos = robos;
        villano.asesinatos = asesinatos;

        cerrarABM();
        cargarTabla(tabla, columnas, personas);
    }
}

const eliminarPersona = () => {
    const idInput = document.getElementById("idPersona");
    personas = personas.filter(p => Number(p.id) !== Number(idInput.value));
    cerrarABM();
    cargarTabla(tabla, columnas, personas);
}

const columnas = ["id", "nombre", "apellido", "edad", "alterego", "ciudad", "publicado", "enemigo", "robos", "asesinatos"];
const tabla = document.getElementById("TablaDatos");
cargarTabla(tabla, columnas, personas);

const checkboxes = document.getElementById("CheckBoxes");
cargarCheckboxes(checkboxes, columnas);

const selectFiltro = document.getElementById("selectFiltro");
selectFiltro.addEventListener("change", (e) => {
    let datosFiltrados = [];

    switch (selectFiltro.value) {
        case "Todos":
            datosFiltrados = personas;
            break;
        case "Heroes":
            datosFiltrados = personas.filter(p => p instanceof Heroe);
            break;
        case "Villanos":
            datosFiltrados = personas.filter(p => p instanceof Villano);
            break;
        default:
            break;
    }
    cargarTabla(tabla, columnas, datosFiltrados);
});

document.getElementById("buttonAgregar").addEventListener("click",(e) => {
    e.preventDefault();
    cargarABM();
})