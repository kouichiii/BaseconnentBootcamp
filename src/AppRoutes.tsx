import App from "./App"
import JobForm from "./JobForm"
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/JobForm' element={<JobForm />} />
    </Routes>
  )
}

export default AppRoutes