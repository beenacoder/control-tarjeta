export function obtenerMesInicial(fechaCompra) {
  const fecha = new Date(fechaCompra);
  const dia = fecha.getDate();

  if (dia > 28) {
    fecha.setMonth(fecha.getMonth() + 1);
  }

  fecha.setDate(1); // normalizamos
  return fecha;
}
