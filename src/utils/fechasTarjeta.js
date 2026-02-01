// src/utils/fechasTarjeta.js

export function calcularCierreTarjeta(fechaCompra, diaCierre) {
    const [anioCompra, mesCompra, diaCompra] =
        fechaCompra.split("-").map(Number);

    const compra = new Date(
        anioCompra,
        mesCompra - 1,
        diaCompra,
        12
    );

    let anio = compra.getFullYear();
    let mes = compra.getMonth();

    const ultimoDiaMes = new Date(anio, mes + 1, 0).getDate();
    const diaCierreReal = Math.min(diaCierre, ultimoDiaMes);

    const fechaCierre = new Date(
        anio,
        mes,
        diaCierreReal,
        23, 59, 59
    );

    if (compra > fechaCierre) {
        mes += 1;
        if (mes > 11) {
            mes = 0;
            anio += 1;
        }
    }

    return {
        mesResumen: new Date(anio, mes, 1),
        mesPrimerPago: new Date(anio, mes + 1, 1),
        fechaCierre,
        diaCierreReal,
    };
}
