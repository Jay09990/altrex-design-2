import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router'
import { LoadingProvider } from './context/LoadingContext'

function App() {
  return (
    <LoadingProvider>
      <RouterProvider router={router} />
    </LoadingProvider>
  )
}

export default App
