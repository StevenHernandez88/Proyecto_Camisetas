import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SalesStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios/getVentasStats');
        const formattedData = response.data.map(item => ({
          ...item,
          ingresos: parseFloat(item.ingresos),
          utilidad: parseFloat(item.utilidad),
          rating_promedio: parseFloat(item.rating_promedio),
          ventas: parseInt(item.ventas)
        }));
        setStats(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
        setError('Error al cargar los datos. Por favor, intente más tarde.');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading-state">Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  const totalVentas = stats.reduce((acc, item) => acc + item.ventas, 0);
  const totalIngresos = stats.reduce((acc, item) => acc + item.ingresos, 0);
  const totalUtilidad = stats.reduce((acc, item) => acc + item.utilidad, 0);

  const ventasPieData = stats.map(item => ({
    name: item.modelo,
    value: item.ventas
  }));

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Dashboard de Ventas</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-label">Total Ventas</h3>
            <p className="stat-value text-blue-600">{totalVentas}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Total Ingresos</h3>
            <p className="stat-value text-green-600">${totalIngresos.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Total Utilidad</h3>
            <p className="stat-value text-purple-600">${totalUtilidad.toLocaleString()}</p>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Ventas y Utilidad por Modelo</h3>
            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="modelo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventas" fill="#8884d8" name="Ventas" />
                  <Bar dataKey="utilidad" fill="#82ca9d" name="Utilidad ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Distribución de Ventas</h3>
            <div className="chart-container">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={ventasPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ventasPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Ratings por Modelo</h3>
            <div className="chart-container">
              <ResponsiveContainer>
                <LineChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="modelo" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rating_promedio" stroke="#ff7300" name="Rating Promedio" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Detalles por Modelo</h3>
            <div className="table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Ventas</th>
                    <th>Rating</th>
                    <th>Ingresos</th>
                    <th>Utilidad</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((item, index) => (
                    <tr key={index}>
                      <td>{item.modelo}</td>
                      <td className="number-cell">{item.ventas}</td>
                      <td className="number-cell">{item.rating_promedio.toFixed(1)}</td>
                      <td className="number-cell">${item.ingresos.toLocaleString()}</td>
                      <td className="number-cell">${item.utilidad.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStats;