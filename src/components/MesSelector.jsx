export default function MesSelector({ mes, setMes }) {
  function cambiarMes(delta) {
    const nuevo = new Date(mes);
    nuevo.setMonth(nuevo.getMonth() + delta);
    setMes(nuevo);
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => cambiarMes(-1)}
        className="px-3 py-1 bg-white rounded shadow"
      >
        ◀
      </button>

      <div className="font-semibold">
        {mes.toLocaleString("es-AR", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <button
        onClick={() => cambiarMes(1)}
        className="px-3 py-1 bg-white rounded shadow"
      >
        ▶
      </button>
    </div>
  );
}

