import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PetManager from './PetManager'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PetManager />
    </QueryClientProvider>
  )
}

export default App