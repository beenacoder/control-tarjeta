import { useState } from "react";





export default function NuevaCompra({ onAdd }) {
  const [form, setForm] = useState({
    descripcion: "",
    monto: "",
    cuotas: "",
    cuotaActual: "1",
    fechaCompra: "",
  });

  function submit() {
    if (!form.descripcion || !form.monto || !form.cuotas) return;

    const cuotas = Number(form.cuotas);
    const cuotaActual = Number(form.cuotaActual);

    if (cuotaActual < 1 || cuotaActual > cuotas) {
      alert("La cuota actual debe estar entre 1 y el total de cuotas");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      descripcion: form.descripcion,
      monto: Number(form.monto), // 👈 monto mensual
      cuotas,
      cuotaActual,
      fechaCompra: form.fechaCompra,
    });

    setForm({
      descripcion: "",
      monto: "",
      cuotas: "",
      cuotaActual: "1",
      fechaCompra: "",
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold mb-2">Nueva compra</h3>

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

      <label className="text-gray-600">Fecha de compra</label>
      <input
        type="date"
        value={form.fechaCompra}
        onChange={e => setForm({ ...form, fechaCompra: e.target.value })}
        className="w-full border rounded p-2 mb-3"
      />

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white rounded py-2"
      >
        Agregar
      </button>
    </div>
  );
}











// import { useState } from "react";

// export default function NuevaCompra({ onAdd }) {
//   const [form, setForm] = useState({
//     descripcion: "",
//     monto: "",
//     cuotas: "",
//     cuotaActual: "1",
//     fechaCompra: "",
//   });

//   function submit() {
//     if (!form.descripcion) return;

//     const cuotas = Number(form.cuotas);
//     const cuotaActual = Number(form.cuotaActual);

//     if (!form.descripcion || !form.fechaCompra) {
//       alert("Completá descripción y fecha");
//     return
//     }

//     if (cuotaActual < 1 || cuotaActual > cuotas) {
//       alert("La cuota actual debe estar entre 1 y el total de cuotas");
//       return;
//     }

    
//     onAdd({
//       id: crypto.randomUUID(),
//       descripcion: form.descripcion,
//       montoTotal: Number(form.monto),
//       cuotasTotales: cuotas,
//       cuotaActual,
//       fechaCompra: form.fechaCompra,
//     });

//     setForm({
//       descripcion: "",
//       monto: "",
//       cuotas: "",
//       cuotaActual: "1",
//       fechaCompra: "",
//     });
//   }

//   return (
//     <div className="bg-white rounded-xl shadow p-4">
//       <h3 className="font-semibold mb-2">Nueva compra</h3>

//       <input
//         type="text"
//         placeholder="Descripción"
//         value={form.descripcion}
//         onChange={e =>
//           setForm({ ...form, descripcion: e.target.value })
//         }
//         className="w-full border rounded p-2 mb-2"
//       />

//       <input
//         type="number"
//         placeholder="Monto total"
//         value={form.monto}
//         onChange={e =>
//           setForm({ ...form, monto: e.target.value })
//         }
//         className="w-full border rounded p-2 mb-2"
//       />

//       <div className="flex gap-2 mb-2">
//         <input
//           type="number"
//           min="1"
//           placeholder="Cuota actual"
//           value={form.cuotaActual}
//           onChange={e =>
//             setForm({ ...form, cuotaActual: e.target.value })
//           }
//           className="w-1/2 border rounded p-2"
//         />

//         <input
//           type="number"
//           min="1"
//           placeholder="Total cuotas"
//           value={form.cuotas}
//           onChange={e =>
//             setForm({ ...form, cuotas: e.target.value })
//           }
//           className="w-1/2 border rounded p-2"
//         />
//       </div>

//       <p className="text-sm text-gray-500 mb-2">
//         Ejemplo: 3 / 6
//       </p>

//       <input
//         type="date"
//         value={form.fechaCompra}
//         onChange={e =>
//           setForm({ ...form, fechaCompra: e.target.value })
//         }
//         className="w-full border rounded p-2 mb-3"
//       />

//       <button
//         onClick={submit}
//         className="w-full bg-blue-600 text-white rounded py-2"
//       >
//         Agregar
//       </button>
//     </div>
//   );
// }
