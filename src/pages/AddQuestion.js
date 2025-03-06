import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddQuestion = () => {
  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  // State untuk data form pertanyaan
  const [questionData, setQuestionData] = useState({
    questionText: "",
    selectedUnsur: "", // id_unsur yang dipilih dari dropdown
    options: ["", "", "", ""], // 4 pilihan jawaban
  });

  // State untuk daftar pertanyaan yang ditampilkan di tabel
  const [questionsList, setQuestionsList] = useState([]);
  // State untuk daftar unsur yang diambil dari backend
  const [unsurList, setUnsurList] = useState([]);

  // Ambil data unsur dari backend
  useEffect(() => {
    fetch("http://localhost:8000/api/unsur", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUnsurList(data);
        if (data.length > 0) {
          setQuestionData((prevData) => ({
            ...prevData,
            selectedUnsur: data[0].id_unsur,
          }));
        }
      })
      .catch((error) => console.error("Error fetching unsur:", error));
  }, [token]);

  // Ambil data pertanyaan dari backend
  useEffect(() => {
    fetch("http://localhost:8000/api/pertanyaan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setQuestionsList(data))
      .catch((error) => console.error("Error fetching pertanyaan:", error));
  }, [token]);

  // Handler untuk mengubah nilai input (textarea dan select)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler untuk mengubah nilai opsi jawaban
  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = value;
    setQuestionData((prevData) => ({
      ...prevData,
      options: newOptions,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const postPertanyaanData = {
      pertanyaan: questionData.questionText,
      id_unsur: questionData.selectedUnsur,
    };

    fetch("http://localhost:8000/api/pertanyaan/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postPertanyaanData),
    })
      .then((res) => res.json())
      .then((newQuestion) => {
        const jawabanPromises = questionData.options.map((option, index) => {
          const postJawabanData = {
            deskripsi: option,
            nilai_jawaban: index + 1,
            jawaban: newQuestion.id_pertanyaan,
          };
          return fetch("http://localhost:8000/api/jawaban/store", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postJawabanData),
          }).then((res) => res.json());
        });

        Promise.all(jawabanPromises)
          .then(() => {
            const unsurTerpilih = unsurList.find((unsur) => unsur.id_unsur === newQuestion.id_unsur);
            setQuestionsList((prevList) => [
              ...prevList,
              {
                id_pertanyaan: newQuestion.id_pertanyaan,
                pertanyaan: newQuestion.pertanyaan,
                unsur: {
                  id_unsur: unsurTerpilih.id_unsur,
                  unsur: unsurTerpilih.unsur,
                },
              },
            ]);

            setQuestionData({
              questionText: "",
              selectedUnsur: unsurList.length > 0 ? unsurList[0].id_unsur : "",
              options: ["", "", "", ""],
            });
            alert("Pertanyaan dan jawaban berhasil ditambahkan!");
          })
          .catch((error) => {
            console.error("Error posting jawaban:", error);
            alert("Terjadi kesalahan saat menyimpan jawaban.");
          });
      })
      .catch((error) => {
        console.error("Error posting pertanyaan:", error);
        alert("Terjadi kesalahan saat menyimpan pertanyaan.");
      });
  };

  // Handler untuk edit (saat ini hanya mengupdate state lokal)
  const handleEdit = (id) => {
    const questionToEdit = questionsList.find((q) => q.id_pertanyaan === id || q.id === id);
    setQuestionData(questionToEdit);
    setQuestionsList((prevList) => prevList.filter((q) => q.id_pertanyaan !== id && q.id !== id));
  };

  // Handler untuk hapus (saat ini hanya mengupdate state lokal)
  const handleDelete = (id) => {
    setQuestionsList((prevList) => prevList.filter((q) => q.id_pertanyaan !== id && q.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Tambah Pertanyaan Baru</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Unsur Pertanyaan:</label>
            <select name="selectedUnsur" value={questionData.selectedUnsur} onChange={handleChange} style={styles.select}>
              {unsurList.map((unsur) => (
                <option key={unsur.id_unsur} value={unsur.id_unsur}>
                  {unsur.unsur}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Pertanyaan:</label>
            <textarea name="questionText" value={questionData.questionText} onChange={handleChange} required style={styles.textarea} placeholder="Masukkan pertanyaan di sini..." />
          </div>
          <div style={styles.optionsContainer}>
            <h4 style={styles.subtitle}>Pilihan Jawaban:</h4>
            {questionData.options.map((option, index) => (
              <div key={index} style={styles.optionGroup}>
                <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} placeholder={`Pilihan ${index + 1}`} style={styles.input} />
              </div>
            ))}
          </div>
          <button type="submit" style={styles.submitButton}>
            Simpan Pertanyaan
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
              <tr key={question.id_pertanyaan || question.id}>
                <td style={{ ...styles.td, width: "50px" }}>{index + 1}</td>
                <td style={{ ...styles.td, width: "200px" }}>{question.unsur ? question.unsur.unsur : "-"}</td>
                <td style={{ ...styles.td, width: "400px" }}>{question.pertanyaan}</td>
                <td style={{ ...styles.td, width: "100px" }}>
                  <FontAwesomeIcon icon={faEdit} style={styles.iconEdit} onClick={() => handleEdit(question.id_pertanyaan || question.id)} />
                  <FontAwesomeIcon icon={faTrash} style={styles.iconDelete} onClick={() => handleDelete(question.id_pertanyaan || question.id)} />
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
  container: { padding: "20px", maxWidth: "900px", margin: "0 auto" },
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
  title: { textAlign: "center", color: "#333", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" },
  formGroup: { marginBottom: "25px" },
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
  optionsContainer: { marginTop: "10px" },
  subtitle: { color: "#555", marginBottom: "10px" },
  optionGroup: { marginBottom: "20px" },
  submitButton: {
    padding: "10px",
    width: "250px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },
  table: { width: "100%", borderCollapse: "collapse" },
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
  iconDelete: { color: "#e74c3c", cursor: "pointer" },
};

export default AddQuestion;
