export default function ListadoCompras({ compras, onEliminar }) {
    if (compras.length === 0) {
        return (
            <div className="text-center text-gray-500 mb-4">
                No hay compras cargadas
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow p-4 mb-4">
            <h3 className="font-semibold mb-3">Compras</h3>

            {compras.map(c => (
                <div
                    key={c.id}
                    className="border-b last:border-0 py-2 flex justify-between items-center"
                >
                    <div>
                        <div className="font-medium">{c.descripcion}</div>
                        <div className="text-sm text-gray-500">
                            {c.cuotaActual}/{c.cuotasTotales} · $
                            {c.montoTotal.toFixed(2)}
                        </div>
                    </div>

                    <button
                        onClick={() => onEliminar(c.id)}
                        className="text-red-500 text-sm"
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
}
