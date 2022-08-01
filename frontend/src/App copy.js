import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';

export default function App() {
  const data = [
    {
      impressoes: 200,
      cliques: 100,
    },
    {
      impressoes: 450,
      cliques: 390,
    },
    {
      impressoes: 1650,
      cliques: 1157,
    },
    {
      impressoes: 3594,
      cliques: 3410,
    },
  ];

  return (
    <Container>
      <div className="App">
        <h1>Olá</h1>
        <ResponsiveContainer height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="8 8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="impressoes"
              strokeWidth={3}
              stroke="#AD4335"
            />
            <Line
              type="monotone"
              dataKey="cliques"
              strokeWidth={3}
              stroke="#004FAC"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}
