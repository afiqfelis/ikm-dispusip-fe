import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddQuestion = () => {
  const token = localStorage.getItem("token");
  const [questionData, setQuestionData] = useState({
    id_pertanyaan: null,
    questionText: "",
    selectedUnsur: "",
    options: ["", "", "", ""],
  });
  const [questionsList, setQuestionsList] = useState([]);
  const [unsurList, setUnsurList] = useState([]);

  useEffect(() => {
    fetch("https://ikmb.perpustakaanterbaik.com/api/unsur", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data unsur");
        return res.json();
      })
      .then((data) => {
        setUnsurList(data);
        if (data.length > 0) {
          setQuestionData((prev) => ({
            ...prev,
            selectedUnsur: data[0].id_unsur,
          }));
        }
      });
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:8000/api/pertanyaan", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data pertanyaan");
        return res.json();
      })
      .then((data) => setQuestionsList(data));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isUpdate = !!questionData.id_pertanyaan;

    try {
      const response = await fetch(isUpdate ? `http://localhost:8000/api/pertanyaan/update/${questionData.id_pertanyaan}` : "http://localhost:8000/api/pertanyaan/store", {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pertanyaan: questionData.questionText,
          id_unsur: questionData.selectedUnsur,
        }),
      });

      // Periksa apakah respons adalah JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Respons dari server bukan JSON. Cek endpoint dan server logs.");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan pertanyaan");
      }

      const finalQuestion = await response.json();

      if (isUpdate) {
        await fetch(`http://localhost:8000/api/jawaban/delete-by-pertanyaan/${finalQuestion.id_pertanyaan}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const jawabanPromises = questionData.options.map((option, index) => {
        return fetch("http://localhost:8000/api/jawaban/store", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deskripsi: option,
            nilai_jawaban: index + 1,
            id_pertanyaan: finalQuestion.id_pertanyaan,
          }),
        });
      });

      await Promise.all(jawabanPromises);

      setQuestionsList((prevList) => (isUpdate ? prevList.map((q) => (q.id_pertanyaan === finalQuestion.id_pertanyaan ? finalQuestion : q)) : [...prevList, finalQuestion]));

      setQuestionData({
        id_pertanyaan: null,
        questionText: "",
        selectedUnsur: unsurList[0]?.id_unsur || "",
        options: ["", "", "", ""],
      });

      alert(isUpdate ? "Pertanyaan diperbarui!" : "Pertanyaan ditambahkan!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const handleEdit = (id_pertanyaan) => {
    const questionToEdit = questionsList.find((q) => q.id_pertanyaan === id_pertanyaan);
    if (questionToEdit) {
      const { pertanyaan, id_unsur, jawaban } = questionToEdit;
      setQuestionData({
        id_pertanyaan,
        questionText: pertanyaan,
        selectedUnsur: id_unsur,
        options: jawaban ? jawaban.map((j) => j.deskripsi) : ["", "", "", ""],
      });
      setQuestionsList((prev) => prev.filter((q) => q.id_pertanyaan !== id_pertanyaan));
    }
  };

  // AddQuestion.js
  const handleDelete = async (id_pertanyaan) => {
    try {
      const response = await fetch(`http://localhost:8000/api/pertanyaan/delete/${id_pertanyaan}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus pertanyaan");
      }

      // Hapus dari daftar pertanyaan
      setQuestionsList((prev) => prev.filter((q) => q.id_pertanyaan !== id_pertanyaan));
      alert("Pertanyaan berhasil dihapus!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Tambah/Edit Pertanyaan</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Unsur Pertanyaan:</label>
            <select name="selectedUnsur" value={questionData.selectedUnsur} onChange={handleChange} style={styles.select} required>
              <option value="">-- Pilih Unsur --</option>
              {unsurList.map((unsur) => (
                <option key={unsur.id_unsur} value={unsur.id_unsur}>
                  {unsur.unsur}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Pertanyaan:</label>
            <textarea name="questionText" value={questionData.questionText} onChange={handleChange} required style={styles.textarea} placeholder="Masukkan pertanyaan..." />
          </div>
          <div style={styles.optionsContainer}>
            <h4 style={styles.subtitle}>Pilihan Jawaban:</h4>
            {questionData.options.map((option, index) => (
              <div key={index} style={styles.optionGroup}>
                <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} placeholder={`Pilihan ${index + 1}`} style={styles.input} />
              </div>
            ))}
          </div>
          <button
            type="submit"
            style={{
              ...styles.submitButton,
              // Dynamic styling langsung di JSX
              opacity: questionData.selectedUnsur && questionData.questionText ? 1 : 0.6,
              pointerEvents: questionData.selectedUnsur && questionData.questionText ? "auto" : "none",
            }}
            disabled={!questionData.selectedUnsur || !questionData.questionText}
          >
            {questionData.id_pertanyaan ? "Update Pertanyaan" : "Simpan Pertanyaan"}
          </button>
        </form>
      </div>
      <div style={styles.tableBox}>
        <h3 style={styles.subtitle}>Daftar Pertanyaan</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: "50px" }}>No</th>
              <th style={{ ...styles.th, width: "200px" }}>Unsur</th>
              <th style={{ ...styles.th, width: "400px" }}>Pertanyaan</th>
              <th style={{ ...styles.th, width: "100px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {questionsList.map((question, index) => (
              <tr key={question.id_pertanyaan}>
                <td style={{ ...styles.td, width: "50px" }}>{index + 1}</td>
                <td style={{ ...styles.td, width: "200px" }}>{question.unsur?.unsur || "-"}</td>
                <td style={{ ...styles.td, width: "400px" }}>{question.pertanyaan}</td>
                <td style={{ ...styles.td, width: "100px" }}>
                  <FontAwesomeIcon icon={faEdit} style={styles.iconEdit} onClick={() => handleEdit(question.id_pertanyaan)} />
                  <FontAwesomeIcon icon={faTrash} style={styles.iconDelete} onClick={() => handleDelete(question.id_pertanyaan)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  formBox: {
    padding: "50px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
  },
  tableBox: {
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "25px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "vertical",
    minHeight: "80px",
  },
  select: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  optionsContainer: {
    marginTop: "10px",
  },
  subtitle: {
    color: "#555",
    marginBottom: "10px",
  },
  optionGroup: {
    marginBottom: "20px",
  },
  submitButton: {
    padding: "10px",
    width: "250px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "opacity 0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#1f618d",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  iconEdit: {
    color: "#2ecc71",
    marginRight: "10px",
    cursor: "pointer",
  },
  iconDelete: {
    color: "#e74c3c",
    cursor: "pointer",
  },
};

export default AddQuestion;
