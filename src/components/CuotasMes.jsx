export default function CuotasMes({ cuotas }) {
  if (!cuotas.length)
    return (
      <p className="text-center text-gray-400 mb-4">
        No hay cuotas este mes
      </p>
    );

  return (
    <div className="space-y-2 mb-4">
      {cuotas.map((c, i) => (
        <div
          key={i}
          className="bg-white p-3 rounded-lg shadow flex justify-between"
        >
          <div>
            <div className="font-medium">{c.descripcion}</div>
            <div className="text-sm text-gray-500">
              Cuota {c.nro}/{c.total}
            </div>
          </div>
          <div className="font-semibold">
            ${c.monto.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
