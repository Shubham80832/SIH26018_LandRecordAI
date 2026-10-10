import FieldCard from "./FieldCard"
import ConfidenceBadge from "./ConfidenceBadge"

function ExtractedFields({ fields, validation }) {
  if (!fields) {
    return null
  }

  return (
    <div className="w-full mt-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

        <div>
          <h2 className="text-xl font-semibold text-white">
            Extracted Land Record
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Information extracted from the uploaded document
          </p>
        </div>

        <ConfidenceBadge
          status={validation?.status}
          confidence={validation?.confidence}
        />

      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

        <FieldCard
          label="Land Owner"
          value={fields.landowner_name}
          icon="👤"
        />

        <FieldCard
          label="Father / Guardian"
          value={fields.father_guardian_name}
          icon="👨‍👦"
        />

        <FieldCard
          label="Survey Number"
          value={fields.survey_number}
          icon="🔢"
        />

        <FieldCard
          label="Khasra Number"
          value={fields.khasra_number}
          icon="📋"
        />

        <FieldCard
          label="Khata Number"
          value={fields.khata_number}
          icon="📑"
        />

        <FieldCard
          label="Plot Area"
          value={fields.plot_area}
          icon="📐"
        />

        <FieldCard
          label="Village"
          value={fields.village}
          icon="🏘️"
        />

        <FieldCard
          label="Tehsil"
          value={fields.tehsil}
          icon="🏛️"
        />

        <FieldCard
          label="District"
          value={fields.district}
          icon="📍"
        />

        <FieldCard
          label="State"
          value={fields.state}
          icon="🇮🇳"
        />

        <FieldCard
          label="Land Classification"
          value={fields.land_classification}
          icon="🌾"
        />

        <FieldCard
          label="Ownership Type"
          value={fields.ownership_type}
          icon="🏠"
        />

        <FieldCard
          label="Mutation Number"
          value={fields.mutation_number}
          icon="🔄"
        />

        <FieldCard
          label="Mutation Date"
          value={fields.mutation_date}
          icon="📅"
        />

        <FieldCard
          label="Registration Number"
          value={fields.registration_number}
          icon="📝"
        />

      </div>

      {/* Validation Summary */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Completeness
          </p>

          <p className="text-2xl font-bold text-green-400 mt-1">
            {validation?.completeness ?? 0}%
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">
            Confidence
          </p>

          <p className="text-2xl font-bold text-green-400 mt-1">
            {validation?.confidence ?? 0}%
          </p>
        </div>

      </div>

      {/* Validation Errors */}
      {validation?.errors?.length > 0 && (
        <div className="mt-4 bg-red-500/5 border border-red-500/20 rounded-xl p-4">

          <h3 className="text-sm font-semibold text-red-400 mb-2">
            Validation Issues
          </h3>

          <ul className="space-y-1">
            {validation.errors.map((error, index) => (
              <li
                key={index}
                className="text-sm text-red-300"
              >
                • {error}
              </li>
            ))}
          </ul>

        </div>
      )}

      {/* Validation Warnings */}
      {validation?.warnings?.length > 0 && (
        <div className="mt-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4">

          <h3 className="text-sm font-semibold text-yellow-400 mb-2">
            Warnings
          </h3>

          <ul className="space-y-1">
            {validation.warnings.map((warning, index) => (
              <li
                key={index}
                className="text-sm text-yellow-300"
              >
                • {warning}
              </li>
            ))}
          </ul>

        </div>
      )}

    </div>
  )
}

export default ExtractedFields