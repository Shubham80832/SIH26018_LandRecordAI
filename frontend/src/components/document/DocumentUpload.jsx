import { useState } from "react"
import ExtractedFields from "../record/ExtractedFields"
import { useTheme } from "../../context/ThemeContext"

function DocumentUpload({ onResult }) {
  const { theme } = useTheme()
  const isLight = theme === "light"

  const [file, setFile] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [dragging, setDragging] = useState(false)

  const convertWebPToPNG = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement("canvas")

      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Could not process the image."))
        return
      }

      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Could not convert WEBP image."))
            return
          }

          const pngFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, "") + ".png",
            {
              type: "image/png",
            }
          )

          resolve(pngFile)
        },
        "image/png",
        1.0
      )
    }

    img.onerror = () => {
      reject(new Error("Could not read the image."))
    }

    img.src = URL.createObjectURL(file)
  })
}
  // =========================================================
  // FILE VALIDATION
  // =========================================================

  const validateFile = (selectedFile) => {
    if (!selectedFile) return

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      setError(
        "Please upload a PDF, JPG, PNG or WEBP file."
      )

      setFile(null)
      return
    }

    // Optional size validation
    const maxSize = 20 * 1024 * 1024 // 20 MB

    if (selectedFile.size > maxSize) {
      setError("File size should be less than 20 MB.")
      setFile(null)
      return
    }

    setError("")
    setResult(null)
    setFile(selectedFile)
  }

  // =========================================================
  // FILE INPUT
  // =========================================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]

    validateFile(selectedFile)

    // Allows selecting the same file again
    event.target.value = ""
  }

  // =========================================================
  // DRAG & DROP
  // =========================================================

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)

    const droppedFile = event.dataTransfer.files?.[0]

    validateFile(droppedFile)
  }

  // =========================================================
  // UPLOAD / ANALYZE DOCUMENT
  // =========================================================

 const handleUpload = async () => {
  if (!file) {
    setError("Please select a document first.")
    return
  }

  setLoading(true)
  setError("")
  setResult(null)

  try {
    let uploadFile = file

    // WEBP → PNG conversion
    if (file.type === "image/webp") {
      uploadFile = await convertWebPToPNG(file)
    }

    const formData = new FormData()

    formData.append("file", uploadFile)

    const response = await fetch(
      
"https://landrecordai-backend.onrender.com/api/process",

      {
        method: "POST",
        body: formData,
      }
    )

    let data

    try {
      data = await response.json()
    } catch {
      throw new Error(
        "Server returned an invalid response."
      )
    }

    if (!response.ok) {
      throw new Error(
        data?.detail ||
        data?.message ||
        "Document processing failed."
      )
    }

    setResult(data)

    if (onResult) {
      onResult(data)
    }

  } catch (err) {
    console.error("Document processing error:", err)

    setError(
      err?.message ||
      "Something went wrong while processing the document."
    )

  } finally {
    setLoading(false)
  }
}
  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setError("")
    setLoading(false)
    setDragging(false)
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full max-w-4xl mx-auto">

      {/* =====================================================
          UPLOAD AREA
      ===================================================== */}

      {!result && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative
            rounded-3xl
            border
            transition-all
            duration-300
            ${
              dragging
                ? "border-blue-500 bg-blue-50/70 scale-[1.01]"
                : isLight
                  ? "border-slate-200 bg-white hover:border-blue-300"
                  : "border-slate-700 bg-[#11141b] hover:border-blue-500"
            }
          `}
        >

          <label
            htmlFor="document-upload"
            className="block cursor-pointer p-10 sm:p-14"
          >

            {/* =================================================
                UPLOAD ICON
            ================================================= */}

            <div className="flex justify-center mb-6">

              <div
                className={`
                  w-20
                  h-20
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  border
                  transition-all
                  ${
                    dragging
                      ? "bg-blue-100 border-blue-300"
                      : "bg-blue-50 border-blue-100"
                  }
                `}
              >

                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="text-blue-600"
                >

                  <path
                    d="M12 16V4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M7 9l5-5 5 5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M5 20h14"
                    strokeLinecap="round"
                  />

                </svg>

              </div>

            </div>


            {/* =================================================
                HEADING
            ================================================= */}

            <div className="text-center">

              <h3
                className={`
                  text-xl
                  sm:text-2xl
                  font-semibold
                  ${
                    isLight
                      ? "text-slate-900"
                      : "text-white"
                  }
                `}
              >
                {file
                  ? file.name
                  : "Upload your land record"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">

                {file
                  ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                  : "Drag & drop your document here, or click to browse"}

              </p>

            </div>


            {/* =================================================
                BROWSE BUTTON
            ================================================= */}

            {!file && (
              <div className="flex justify-center mt-6">

                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-5
                    py-2.5
                    rounded-xl
                    bg-slate-900
                    text-white
                    text-sm
                    font-medium
                    hover:bg-slate-800
                    transition
                  "
                >
                  Browse Files
                </span>

              </div>
            )}


            {/* =================================================
                SUPPORTED FORMATS
            ================================================= */}

            <div className="flex flex-wrap justify-center gap-2 mt-6">

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  text-xs
                "
              >
                PDF
              </span>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  text-xs
                "
              >
                JPG
              </span>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  text-xs
                "
              >
                PNG
              </span>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  text-xs
                "
              >
                WEBP
              </span>

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-slate-100
                  text-slate-500
                  text-xs
                "
              >
                Scanned
              </span>

            </div>

          </label>


          {/* =================================================
              HIDDEN FILE INPUT
          ================================================= */}

          <input
            id="document-upload"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />

        </div>
      )}


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="
            mt-4
            px-4
            py-3
            rounded-xl
            bg-red-50
            border
            border-red-200
          "
        >

          <p className="text-red-600 text-sm text-center">
            {error}
          </p>

        </div>
      )}


      {/* =====================================================
          FILE SELECTED
      ===================================================== */}

      {file && !result && (

        <div className="mt-4">

          <div
            className={`
              flex
              items-center
              justify-between
              gap-4
              p-4
              border
              rounded-2xl
              ${
                isLight
                  ? "bg-white border-slate-200"
                  : "bg-[#11141b] border-slate-700"
              }
            `}
          >

            {/* FILE INFO */}

            <div className="flex items-center gap-3 min-w-0">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  text-blue-600
                  shrink-0
                "
              >
                📄
              </div>

              <div className="min-w-0">

                <p
                  className={`
                    text-sm
                    font-medium
                    truncate
                    ${
                      isLight
                        ? "text-slate-800"
                        : "text-white"
                    }
                  `}
                >
                  {file.name}
                </p>

                <p className="text-xs text-slate-500 mt-0.5">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>


            {/* REMOVE BUTTON */}

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="
                text-xs
                text-slate-500
                hover:text-red-500
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Remove
            </button>

          </div>


          {/* =================================================
              ANALYZE BUTTON
          ================================================= */}

          <div className="flex justify-center mt-4">

            <button
              type="button"
              onClick={handleUpload}
              disabled={loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-7
                py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-slate-300
                disabled:cursor-not-allowed
                text-white
                text-sm
                font-medium
                shadow-sm
                transition
              "
            >

              {loading ? (
                <>
                  <span className="animate-spin">
                    ⟳
                  </span>

                  Analyzing Document...
                </>
              ) : (
                <>
                  <span>✦</span>
                  Analyze Document
                </>
              )}

            </button>

          </div>

        </div>
      )}


      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="mt-5 text-center">

          <div className="flex justify-center mb-2">

            <div
              className="
                w-8
                h-8
                border-4
                border-blue-100
                border-t-blue-600
                rounded-full
                animate-spin
              "
            />

          </div>

          <p className="text-sm text-slate-500">
            OCR is extracting information from your document...
          </p>

          <p className="text-xs text-slate-400 mt-1">
            This may take a few seconds.
          </p>

        </div>
      )}


      {/* =====================================================
          RESULT
      ===================================================== */}

      {result && (

        <div className="mt-8 text-left">

          {/* =================================================
              DOCUMENT ANALYSIS CARD
          ================================================= */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-5
              shadow-sm
            "
          >

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              "
            >

              <div>

                <h3 className="text-xl font-semibold text-slate-900">
                  Document Analysis
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {result.filename || file?.name}
                </p>

                <p className="text-xs text-slate-400 mt-1">

                  {result.pages_processed
                    ? `${result.pages_processed} page${
                        result.pages_processed > 1
                          ? "s"
                          : ""
                      } processed`
                    : "Document processed"}

                </p>

              </div>


              {/* ANALYZE ANOTHER */}

              <button
                type="button"
                onClick={handleReset}
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  border-slate-200
                  text-sm
                  text-slate-600
                  hover:bg-slate-50
                  transition
                "
              >
                Analyze Another
              </button>

            </div>


            {/* =================================================
                EXTRACTED FIELDS
            ================================================= */}

            <ExtractedFields
              fields={result.fields}
              validation={result.validation}
            />

          </div>


          {/* =================================================
              OCR TEXT
          ================================================= */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-5
              mt-4
            "
          >

            <details>

              <summary
                className="
                  cursor-pointer
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                View OCR Text
              </summary>

              <div
                className="
                  mt-4
                  border-t
                  border-slate-200
                  pt-4
                "
              >

                <pre
                  className="
                    text-sm
                    text-slate-500
                    whitespace-pre-wrap
                    font-sans
                    leading-6
                    overflow-x-auto
                  "
                >
                  {result.ocr_text || "No OCR text returned."}
                </pre>

              </div>

            </details>

          </div>


          {/* =================================================
              DEBUG INFORMATION
          ================================================= */}

          {result.status && (
            <div className="mt-4">

              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                "
              >

                <p className="text-xs text-slate-400 uppercase tracking-wide">
                  Processing Status
                </p>

                <p className="text-sm text-slate-700 mt-1">
                  {result.status}
                </p>

              </div>

            </div>
          )}

        </div>

      )}

    </div>
  )
}

export default DocumentUpload