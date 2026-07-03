import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { store } from './store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </Provider>
  )
}
