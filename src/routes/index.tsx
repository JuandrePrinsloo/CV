import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import Layout from '@/components/Layout'

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
      </Route>
    </Routes>
  )
}

export default Router

