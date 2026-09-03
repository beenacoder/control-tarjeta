import { useEffect, useState } from "react";
import generarCuotas from "./utils/cuotas";
import NuevaCompra from "./components/NuevaCompra";
import MesSelector from "./components/MesSelector";
import CuotasMes from "./components/CuotasMes";
import { obtenerCierreYVencimiento } from "./utils/tarjeta";
import ConfigTarjeta from "./components/ConfigTarjeta";
import ListadoCompras from "./components/ListadoCompras";
import ModalCompra from "./components/ModalCompra";




export default function App() {
  // const [compras, setCompras] = useState([]);
  const [compraEditando, setCompraEditando] = useState(null);
  const [mostrarConfig, setMostrarConfig] = useState(false);
  // const [mostrarNuevaCompra, setMostrarNuevaCompra] = useState(false);
  const [modalCompraAbierto, setModalCompraAbierto] = useState(false);
  const [mostrarCompras, setMostrarCompras] = useState(false);
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

  function editarCompra(compraActualizada) {
    setCompras(
      compras.map(c =>
        c.id === compraActualizada.id
          ? compraActualizada
          : c
      )
    );

    setCompraEditando(null);
  }

  const { cierre, vencimiento } = obtenerCierreYVencimiento(mesVista,
    configTarjeta.diaCierre,
    configTarjeta.diaVencimiento);


  function abrirNuevaCompra() {
    setCompraEditando(null);
    setModalCompraAbierto(true);
  }

  function abrirEditarCompra(compra) {
    setCompraEditando(compra);
    setModalCompraAbierto(true);
  }

  function cerrarModalCompra() {
    setCompraEditando(null);
    setModalCompraAbierto(false);
  }


  return (
    <div className="min-h-screen bg-slate-100 p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        💳 Control de Tarjeta
      </h1>

      <div className="flex justify-end mb-3">
        <button
          onClick={() => setMostrarConfig(!mostrarConfig)}
          className="text-sm text-blue-600 font-medium"
        >
          {mostrarConfig ? "Cerrar configuración" : "⚙️ Configurar tarjeta"}
        </button>
      </div>

      {mostrarConfig && (
        <ConfigTarjeta
          config={configTarjeta}
          onChange={setConfigTarjeta}
        />
      )}
      <MesSelector mes={mesVista} setMes={setMesVista} />

      <div className="bg-white rounded-2xl shadow p-5 mb-4">
        <div className="text-center mb-5">
          <div className="text-sm text-gray-500 mb-1">Total a pagar</div>
          <div className="text-4xl font-bold text-slate-800">
            ${totalMes.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-4">
          <div className="text-center">
            <div className="text-xs text-gray-500">Cierre</div>
            <div className="font-semibold text-slate-700">
              {cierre.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </div>
          </div>

          <div className="text-center border-l">
            <div className="text-xs text-gray-500">Vencimiento</div>
            <div className="font-semibold text-slate-700">
              {vencimiento.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>

      <CuotasMes cuotas={cuotasMes} />

      <div className="mb-3">
        <button
          onClick={() => setMostrarCompras(!mostrarCompras)}
          className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl py-3 font-medium"
        >
          {mostrarCompras ? "Cerrar compras" : "Administrar compras"}
        </button>
      </div>

      {mostrarCompras && (
        <ListadoCompras
          compras={compras}
          onEliminar={eliminarCompra}
          onEditar={abrirEditarCompra}
        />
      )}

      <div className="mb-4">
        <button
          onClick={abrirNuevaCompra}
          className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold"
        >
          + Agregar compra
        </button>
      </div>

      <ModalCompra
        abierto={modalCompraAbierto}
        onCerrar={cerrarModalCompra}
      >
        <NuevaCompra
          compraEditando={compraEditando}
          onAdd={c => {
            setCompras([...compras, c]);
            cerrarModalCompra();
          }}
          onEdit={c => {
            editarCompra(c);
            cerrarModalCompra();
          }}
        />
      </ModalCompra>
      {/* {console.table(compras.flatMap(generarCuotas))} */}

    </div>
  );
}
