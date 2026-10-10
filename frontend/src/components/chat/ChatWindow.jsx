import DocumentUpload from "../document/DocumentUpload"

function ChatWindow({ onResult }) {
  return (
    <div className="app-background flex-1 min-h-screen flex flex-col">

      {/* Top Header */}
      <header className="app-header h-16 flex items-center justify-between px-6">

        {/* Logo + Title */}
        <div className="flex items-center gap-3">

          <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
            <span className="text-blue-400">
              ✦
            </span>
          </div>

          <div>
            <h2 className="text-sm font-semibold">
              LandRecord AI
            </h2>

            <p className="text-[11px] text-slate-500">
              Intelligent Document Assistant
            </p>
          </div>

        </div>

        {/* Status */}
        <div className="flex items-center gap-2 text-xs text-slate-400">

          <span className="w-2 h-2 rounded-full bg-green-400"></span>

          AI Ready

        </div>

      </header>


      {/* Main Area */}
      <div className="flex-1 overflow-y-auto">

        <div className="max-w-5xl mx-auto px-6 py-12">

          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto">

            {/* AI Icon */}
            <div
              className="
                mx-auto
                w-16
                h-16
                rounded-2xl
                bg-blue-500/10
                border
                border-blue-500/20
                flex
                items-center
                justify-center
                mb-6
              "
            >
              <span className="text-3xl">
                ✦
              </span>
            </div>


            {/* Heading */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                font-semibold
                tracking-tight
                mb-4
              "
            >
              Understand your
              <span className="text-blue-400">
                {" "}land records
              </span>
            </h1>


            {/* Description */}
            <p
              className="
               theme-text-muted
                text-base
                sm:text-lg
                leading-7
                max-w-2xl
                mx-auto
              "
            >
              Upload historical land records and transform
              complex documents into structured, searchable
              information using AI-powered document intelligence.
            </p>

          </div>


          {/* Upload Section */}
          <div className="mt-10">

            <DocumentUpload onResult={onResult} />

          </div>


          {/* Suggested Capabilities */}
          <div className="max-w-3xl mx-auto mt-10">

            <p
              className="
                text-xs
                uppercase
                tracking-wider
                text-slate-500
                text-center
                mb-4
              "
            >
              What you can analyze
            </p>


            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-3
              "
            >

              {/* Card 1 */}
              <div
                className="
                  theme-card
                  rounded-xl
                  p-4
                  hover:scale-[1.02]
                  transition
                "
              >

                <div className="text-xl mb-2">
                  👤
                </div>

                <p className="text-sm font-medium">
                  Ownership
                </p>

                <p className="text-xs theme-text-subtle mt-1">
                  Owner details
                </p>

              </div>


              {/* Card 2 */}
              <div
                className="
                  theme-card
                  rounded-xl
                  p-4
                  hover:scale-[1.02]
                  transition
                "
              >

                <div className="text-xl mb-2">
                  📍
                </div>

                <p className="text-sm font-medium">
                  Land Details
                </p>

                <p className="text-xs theme-text-subtle mt-1">
                  Khasra & area
                </p>

              </div>


              {/* Card 3 */}
              <div
                className="
                  theme-card
                  rounded-xl
                  p-4
                  hover:scale-[1.02]
                  transition
                "
              >

                <div className="text-xl mb-2">
                  🔄
                </div>

                <p className="text-sm font-medium">
                  Mutation
                </p>

                <p className="text-xs theme-text-subtle mt-1">
                  History & dates
                </p>

              </div>


              {/* Card 4 */}
              <div
                className="
                  theme-card
                  rounded-xl
                  p-4
                  hover:scale-[1.02]
                  transition
                "
              >

                <div className="text-xl mb-2">
                  ✓
                </div>

                <p className="text-sm font-medium">
                  Validation
                </p>

                <p className="text-xs theme-text-subtle mt-1">
                  Errors & confidence
                </p>

              </div>

            </div>

          </div>


          {/* Bottom Information */}
          <div
            className="
              text-center
              mt-10
              text-xs
              text-slate-500
            "
          >
            Supports scanned and handwritten land records
            • PDF • JPG • PNG
          </div>

        </div>

      </div>

    </div>
  )
}

export default ChatWindow