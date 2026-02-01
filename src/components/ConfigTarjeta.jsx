export default function ConfigTarjeta({ config, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h3 className="font-semibold mb-3">
        ⚙️ Configuración de tarjeta
      </h3>

      <div className="flex gap-3">
        <div className="w-1/2">
          <label className="text-sm text-gray-600">
            Día de cierre
          </label>
          <input
            type="number"
            min="1"
            max="31"
            value={config.diaCierre}
            onChange={e =>
              onChange({
                ...config,
                diaCierre: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div className="w-1/2">
          <label className="text-sm text-gray-600">
            Día de vencimiento
          </label>
          <input
            type="number"
            min="1"
            max="31"
            value={config.diaVencimiento}
            onChange={e =>
              onChange({
                ...config,
                diaVencimiento: Number(e.target.value),
              })
            }
            className="w-full border rounded p-2 mt-1"
          />
        </div>
      </div>
    </div>
  );
}
