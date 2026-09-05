export default function MesSelector({ mes, setMes }) {
  function cambiarMes(delta) {
    const nuevo = new Date(mes);
    nuevo.setMonth(nuevo.getMonth() + delta);
    setMes(nuevo);
  }

  return (
    <div className="flex items-center justify-between bg-white border border-stone-200 rounded-2xl px-3 py-2 mb-4 shadow-sm">
      <button
        onClick={() => cambiarMes(-1)}
        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-violet-50 hover:text-violet-800 transition"
        aria-label="Mes anterior"
      >
        ←
      </button>

      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Período
        </div>

        <div className="font-semibold text-slate-900 capitalize mt-0.5">
          {mes.toLocaleString("es-AR", {
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      <button
        onClick={() => cambiarMes(1)}
        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-violet-50 hover:text-violet-800 transition"
        aria-label="Mes siguiente"
      >
        →
      </button>
    </div>
  );
}