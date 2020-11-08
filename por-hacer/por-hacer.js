const fs = require('fs');




let listadoPorHacer = [];


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('Ocurrió un error guardando el archivo', err)
        }
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let encontrada = listadoPorHacer.find(tarea => tarea.descripcion === descripcion);
    if (!encontrada) {
        return false;
    } else {
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    //Otra forma de retornar o comparar si si borro o no borro
    /*
    if (nuevoListado.lenght === listadoPorHacer.lenght){
        //No se borro
        return false
    }
    */
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}