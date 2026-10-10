import { useState } from "react"
import MainLayout from "./components/layout/MainLayout"
import ChatWindow from "./components/chat/ChatWindow"
import ChatInput from "./components/chat/ChatInput"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  const [result, setResult] = useState(null)

  return (
    <ThemeProvider>
      <MainLayout>

        <div className="h-screen flex flex-col">

          <div className="flex-1 overflow-y-auto">
            <ChatWindow onResult={setResult} />
          </div>

          {/* Message box only after document analysis */}
          {result && (
            <ChatInput result={result} />
          )}

        </div>

      </MainLayout>
    </ThemeProvider>
  )
}

export default App