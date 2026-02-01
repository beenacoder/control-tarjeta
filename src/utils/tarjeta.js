import { calcularCierreTarjeta } from "../utils/fechasTarjeta";



export function obtenerCierreYVencimiento(
  mesVista,
  diaCierre,
  diaVencimiento
) {
  const anio = mesVista.getFullYear();
  const mes = mesVista.getMonth();

  const cierre = new Date(anio, mes  , diaCierre);
  const vencimiento = new Date(anio, mes, diaVencimiento);

  return { cierre, vencimiento };
}



export function obtenerMesPrimerPago(fechaCompra, diaCierre) {
  return calcularCierreTarjeta(fechaCompra, diaCierre).mesPrimerPago;
}


export function obtenerMesDeResumen(fechaCompra, diaCierre) {
  return calcularCierreTarjeta(fechaCompra, diaCierre).mesResumen;
}

