export const generarId  = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
}

export const formatearFecha = (fecha) => {
    const newFecha = new Date(fecha);

    const options = {
       year: 'numeric',
       month: 'long',
       day: '2-digit',
    }

    return newFecha.toLocaleDateString('es-ES', options);
}