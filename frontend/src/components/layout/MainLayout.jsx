import Sidebar from "../Sidebar/Sidebar.jsx"

function MainLayout({ children }) {
  return (
   <div className="flex h-screen bg-white text-slate-900 overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 min-w-0 h-screen overflow-hidden">
        {children}
      </main>

    </div>
  )
}

export default MainLayout