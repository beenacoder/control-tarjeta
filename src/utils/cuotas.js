export default function generarCuotas(compra) {
  const cuotas = [];
  const montoCuota = compra.monto / compra.cuotas;
  const fecha = new Date(compra.fechaCompra);

  for (let i = 0; i < compra.cuotas; i++) {
    const f = new Date(fecha);
    f.setMonth(f.getMonth() + i);

    cuotas.push({
      compraId: compra.id,
      descripcion: compra.descripcion,
      nro: i + 1,
      total: compra.cuotas,
      monto: montoCuota,
      mes: f.getMonth(),
      anio: f.getFullYear(),
    });
  }

  return cuotas;
}
