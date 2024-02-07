import { useState, useEffect } from 'react';
import { Funcionarios } from '../types/funcionarios';

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionarios>({
    cargo: '',
    email: '',
    id: 0,
    imagem: '',
    nome: '',
    telefone: '',
  });
  useEffect(() => {
    async function getFuncionarios() {
      try {
        const response = await fetch('http://localhost/projeto/back-end/');
        const data = await response.json();

        const funcionariosArray = Object.values(data.records) as Funcionarios[];

        setFuncionarios(funcionariosArray);
      } catch (error) {
        console.error('Erro ao obter funcionários:', error);
      }
    }

    getFuncionarios();
  }, [funcionarios]);

  async function addFuncionario(funcionario: Funcionarios) {
    try {
      const response = await fetch(
        'http://localhost/projeto/back-end/cadastrar_funcionarios.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(funcionario),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      console.log(responseBody);
    } catch (error) {
      console.error('Erro ao adicionar funcionário:', error);
    }
  }

  async function updateFuncionario(funcionario: Funcionarios) {
    try {
      const response = await fetch(
        `http://localhost/projeto/back-end/editar_funcionarios.php?id=${funcionario.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(funcionario),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      console.log(responseBody);
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
    }
  }

  async function deleteFuncionario(funcionarioId: number) {
    try {
      const response = await fetch(
        `http://localhost/projeto/back-end/excluir_funcionarios.php?id=${funcionarioId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      console.log(responseBody);
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error);
      throw error;
    }
  }

  return {
    funcionarios,
    selectedFuncionario,
    setSelectedFuncionario,
    addFuncionario,
    updateFuncionario,
    deleteFuncionario,
  };
}
