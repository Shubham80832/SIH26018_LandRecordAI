function ConfidenceBadge({ status, confidence }) {
  const isHigh = status === "HIGH"
  const isMedium = status === "MEDIUM"

  let badgeClass = "bg-red-500/10 text-red-400 border-red-500/20"

  if (isHigh) {
    badgeClass = "bg-green-500/10 text-green-400 border-green-500/20"
  } else if (isMedium) {
    badgeClass = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${badgeClass}`}
    >
      <span>
        {isHigh ? "✓" : isMedium ? "!" : "⚠"}
      </span>

      <span>
        {status || "LOW"}
      </span>

      {confidence !== undefined && (
        <span className="opacity-80">
          {confidence}%
        </span>
      )}
    </div>
  )
}

export default ConfidenceBadge