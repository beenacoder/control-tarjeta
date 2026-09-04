export default function ConfigTarjeta({ config, onChange }) {
  return (
    <div className="pb-2" >
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Configuración de tarjeta
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
    </div >
  );
}
