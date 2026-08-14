import Container from './components/Container.jsx'
import FireBackground from './components/FireBackground.jsx'

function App() {
  return (
    <main className="relative min-h-screen bg-black">
      <FireBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <Container />
      </div>
    </main>
  )
}

export default App
