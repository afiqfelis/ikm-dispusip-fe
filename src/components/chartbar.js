import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBar = () => {
  // Data survei (bisa diambil dari API atau file lain)
  const surveyData = [
    { label: "Survei A", value: 40 },
    { label: "Survei B", value: 60 },
    { label: "Survei C", value: 80 },
    { label: "Survei D", value: 30 },
  ];

  // Format data untuk Chart.js
  const data = {
    labels: surveyData.map((item) => item.label), // Label untuk sumbu x
    datasets: [
      {
        label: "Hasil Survei",
        data: surveyData.map((item) => item.value), // Nilai untuk sumbu y
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Konfigurasi opsional untuk Chart.js
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartBar;
