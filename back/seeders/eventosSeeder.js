const Evento = require('../models/eventos');

module.exports = async () => {
    const eventos = [
        { nombre: "No te va a gustar", fechaEvento: "2024-06-08", precio: 45000.0, establecimiento: "Plaza de la música" },
        { nombre: "Q lokura", fechaEvento: "2024-06-22", precio: 4000.0, establecimiento: "Plaza de la música" },
        { nombre: "Bresh", fechaEvento: "2024-07-19", precio: 15000.0, establecimiento: "Plaza de la música" },
        { nombre: "Miranda", fechaEvento: "2024-07-20", precio: 40000.0, establecimiento: "Quality" },
        { nombre: "Talleres - Instituto", fechaEvento: "2024-08-04", precio: 9000.0, establecimiento: "Kempes" },
        { nombre: "Hernan Cattaneo", fechaEvento: "2024-06-16", precio: 60000.0, establecimiento: "Forja" },
        { nombre: "Club reggaeton", fechaEvento: "2024-07-27", precio: 4000.0, establecimiento: "Quality" },
        { nombre: "Reggaetold", fechaEvento: "2024-07-15", precio: 6000.0, establecimiento: "Quality" },
        { nombre: "Club reggaeton", fechaEvento: "2024-07-13", precio: 3000.0, establecimiento: "Studio theater" },
        { nombre: "Peña", fechaEvento: "2024-07-20", precio: 3500.0, establecimiento: "Comedor universitario" },
        { nombre: "Fiesta U", fechaEvento: "2024-08-02", precio: 4500.0, establecimiento: "Comedor universitario" },
        { nombre: "La renga", fechaEvento: "2024-06-22", precio: 15000.0, establecimiento: "Kempes" },
        { nombre: "Luis Miguel", fechaEvento: "2024-08-17", precio: 120000.0, establecimiento: "Orfeo superdomo" },
        { nombre: "Martix Garrix", fechaEvento: "2024-08-24", precio: 110000.0, establecimiento: "La fábrica" },
        { nombre: "La Champion Liga", fechaEvento: "2024-08-10", precio: 5000.0, establecimiento: "Palacio Alsina" },
        { nombre: "Bad Bunny", fechaEvento: "2024-09-21", precio: 80000.0, establecimiento: "Kempes" },
        { nombre: "Intoxicados", fechaEvento: "2024-09-14", precio: 20000.0, establecimiento: "Forja" },
        { nombre: "Alejandro Sanz", fechaEvento: "2024-09-06", precio: 30000.0, establecimiento: "Orfeo superdomo" },
        { nombre: "Marshmello", fechaEvento: "2024-10-05", precio: 180000.0, establecimiento: "La fábrica" },
        { nombre: "La Limbo", fechaEvento: "2024-08-23", precio: 3500.0, establecimiento: "Studio theater" },
        { nombre: "Duki", fechaEvento: "2024-09-29", precio: 50000.0, establecimiento: "Forja" },
        { nombre: "Talleres vs Belgrano", fechaEvento: "2024-10-06", precio: 12000.0, establecimiento: "Kempes" },
        { nombre: "Shakira", fechaEvento: "2024-10-07", precio: 80000.0, establecimiento: "Orfeo superdomo" }
    ];

    await Evento.bulkCreate(eventos);
};
