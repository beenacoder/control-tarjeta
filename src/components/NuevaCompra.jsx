import { useState } from "react";

export default function NuevaCompra({ onAdd }) {
  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    cuotas: "",
    fechaCompra: "",
  });

  function submit() {
    if (!form.descripcion) return;

    onAdd({
      ...form,
      id: crypto.randomUUID(),
      monto: Number(form.monto),
      cuotas: Number(form.cuotas),
    });

    setForm({
      descripcion: "",
      monto: "",
      cuotas: "",
      fechaCompra: "",
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-2">Nueva compra</h3>

      {["descripcion", "monto", "cuotas", "fechaCompra"].map(f => (
        <input
          key={f}
          type={f === "fechaCompra" ? "date" : "text"}
          placeholder={f}
          value={form[f]}
          onChange={e =>
            setForm({ ...form, [f]: e.target.value })
          }
          className="w-full border rounded p-2 mb-2"
        />
      ))}

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white rounded py-2"
      >
        Agregar
      </button>
    </div>
  );
}
