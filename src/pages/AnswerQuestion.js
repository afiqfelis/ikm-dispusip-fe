import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AnswerQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index pertanyaan saat ini
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Jawaban yang dipilih untuk pertanyaan saat ini
  const [answers, setAnswers] = useState([]); // Menyimpan semua jawaban pengguna
  const navigate = useNavigate(); // Hook untuk navigasi

  // Data pertanyaan statis
  const questions = [
    {
      id: 1,
      text: "Bagaimana pendapat Anda tentang kesesuaian persyaratan pelayanan?",
      options: ["Tidak Sesuai", "Kurang Sesuai", "Sesuai", "Sangat Sesuai"],
    },
    {
      id: 2,
      text: "Bagaimana pendapat Anda tentang kecepatan waktu dalam memberikan pelayanan?",
      options: ["Tidak Cepat", "Kurang Cepat", "Cepat", "Sangat Cepat"],
    },
    {
      id: 3,
      text: "Bagaimana pendapat Anda tentang kewajaran biaya/tarif dalam pelayanan?",
      options: ["Sangat Mahal", "Cukup Mahal", "Murah", "Gratis"],
    },
    {
      id: 4,
      text: "Bagaimana pendapat Anda tentang kompetensi petugas dalam pelayanan?",
      options: ["Tidak Kompeten", "Kurang Kompeten", "Kompeten", "Sangat Kompeten"],
    },
  ];

  // Fungsi untuk menangani pemilihan jawaban
  const handleAnswer = (option) => {
    setSelectedAnswer(option); // Simpan jawaban yang dipilih untuk pertanyaan saat ini
  };

  // Fungsi untuk melanjutkan ke pertanyaan berikutnya
  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer; // Simpan jawaban untuk pertanyaan saat ini
      setAnswers(newAnswers);

      // Reset state untuk pertanyaan berikutnya
      setSelectedAnswer(null);

      // Periksa apakah ini pertanyaan terakhir
      if (currentQuestionIndex === questions.length - 1) {
        alert("Selamat! Anda telah berhasil menjawab semua pertanyaan.");
        navigate("/"); // Arahkan pengguna ke halaman home
      } else {
        // Pindah ke pertanyaan berikutnya
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  // Blokir navigasi jika survei belum selesai
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (currentQuestionIndex < questions.length - 1) {
        event.preventDefault();
        event.returnValue = ""; // Wajib untuk beberapa browser
        return "Anda belum menyelesaikan survei. Apakah Anda yakin ingin meninggalkan halaman ini?";
      }
    };

    // Tambahkan event listener untuk blokir navigasi
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Bersihkan listener saat komponen di-unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentQuestionIndex]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.title}>Halaman Jawab Pertanyaan</h1>

      {/* Konten */}
      <div style={styles.content}>
        {/* Pertanyaan Saat Ini */}
        <h2 style={styles.questionTitle}>{questions[currentQuestionIndex].text}</h2>

        {/* Tombol Pilihan Jawaban */}
        <div style={styles.optionsContainer}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              style={{
                ...styles.optionButton,
                backgroundColor: selectedAnswer === option ? "#007bff" : "#f0f0f0",
                color: selectedAnswer === option ? "#fff" : "#333",
              }}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Tombol Lanjut */}
        <button
          style={{
            ...styles.nextButton,
            backgroundColor: selectedAnswer !== null ? "#007bff" : "#ccc",
            cursor: selectedAnswer !== null ? "pointer" : "not-allowed",
          }}
          onClick={handleNext}
          disabled={selectedAnswer === null} // Nonaktifkan jika belum memilih jawaban
        >
          {currentQuestionIndex === questions.length - 1 ? "Selesai" : "Lanjut >>>"}
        </button>
      </div>
    </div>
  );
};

// Styling untuk Halaman AnswerQuestion
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "50px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  content: {
    display: "flex", // Tambahkan ini
    flexDirection: "column", // Tambahkan ini
    alignItems: "center", // Pusatkan elemen secara horizontal
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minHeight: "300px",
  },
  questionTitle: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
  },
  optionButton: {
    width: "100%", // Pastikan semua tombol memiliki lebar yang sama
    maxWidth: "300px", // Batas maksimal lebar tombol
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    whiteSpace: "nowrap", // Pastikan teks tidak terpotong
    overflow: "hidden", // Sembunyikan teks yang melampaui lebar tombol
    textOverflow: "ellipsis", // Tambahkan elipsis (...) jika teks terlalu panjang
  },
  nextButton: {
    width: "20%",
    marginTop: "20px",
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    alignSelf: "flex-end", // Pindahkan tombol ke kanan
  },
};

export default AnswerQuestion;
