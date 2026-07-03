import { Providers } from './app/providers'
import AppRouter from './app/router'

export default function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  )
}
