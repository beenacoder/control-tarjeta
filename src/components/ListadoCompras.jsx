export default function ListadoCompras({ compras, onEliminar, onEditar }) {
  if (compras.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-6 text-center text-slate-400 mb-4">
        No hay compras cargadas
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-semibold text-slate-800">Compras cargadas</h3>
        <span className="text-xs text-slate-400">
          {compras.length} {compras.length === 1 ? "compra" : "compras"}
        </span>
      </div>

      <div className="space-y-2">
        {compras.map(c => {
          const cuotasRestantes = c.cuotas - c.cuotaActual + 1;
          const fecha = c.fechaCompra
            ? new Date(`${c.fechaCompra}T12:00:00`)
            : null;

          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 truncate">
                    {c.descripcion}
                  </div>

                  {fecha && (
                    <div className="text-xs text-slate-400 mt-1">
                      {fecha.toLocaleDateString("es-AR")}
                    </div>
                  )}
                </div>

                <div className="font-bold text-slate-900 whitespace-nowrap">
                  ${c.monto.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="bg-violet-50 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    Cuota {c.cuotaActual} de {c.cuotas}
                  </span>

                  <span className="text-xs text-slate-400">
                    {cuotasRestantes === 1
                      ? "Última cuota"
                      : `${cuotasRestantes} restantes`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEditar(c)}
                    className="text-sm text-violet-600 hover:text-violet-800 font-medium"
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
    </div>
  );
}