export default function MesSelector({ mes, setMes }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        className="px-3 py-1 bg-white rounded shadow"
        onClick={() =>
          setMes(new Date(mes.setMonth(mes.getMonth() - 1)))
        }
      >
        ◀
      </button>

      <div className="font-semibold">
        {mes.toLocaleDateString("es-AR", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <button
        className="px-3 py-1 bg-white rounded shadow"
        onClick={() =>
          setMes(new Date(mes.setMonth(mes.getMonth() + 1)))
        }
      >
        ▶
      </button>
    </div>
  );
}
