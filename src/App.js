import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    try {
      const { data: response } = await api.post("repositories", {
        title: "desafio-conceitos-reactjs",
        url: "https://github.com/louzada01/gostack-desafio-conceitos-reactjs",
        techs: ["ReactJs", "React", "ES6", "JavaScritp"],
      });

      setRepositories([...repositories, response]);
    } catch (error) {
      alert("Is not possible add repository - " + error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const newRepositories = repositories.filter(
        repository => repository.id !== id
      )
      setRepositories(newRepositories)
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
