// Require
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];
console.log("Comando: ", comando);

switch (comando) {
    case 'crear':
        console.log("Creando tarea ..".green);
        let tarea = porHacer.crear(argv.descripcion);
        console.log("Tarea: ", tarea);
        break;
    case 'listar':
        console.log("Lista tareas".green);
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('========Tarea========='.green);
            console.log(`Descripción: ${tarea.descripcion}`);
            console.log(`Estado: ${tarea.completado}`);
            console.log('========================'.green);
        }
        break;
    case 'actualizar':
        console.log("Actualizando");
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        console.log("Borrando ..");
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log("Comando no reconocido");
}