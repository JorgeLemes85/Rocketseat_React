import React, { useEffect, useState } from "react";
import "./style.css";
import { Card } from "../../components/Card";


export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/JorgeLemes85");
      const data = await response.json();
      console.log("DADOS =>", data);

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  }, []);

  return (

    <div className="container">

      <header>

      <h1>Lista de Presença</h1>

      <div>
        <strong>{user.name}</strong>
        <img src= {user.avatar} alt="git_perfil" />
      </div>
      
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Enviar
      </button>

      {students.map((student) => (
        <Card 
        ket={student.time}
        name={student.name} 
        time={student.time} />
      ))}

    </div>
  );
}
