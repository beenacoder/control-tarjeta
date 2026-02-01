import { calcularCierreTarjeta } from "./fechasTarjeta";

export default function generarCuotas(compra, config) {
  const cuotas = [];

  const { mesPrimerPago, mesResumen, fechaCierre } = calcularCierreTarjeta(
    compra.fechaCompra,
    config.diaCierre
  );


  console.log("DEBUG CIERRE", {
    fechaCompra: compra.fechaCompra,
    fechaCierre,
    mesResumen: mesResumen.toLocaleDateString(),
    mesPrimerPago: mesPrimerPago.toLocaleDateString(),
  });
  let mes = mesPrimerPago.getMonth();
  let anio = mesPrimerPago.getFullYear();

  // ajustar por cuota actual (ej: 3/12)
  mes += compra.cuotaActual - 1;
  while (mes > 11) {
    mes -= 12;
    anio += 1;
  }

  for (let nro = compra.cuotaActual; nro <= compra.cuotas; nro++) {
    const fecha = new Date(anio, mes + (nro - compra.cuotaActual), 1);

    cuotas.push({
      id: `${compra.id}-${nro}`,
      compraId: compra.id,
      descripcion: compra.descripcion,
      nro,
      total: compra.cuotas,
      monto: compra.monto,
      mes: fecha.getMonth(),
      anio: fecha.getFullYear(),
      pagada: false,
    });
  }

  return cuotas;
}
