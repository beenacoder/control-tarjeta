export default function ListadoCompras({ compras, onEliminar, onEditar }) {
  if (compras.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-5 text-center text-gray-400 mb-4">
        No hay compras cargadas
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow mb-4 overflow-hidden">
      <div className="px-4 py-3 border-b">
        <h3 className="font-semibold text-slate-800">Compras cargadas</h3>
      </div>

      {compras.map(c => {
        const cuotasRestantes = c.cuotas - c.cuotaActual + 1;
        const fecha = c.fechaCompra
          ? new Date(`${c.fechaCompra}T12:00:00`)
          : null;

        return (
          <div key={c.id} className="px-4 py-4 border-b last:border-b-0">
            <div className="flex justify-between items-start gap-3">
              <div>
                <div className="font-semibold text-slate-800">
                  {c.descripcion}
                </div>

                {fecha && (
                  <div className="text-xs text-gray-400 mt-1">
                    Compra: {fecha.toLocaleDateString("es-AR")}
                  </div>
                )}
              </div>

              <div className="font-semibold text-slate-800 whitespace-nowrap">
                ${c.monto.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="flex justify-between items-end mt-3">
              <div className="text-sm text-gray-500">
                <div>
                  Cuota {c.cuotaActual} de {c.cuotas}
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  {cuotasRestantes === 1
                    ? "Última cuota"
                    : `${cuotasRestantes} cuotas restantes`}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onEditar(c)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>

                <button
                  onClick={() => onEliminar(c.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}