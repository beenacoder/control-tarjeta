import { useEffect, useState } from "react";
import generarCuotas from "./utils/cuotas";
import NuevaCompra from "./components/NuevaCompra";
import MesSelector from "./components/MesSelector";
import CuotasMes from "./components/CuotasMes";

export default function App() {
  const [compras, setCompras] = useState([]);
  const [mesVista, setMesVista] = useState(new Date());

  useEffect(() => {
    setCompras(JSON.parse(localStorage.getItem("compras")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("compras", JSON.stringify(compras));
  }, [compras]);

  const cuotasMes = compras
    .flatMap(generarCuotas)
    .filter(
      c =>
        c.mes === mesVista.getMonth() &&
        c.anio === mesVista.getFullYear()
    );

  const totalMes = cuotasMes.reduce((a, b) => a + b.monto, 0);

  function eliminarCompra(id) {
    if (!confirm("¿Eliminar esta compra y todas sus cuotas?")) return;
    setCompras(compras.filter(c => c.id !== id));
  }


  return (
    <div className="min-h-screen bg-slate-100 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        💳 Control de Tarjeta
      </h1>

      <MesSelector mes={mesVista} setMes={setMesVista} />

      <div className="bg-white rounded-xl shadow p-4 mb-4 text-center">
        <div className="text-gray-500 text-sm">Total del mes</div>
        <div className="text-3xl font-bold">
          ${totalMes.toFixed(2)}
        </div>
      </div>

      <CuotasMes cuotas={cuotasMes} onEliminar={eliminarCompra}/>

      <NuevaCompra onAdd={c => setCompras([...compras, c])} />
    </div>
  );
}
