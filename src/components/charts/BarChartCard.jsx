import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function BarChartCard({ series, title }) {
  const data = {
    labels: series.map((point) => point.label),
    datasets: [
      {
        label: title,
        data: series.map((point) => point.value),
        backgroundColor: [
          "#4F46E5",
          "#6366F1",
          "#818CF8",
          "#A5B4FC",
          "#C7D2FE",
          "#FACC15",
        ],
        borderRadius: 8,
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
    animation: {
      duration: 900,
      easing: "easeOutBack",
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChartCard;
