import { useEffect, useState } from "react";

export default function NuevaCompra({ onAdd, compraEditando, onEdit }) {
  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    cuotas: "",
    cuotaActual: "1",
    fechaCompra: "",
  });

  useEffect(() => {
    if (compraEditando) {
      setForm({
        descripcion: compraEditando.descripcion,
        monto: compraEditando.monto,
        cuotas: compraEditando.cuotas,
        cuotaActual: compraEditando.cuotaActual,
        fechaCompra: compraEditando.fechaCompra,
      });
    } else {
      setForm({
        descripcion: "",
        monto: "",
        cuotas: "",
        cuotaActual: "1",
        fechaCompra: "",
      });
    }
  }, [compraEditando]);

  function limpiarFormulario() {
    setForm({
      descripcion: "",
      monto: "",
      cuotas: "",
      cuotaActual: "1",
      fechaCompra: "",
    });
  }

  function submit() {
    if (!form.descripcion || !form.monto || !form.cuotas || !form.fechaCompra) {
      alert("Completá todos los campos");
      return;
    }

    const cuotas = Number(form.cuotas);
    const cuotaActual = Number(form.cuotaActual);
    const monto = Number(form.monto);

    if (cuotaActual < 1 || cuotaActual > cuotas) {
      alert("La cuota actual debe estar entre 1 y el total de cuotas");
      return;
    }

    const datosCompra = {
      id: compraEditando ? compraEditando.id : crypto.randomUUID(),
      descripcion: form.descripcion.trim(),
      monto,
      cuotas,
      cuotaActual,
      fechaCompra: form.fechaCompra,
    };

    if (compraEditando) {
      onEdit(datosCompra);
    } else {
      onAdd(datosCompra);
    }

    limpiarFormulario();
  }

  const inputClass =
    "w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition";

  return (
    <div className="pb-2">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-violet-500 font-semibold">
          {compraEditando ? "Actualizar" : "Nueva"}
        </p>

        <h3 className="text-xl font-bold text-slate-900 mt-1">
          {compraEditando ? "Editar compra" : "Agregar compra"}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {compraEditando
            ? "Modificá los datos que necesites."
            : "Cargá los datos de la compra y sus cuotas."}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Descripción
          </label>

          <input
            type="text"
            placeholder="Ej. Notebook"
            value={form.descripcion}
            onChange={e =>
              setForm({ ...form, descripcion: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Monto por cuota
          </label>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              $
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={form.monto}
              onChange={e =>
                setForm({ ...form, monto: e.target.value })
              }
              className={`${inputClass} pl-7`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Cuota actual
            </label>

            <input
              type="number"
              min="1"
              value={form.cuotaActual}
              onChange={e =>
                setForm({ ...form, cuotaActual: e.target.value })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Total cuotas
            </label>

            <input
              type="number"
              min="1"
              value={form.cuotas}
              onChange={e =>
                setForm({ ...form, cuotas: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Fecha de compra
          </label>

          <input
            type="date"
            value={form.fechaCompra}
            onChange={e =>
              setForm({ ...form, fechaCompra: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 font-semibold shadow-sm transition mt-2"
        >
          {compraEditando ? "Guardar cambios" : "Agregar compra"}
        </button>
      </div>
    </div>
  );
}