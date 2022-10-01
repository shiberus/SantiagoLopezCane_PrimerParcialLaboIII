class Persona {
    constructor(id, nombre, apellido, edad) {
        if (!id || !nombre || !apellido || !edad ) {
            throw new Error("Datos obligatorios (id, nombre, apellido, edad)");
        }
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
}

class Heroe extends Persona {
    constructor(id, nombre, apellido, edad, alterego, ciudad, publicado) {
        if (!alterego || !ciudad || !publicado) {
            throw new Error("Faltan argumentos (id, nombre, apellido, edad, alterego, ciudad, publicado)");
        }
        if (isNaN(publicado) || publicado < 1940) {
            console.log(publicado);
            throw new Error("La fecha de publicacion no puede ser anterior a 1940");
        }
        super(id, nombre, apellido, edad);
        this.alterego = alterego;
        this.ciudad = ciudad;
        this.publicado = publicado;
    }
}

class Villano extends Persona {
    constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
        if (!enemigo || !robos || !asesinatos) {
            throw new Error("Faltan argumentos (id, nombre, apellido, edad, enemigo, robos, asesinatos)");
        }
        if (isNaN(robos) || robos < 1) {
            throw new Error("Si no le robo a nadie, no es villano");
        }
        if (isNaN(asesinatos) || asesinatos < 1) {
            throw new Error("Si no mato a nadie, no es villano");
        }
        super(id, nombre, apellido, edad);
        this.enemigo = enemigo;
        this.robos = robos;
        this.asesinatos = asesinatos;
    }
}