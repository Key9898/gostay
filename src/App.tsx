import { AuthProvider, SettingsProvider } from '@context'
import AppRouter from './router'

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppRouter />
      </SettingsProvider>
    </AuthProvider>
  )
}

export default App
