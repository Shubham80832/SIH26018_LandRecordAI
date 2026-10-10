function FieldCard({ label, value, icon }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition">

      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">
          {icon}
        </span>

        <p className="text-xs text-slate-500 uppercase tracking-wide">
          {label}
        </p>
      </div>

      <p className="text-white font-medium break-words">
        {value || "Not detected"}
      </p>

    </div>
  )
}

export default FieldCard