import React from "react";
import { Pie } from "react-chartjs-2"; // Impor komponen Pie
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi komponen Chart.js untuk pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const surveyData = [
    { label: "Survei A", value: 40 },
    { label: "Survei B", value: 60 },
    { label: "Survei C", value: 80 },
    { label: "Survei D", value: 30 },
  ];

  const data = {
    labels: surveyData.map((item) => item.label),
    datasets: [
      {
        label: "Hasil Survei",
        data: surveyData.map((item) => item.value),
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hasil Survei",
      },
    },
  };

  return (
    <div style={{ width: "400px", height: "400px" }}>
      {" "}
      {/* Atur ukuran container */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
