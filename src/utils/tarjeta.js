// export function obtenerCierreYVencimiento(mesVista) {
//   const anio = mesVista.getFullYear();
//   const mes = mesVista.getMonth();

//   const cierre = new Date(anio, mes, 28);
//   const vencimiento = new Date(anio, mes + 1, 10);

//   return { cierre, vencimiento };
// }


export function obtenerCierreYVencimiento(
  mesVista,
  diaCierre,
  diaVencimiento
) {
  const anio = mesVista.getFullYear();
  const mes = mesVista.getMonth();

  const cierre = new Date(anio, mes, diaCierre);
  const vencimiento = new Date(anio, mes + 1, diaVencimiento);

  return { cierre, vencimiento };
}
