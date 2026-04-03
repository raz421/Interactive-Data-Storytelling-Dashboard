import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartCard({ series, title }) {
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
          "#FACC15",
          "#FDE68A",
        ],
        borderColor: "#F9FAFB",
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
      animateRotate: true,
      duration: 900,
    },
  };

  return <Pie data={data} options={options} />;
}

export default PieChartCard;
