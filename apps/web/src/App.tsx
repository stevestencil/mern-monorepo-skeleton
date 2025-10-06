import { Outlet } from 'react-router-dom';
export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>MERN Monorepo</h1>
      <Outlet />
    </div>
  );
}