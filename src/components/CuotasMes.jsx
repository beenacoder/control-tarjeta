export default function CuotasMes({ cuotas }) {
  if (!cuotas.length) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-6 text-center text-gray-400 mb-4">
        No hay cuotas para este mes
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-semibold text-slate-800">Cuotas del mes</h3>
        <span className="text-xs text-slate-400">
          {cuotas.length} {cuotas.length === 1 ? "compra" : "compras"}
        </span>
      </div>

      <div className="space-y-2">
        {cuotas.map(c => {
          const porcentaje = Math.round((c.nro / c.total) * 100);

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

                  <div className="text-sm text-slate-500 mt-1">
                    Cuota {c.nro} de {c.total}
                  </div>
                </div>

                <div className="font-bold text-slate-900 whitespace-nowrap">
                  ${c.monto.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>

              <div className="mt-3">
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full"
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{porcentaje}% pagado</span>
                  <span>{c.total - c.nro} restantes</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}