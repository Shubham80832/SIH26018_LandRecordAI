import { useState } from "react"

function ChatInput({ result }) {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!question.trim()) return

    const userQuestion = question.trim()

    let answer = ""

    if (!result) {
      answer = "Please upload and analyze a land record first."
    } else {
      const fields = result.fields
      const validation = result.validation

      const q = userQuestion.toLowerCase()

      if (
        q.includes("owner") ||
        q.includes("land owner") ||
        q.includes("maalik") ||
        q.includes("मालिक")
      ) {
        answer = `The land owner is ${fields.landowner_name || "not detected"}.`
      }

      else if (
        q.includes("father") ||
        q.includes("guardian") ||
        q.includes("father name")
      ) {
        answer = `The father/guardian name is ${
          fields.father_guardian_name || "not detected"
        }.`
      }

      else if (
        q.includes("khasra")
      ) {
        answer = `The Khasra number is ${
          fields.khasra_number || "not detected"
        }.`
      }

      else if (
        q.includes("survey")
      ) {
        answer = `The Survey number is ${
          fields.survey_number || "not detected"
        }.`
      }

      else if (
        q.includes("khata")
      ) {
        answer = `The Khata number is ${
          fields.khata_number || "not detected"
        }.`
      }

      else if (
        q.includes("area") ||
        q.includes("land area") ||
        q.includes("plot area")
      ) {
        answer = `The recorded plot area is ${
          fields.plot_area || "not detected"
        }.`
      }

      else if (
        q.includes("village")
      ) {
        answer = `The village is ${
          fields.village || "not detected"
        }.`
      }

      else if (
        q.includes("tehsil")
      ) {
        answer = `The tehsil is ${
          fields.tehsil || "not detected"
        }.`
      }

      else if (
        q.includes("district")
      ) {
        answer = `The district is ${
          fields.district || "not detected"
        }.`
      }

      else if (
        q.includes("state")
      ) {
        answer = `The state is ${
          fields.state || "not detected"
        }.`
      }

      else if (
        q.includes("classification") ||
        q.includes("land type")
      ) {
        answer = `The land classification is ${
          fields.land_classification || "not detected"
        }.`
      }

      else if (
        q.includes("ownership")
      ) {
        answer = `The ownership type is ${
          fields.ownership_type || "not detected"
        }.`
      }

      else if (
        q.includes("mutation number") ||
        q.includes("mutation no")
      ) {
        answer = `The mutation number is ${
          fields.mutation_number || "not detected"
        }.`
      }

      else if (
        q.includes("mutation date")
      ) {
        answer = `The mutation date is ${
          fields.mutation_date || "not detected"
        }.`
      }

      else if (
        q.includes("registration")
      ) {
        answer = `The registration number is ${
          fields.registration_number || "not detected"
        }.`
      }

      else if (
        q.includes("valid") ||
        q.includes("validation") ||
        q.includes("issue") ||
        q.includes("error")
      ) {
        if (validation?.errors?.length > 0) {
          answer = `There are ${validation.errors.length} validation issue(s): ${validation.errors.join(
            ", "
          )}`
        } else {
          answer = `No validation errors were detected. The record has ${validation?.confidence ?? 0}% confidence and ${validation?.completeness ?? 0}% completeness.`
        }
      }

      else {
        answer =
          "I can answer questions about the owner, father/guardian, survey number, Khasra, Khata, area, village, tehsil, district, state, ownership, mutation, registration and validation."
      }
    }

    setMessages((previous) => [
      ...previous,
      {
        question: userQuestion,
        answer: answer,
      },
    ])

    setQuestion("")
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">

      {/* Chat Messages */}

      {messages.length > 0 && (
        <div className="mb-4 space-y-4 max-h-72 overflow-y-auto">

          {messages.map((message, index) => (
            <div key={index} className="space-y-2">

              {/* User */}
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-[80%]">
                  {message.question}
                </div>
              </div>

              {/* AI */}
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%]">
                  {message.answer}
                </div>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* Input */}

      <form onSubmit={handleSubmit}>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3">

          <button
            type="button"
            className="text-slate-400 hover:text-white text-xl"
          >
            📎
          </button>

          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about your land record..."
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-500"
          />

          <button
            type="submit"
            disabled={!question.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed px-4 py-2 rounded-xl transition text-white"
          >
            ↑
          </button>

        </div>

      </form>

      <p className="text-center text-xs text-slate-600 mt-2">
        LandRecord AI can extract, validate and analyze land records.
      </p>

    </div>
  )
}

export default ChatInput