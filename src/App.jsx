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
  const [modalConfigAbierto, setModalConfigAbierto] = useState(false);
  const [compraEditando, setCompraEditando] = useState(null);
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
    <div className="min-h-screen bg-stone-100 p-4 max-w-md mx-auto">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-500 font-semibold">
          Finanzas personales
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          Control de Tarjeta
        </h1>
      </div>

      <div className="flex justify-end mb-3">
        <button
          onClick={() => setModalConfigAbierto(true)}
          className="text-sm text-slate-500 hover:text-violet-600 font-medium transition"
        >
          ⚙️ Configurar
        </button>
      </div>
      <MesSelector mes={mesVista} setMes={setMesVista} />

      <div className="bg-linear-to-br from-violet-600 to-indigo-700 rounded-2xl shadow-lg p-5 mb-4 text-white">
        <div className="text-center mb-5">
          <div className="text-sm text-violet-100 mb-1">Total a pagar</div>
          <div className="text-4xl font-bold tracking-tight">
            ${totalMes.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-4 mt-5">
          <div className="text-center">
            <div className="text-xs text-violet-200">Cierre</div>
            <div className="font-semibold text-slate-700">
              {cierre.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </div>
          </div>

          <div className="text-center border-l">
            <div className="text-xs text-violet-200">Vencimiento</div>
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
          className="w-full bg-white border border-stone-200 text-slate-700 rounded-xl py-3 font-medium hover:bg-stone-50 transition"
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
          className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 font-semibold shadow-sm transition"
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

      <ModalCompra
        abierto={modalConfigAbierto}
        onCerrar={() => setModalConfigAbierto(false)}
      >
        <ConfigTarjeta
          config={configTarjeta}
          onChange={setConfigTarjeta}
        />
      </ModalCompra>
      {/* {console.table(compras.flatMap(generarCuotas))} */}

    </div>
  );
}
