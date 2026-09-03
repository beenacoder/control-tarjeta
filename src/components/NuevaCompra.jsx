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
      descripcion: form.descripcion,
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

  return (
    <div className="pb-2">
      <h3 className="font-semibold mb-3">
        {compraEditando ? "Editar compra" : "Nueva compra"}
      </h3>

      <input
        type="text"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={e => setForm({ ...form, descripcion: e.target.value })}
        className="w-full border rounded p-2 mb-2"
      />

      <input
        type="number"
        placeholder="Monto por cuota"
        value={form.monto}
        onChange={e => setForm({ ...form, monto: e.target.value })}
        className="w-full border rounded p-2 mb-2"
      />

      <div className="flex gap-2 mb-2">
        <input
          type="number"
          min="1"
          placeholder="Cuota actual"
          value={form.cuotaActual}
          onChange={e => setForm({ ...form, cuotaActual: e.target.value })}
          className="w-1/2 border rounded p-2"
        />

        <input
          type="number"
          min="1"
          placeholder="Total cuotas"
          value={form.cuotas}
          onChange={e => setForm({ ...form, cuotas: e.target.value })}
          className="w-1/2 border rounded p-2"
        />
      </div>

      <label className="text-sm text-gray-600">Fecha de compra</label>

      <input
        type="date"
        value={form.fechaCompra}
        onChange={e => setForm({ ...form, fechaCompra: e.target.value })}
        className="w-full border rounded p-2 mb-3"
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium"
      >
        {compraEditando ? "Guardar cambios" : "Agregar"}
      </button>
    </div>
  );
}