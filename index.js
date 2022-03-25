//CREATE DATABASE always_music
// \c always_music

//1. Realizar la conexión con PostgreSQL con la clase Client.
const {Client} = require('pg');
const argv = process.argv.slice(2);

let tipoConsulta = argv[0]
let arg1 = argv[1]
let arg2 = argv[2]
let arg3 = argv[3]
let arg4 = argv[4]


const config = {
user: 'postgres',
host: 'localhost',
database: 'always_music',
password: 'raby1949',
port: 5432,
}
const client = new Client(config);

client.connect()

//2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
if (tipoConsulta == 'registrar'){
const registrar = async ()=>{
    const res = await client.query(`insert into estudiantes(nombre, rut, curso, nivel) values('${arg1}', '${arg2}', '${arg3}', ${arg4}) RETURNING *;`);
    console.log(`Estudiante ${arg1} agregado con exito`);
    client.end();

}
registrar();
}

//3. Crear una función asíncrona para obtener por consola el registro de un estudiante
//por medio de su rut.


if (tipoConsulta == 'rut'){
    const consultaPorRut = async ()=>{
        const res = await client.query(`select * from estudiantes where rut='${arg1}'`);
        console.log(res.rows);
        client.end();
    
    }
    consultaPorRut();
    }


//   4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.

if (tipoConsulta == 'estudiantes'){
    const totalEstudiantes = async ()=>{
        const res = await client.query(`select * from estudiantes`);
        console.log(res.rows);
        client.end();
    
    }
    totalEstudiantes();
    }

//5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.

if (tipoConsulta == 'editar'){
    const editarEstadiantes = async ()=>{
        const res = await client.query(`update estudiantes set rut='${arg2}', curso='${arg3}', nivel=${arg4} where nombre='${arg1}' RETURNING *;`);
        console.log(`Estudiante ${arg1} editado con exito`);
        client.end();
    
    }
    editarEstadiantes();
    }


//6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.

if (tipoConsulta == 'eliminar'){
    const eliminarEstudiantes= async ()=>{
        const res = await client.query(`delete from estudiantes where rut='${arg1}'`);
        console.log(`Registro de estudiante con rut ${arg1} eliminado con exito`);
        client.end();
    }
eliminarEstudiantes();
}

    


    
