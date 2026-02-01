import { useEffect, useState } from "react";
import generarCuotas from "./utils/cuotas";
import NuevaCompra from "./components/NuevaCompra";
import MesSelector from "./components/MesSelector";
import CuotasMes from "./components/CuotasMes";
import ListadoCompras from "./components/ListadoCompras";
import { obtenerCierreYVencimiento } from "./utils/tarjeta";
import ConfigTarjeta from "./components/ConfigTarjeta";




export default function App() {
  // const [compras, setCompras] = useState([]);
  const [mesVista, setMesVista] = useState(new Date());
  const [compras, setCompras] = useState(() => {
    return JSON.parse(localStorage.getItem("compras")) || [];
  });

  const [configTarjeta, setConfigTarjeta] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("configTarjeta")) || {
        diaCierre: 28,
        diaVencimiento: 10,
      }
    );
  });


  useEffect(() => {
    localStorage.setItem(
      "configTarjeta",
      JSON.stringify(configTarjeta)
    );
  }, [configTarjeta]);


  useEffect(() => {
    localStorage.setItem("compras", JSON.stringify(compras));
  }, [compras]);

  const cuotasMes = compras
    .flatMap(c =>
      generarCuotas(c, configTarjeta)
    )
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

  const { cierre, vencimiento } = obtenerCierreYVencimiento(mesVista,
    configTarjeta.diaCierre,
    configTarjeta.diaVencimiento);


  return (
    <div className="min-h-screen bg-slate-100 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        💳 Control de Tarjeta
      </h1>

      <ConfigTarjeta config={configTarjeta} onChange={setConfigTarjeta} />
      <MesSelector mes={mesVista} setMes={setMesVista} />

      <div className="bg-white rounded-xl shadow p-3 mb-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">🔒 Cierre</span>
          <span>{cierre.toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between mt-1">
          <span className="font-medium">💸 Vencimiento</span>
          <span>{vencimiento.toLocaleDateString()}</span>
        </div>
      </div>


      <ListadoCompras compras={compras} onEliminar={eliminarCompra} />


      <div className="bg-white rounded-xl shadow p-4 mb-4 text-center">
        <div className="text-gray-500 text-sm">Total del mes</div>
        <div className="text-3xl font-bold">
          ${totalMes.toFixed(2)}
        </div>
      </div>

      <CuotasMes cuotas={cuotasMes} onEliminar={eliminarCompra} />

      <NuevaCompra onAdd={c => setCompras([...compras, c])} />
      {/* {console.table(compras.flatMap(generarCuotas))} */}

    </div>
  );
}
