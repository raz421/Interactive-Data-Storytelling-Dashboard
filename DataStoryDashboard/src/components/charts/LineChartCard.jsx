import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function LineChartCard({ series, title }) {
  const data = {
    labels: series.map((point) => point.label),
    datasets: [
      {
        label: title,
        data: series.map((point) => point.value),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(99, 102, 241, 0.22)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { color: "rgba(148, 163, 184, 0.15)" } },
      y: { grid: { color: "rgba(148, 163, 184, 0.2)" } },
    },
    animation: {
      duration: 850,
      easing: "easeOutQuart",
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChartCard;
