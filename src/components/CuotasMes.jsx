export default function CuotasMes({ cuotas }) {
  if (!cuotas.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400 mb-4">
        No hay cuotas para este mes
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow mb-4 overflow-hidden">
      <div className="px-4 py-3 border-b">
        <h3 className="font-semibold text-slate-800">Cuotas del mes</h3>
      </div>

      {cuotas.map(c => (
        <div
          key={c.id}
          className="px-4 py-3 border-b last:border-b-0 flex justify-between items-center"
        >
          <div>
            <div className="font-medium text-slate-800">
              {c.descripcion}
            </div>

            <div className="text-sm text-gray-500 mt-1">
              Cuota {c.nro} de {c.total}
            </div>
          </div>

          <div className="text-right">
            <div className="font-semibold text-slate-800">
              ${c.monto.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            {/* <button
              onClick={() => onEliminar(c.compraId)}
              className="text-xs text-gray-400 hover:text-red-500 mt-1"
            >
              Eliminar compra
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}