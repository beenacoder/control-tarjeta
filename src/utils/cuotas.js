export default function generarCuotas(compra) {
  const cuotas = [];

  const montoCuota = compra.montoTotal / compra.cuotasTotales;
  const fechaBase = new Date(compra.fechaCompra);

  // Ajustamos la fecha a la cuota actual
  fechaBase.setMonth(
    fechaBase.getMonth() + (compra.cuotaActual - 1)
  );

  for (let nro = compra.cuotaActual; nro <= compra.cuotasTotales; nro++) {
    const f = new Date(fechaBase);
    f.setMonth(fechaBase.getMonth() + (nro - compra.cuotaActual));

    cuotas.push({
      id: `${compra.id}-${nro}`, // 👈 id único por cuota
      compraId: compra.id,
      descripcion: compra.descripcion,
      nro,
      total: compra.cuotasTotales,
      monto: montoCuota,
      mes: f.getMonth(),       // 0-11
      anio: f.getFullYear(),
      pagada: false
    });
  }

  return cuotas;
}
