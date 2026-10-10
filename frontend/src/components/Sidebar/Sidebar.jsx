import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"

function Sidebar() {
  const { theme, toggleTheme } = useTheme()

  const [showSettings, setShowSettings] = useState(false)

  const isLight = theme === "light"

  return (
    <aside
      className={`
        w-64
        h-screen
        border-r
        flex
        flex-col
        transition-colors
        duration-300
        ${
          isLight
            ? "bg-white border-slate-200 text-slate-900"
            : "bg-[#0b0d12] border-white/10 text-white"
        }
      `}
    >

      {/* Logo */}
      <div
        className={`
          px-5
          py-5
          border-b
          transition-colors
          ${
            isLight
              ? "border-slate-200"
              : "border-white/10"
          }
        `}
      >
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white">
            L
          </div>

          <div>
            <h1
              className={`
                text-lg
                font-semibold
                tracking-tight
                ${
                  isLight
                    ? "text-slate-900"
                    : "text-white"
                }
              `}
            >
              LandRecord{" "}
              <span className="text-blue-500">
                AI
              </span>
            </h1>

            <p
              className={`
                text-[11px]
                ${
                  isLight
                    ? "text-slate-500"
                    : "text-slate-500"
                }
              `}
            >
              Intelligent Land Records
            </p>
          </div>

        </div>
      </div>


      {/* New Chat */}
      <div className="p-3">

        <button
          type="button"
          className={`
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            border
            text-sm
            transition-colors
            ${
              isLight
                ? "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }
          `}
        >
          <span className="text-lg">
            +
          </span>

          <span>
            New Chat
          </span>
        </button>

      </div>


      {/* Recent */}
      <div className="flex-1 overflow-y-auto px-3">

        <p
          className={`
            px-2
            py-3
            text-[11px]
            uppercase
            tracking-wider
            ${
              isLight
                ? "text-slate-400"
                : "text-slate-600"
            }
          `}
        >
          Recent
        </p>

        <div className="space-y-1">

          <button
            type="button"
            className={`
              w-full
              text-left
              px-3
              py-2.5
              rounded-lg
              text-sm
              truncate
              transition-colors
              ${
                isLight
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-slate-300 hover:bg-white/5"
              }
            `}
          >
            Land record analysis
          </button>

          <button
            type="button"
            className={`
              w-full
              text-left
              px-3
              py-2.5
              rounded-lg
              text-sm
              truncate
              transition-colors
              ${
                isLight
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-slate-300 hover:bg-white/5"
              }
            `}
          >
            Khasra verification
          </button>

          <button
            type="button"
            className={`
              w-full
              text-left
              px-3
              py-2.5
              rounded-lg
              text-sm
              truncate
              transition-colors
              ${
                isLight
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-slate-300 hover:bg-white/5"
              }
            `}
          >
            Ownership details
          </button>

        </div>

      </div>


      {/* Settings */}
      <div
        className={`
          p-3
          border-t
          relative
          ${
            isLight
              ? "border-slate-200"
              : "border-white/10"
          }
        `}
      >

        <button
          type="button"
          onClick={() =>
            setShowSettings((current) => !current)
          }
          className={`
            w-full
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-lg
            text-sm
            transition-colors
            ${
              isLight
                ? "text-slate-600 hover:bg-slate-100"
                : "text-slate-400 hover:bg-white/5"
            }
          `}
        >
          <span>
            ⚙️
          </span>

          <span className="flex-1 text-left">
            Settings
          </span>

          <span className="text-xs">
            {showSettings ? "⌃" : "⌄"}
          </span>

        </button>


        {/* Settings Panel */}
        {showSettings && (

          <div
            className={`
              mt-2
              border
              rounded-xl
              p-3
              shadow-xl
              transition-colors
              ${
                isLight
                  ? "bg-white border-slate-200"
                  : "bg-[#11141b] border-white/10"
              }
            `}
          >

            <p
              className={`
                text-[10px]
                uppercase
                tracking-wider
                mb-2
                ${
                  isLight
                    ? "text-slate-400"
                    : "text-slate-600"
                }
              `}
            >
              Appearance
            </p>


            {/* Theme Switch */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`
                w-full
                flex
                items-center
                justify-between
                px-3
                py-2.5
                rounded-lg
                transition-colors
                ${
                  isLight
                    ? "hover:bg-slate-100"
                    : "hover:bg-white/5"
                }
              `}
            >

              <div className="flex items-center gap-3">

                <span className="text-lg">
                  {isLight ? "☀️" : "🌙"}
                </span>

                <div className="text-left">

                  <p
                    className={`
                      text-sm
                      ${
                        isLight
                          ? "text-slate-800"
                          : "text-slate-200"
                      }
                    `}
                  >
                    Switch Mode
                  </p>

                  <p
                    className={`
                      text-[11px]
                      ${
                        isLight
                          ? "text-slate-500"
                          : "text-slate-500"
                      }
                    `}
                  >
                    {isLight
                      ? "Light mode"
                      : "Dark mode"}
                  </p>

                </div>

              </div>


              {/* Toggle */}
              <div
                className={`
                  w-10
                  h-5
                  rounded-full
                  p-0.5
                  transition-colors
                  ${
                    isLight
                      ? "bg-blue-600"
                      : "bg-slate-700"
                  }
                `}
              >

                <div
                  className={`
                    w-4
                    h-4
                    rounded-full
                    bg-white
                    transition-transform
                    ${
                      isLight
                        ? "translate-x-5"
                        : "translate-x-0"
                    }
                  `}
                />

              </div>

            </button>

          </div>

        )}

      </div>

    </aside>
  )
}

export default Sidebar