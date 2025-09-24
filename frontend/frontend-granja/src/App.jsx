import Layout from './components/layout/Layout'
import AdminPage from './pages/adminPage/AdminPage'
import NotFound from './pages/notFound/NotFound'
import AlimentacionForm from "./pages/alimentacion/AlimentacionForm";
import { Routes, Route } from 'react-router-dom'
import AlimentacionList from './components/alimentacionList/AlimentacionList'
import ClientesList from './components/clientesList/ClientesList';
import PorcinosList from './components/porcinosList/PorcinosList';
import ClienteForm from "./pages/clientes/ClienteForm";
import PoricnoForm from "./pages/porcinos/PorcinoForm";
import Reportes from './pages/reportes/Reportes';

import './App.css'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AdminPage />} />
        <Route path="alimentacion" element={<AlimentacionList />} />
        <Route path="clientes" element={<ClientesList />} />
        <Route path="porcinos" element={<PorcinosList />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/alimentacion/nuevo" element={<AlimentacionForm />} />
        <Route path="/clientes/nuevo" element={<ClienteForm />} />
        <Route path="/porcinos/nuevo" element={<PoricnoForm />} />
        <Route path="/reportes" element={<Reportes />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
