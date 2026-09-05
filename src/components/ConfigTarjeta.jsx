import { useEffect, useState } from "react";

export default function ConfigTarjeta({ config, onSave }) {
  const [form, setForm] = useState(config);

  useEffect(() => {
    setForm(config);
  }, [config]);

  function guardar() {
    const diaCierre = Number(form.diaCierre);
    const diaVencimiento = Number(form.diaVencimiento);

    if (
      diaCierre < 1 ||
      diaCierre > 31 ||
      diaVencimiento < 1 ||
      diaVencimiento > 31
    ) {
      alert("Los días deben estar entre 1 y 31");
      return;
    }

    onSave({
      diaCierre,
      diaVencimiento,
    });
  }

  const inputClass =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition";

  return (
    <div className="pb-2">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-violet-500 font-semibold">
          Tarjeta
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-1">
          Configuración
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Definí las fechas que usa tu tarjeta para calcular los resúmenes.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Día de cierre
          </label>

          <input
            type="number"
            min="1"
            max="31"
            value={form.diaCierre}
            onChange={e =>
              setForm({
                ...form,
                diaCierre: e.target.value,
              })
            }
            className={inputClass}
          />

          <p className="text-xs text-slate-400 mt-1.5">
            Las compras posteriores a este día pasan al siguiente resumen.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Día de vencimiento
          </label>

          <input
            type="number"
            min="1"
            max="31"
            value={form.diaVencimiento}
            onChange={e =>
              setForm({
                ...form,
                diaVencimiento: e.target.value,
              })
            }
            className={inputClass}
          />
        </div>

        <button
          onClick={guardar}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 font-semibold shadow-sm transition mt-2"
        >
          Guardar configuración
        </button>
      </div>
    </div>
  );
}