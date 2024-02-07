import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FuncionarioForm } from '../components/FuncionarioForm';
import { FuncionarioList } from '../components/FuncionarioList';
import { DetalhesFuncionario } from './DetalhesFuncionario';
import { useFuncionarios } from '../hooks/useFuncionarios';
import { Funcionarios } from '../types/funcionarios';
import { Plus, Search } from 'lucide-react';

export function MainSection() {
  const {
    funcionarios,
    selectedFuncionario,
    setSelectedFuncionario,
    addFuncionario,
    updateFuncionario,
    deleteFuncionario,
  } = useFuncionarios();

  const [modalOpen, setModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [filtroInput, setFiltroInput] = useState('');

  useEffect(() => {
    if (!selectedFuncionario) {
      setShowDetails(false);
    }
  }, [selectedFuncionario]);

  function handleSelect(funcionario: Funcionarios) {
    setSelectedFuncionario(funcionario);
    setShowDetails(true);
  }

  function handleEdit(funcionario: Funcionarios) {
    setSelectedFuncionario(funcionario);
    setIsAdding(false);
    setModalOpen(true);
  }

  function handleDelete(funcionarioId: number) {
    deleteFuncionario(funcionarioId)
      .then(() => {
        setSelectedFuncionario({
          cargo: '',
          email: '',
          id: 0,
          imagem: '',
          nome: '',
          telefone: '',
        });
        setShowDetails(false);
      })
      .catch((error) => {
        console.error('Erro ao deletar funcionário:', error);
      });
  }

  function handleSubmit(funcionario: Funcionarios) {
    if (isAdding) {
      addFuncionario(funcionario).then(() => {
        setSelectedFuncionario({
          cargo: '',
          email: '',
          id: 0,
          imagem: '',
          nome: '',
          telefone: '',
        });
        setShowDetails(false);
      });
    } else {
      updateFuncionario(funcionario);
    }
    setModalOpen(false);
  }

  function clearFields() {
    setSelectedFuncionario({
      cargo: '',
      email: '',
      id: 0,
      imagem: '',
      nome: '',
      telefone: '',
    });
  }

  function handleAddClick() {
    clearFields();
    setIsAdding(true);
    setModalOpen(true);
  }

  function handleFiltroChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFiltroInput(event.target.value);
  }

  const funcionariosFiltrados = funcionarios.filter((funcionario) =>
    funcionario.nome.toLowerCase().includes(filtroInput.toLowerCase())
  );

  return (
    <main className="ml-80 p-16 flex-1 max-sm:ml-0 max-sm:p-8">
      <h1 className="text-3xl font-bold">
        Funcionários{' '}
        <span className="text-gray-400">{funcionarios.length}</span>
      </h1>
      <div className="my-12">
        <div className="flex justify-between max-sm:flex-col max-sm:gap-6">
          <div className="flex items-center bg-input border rounded-md px-6">
            <input
              type="text"
              id="buscar_funcionario"
              name="buscar_funcionario"
              placeholder="Buscar funcionário"
              className="bg-transparent focus:outline-none p-2 max-sm:pr-8"
              value={filtroInput}
              onChange={handleFiltroChange}
            />
            <Search />
          </div>
          <button
            onClick={() => {
              handleAddClick();
              setIsAdding(true);
              setModalOpen(true);
            }}
            className="flex gap-3 bg-button text-white p-3 rounded-md"
          >
            <Plus />
            Adicionar funcionário
          </button>
        </div>
      </div>
      <FuncionarioList
        funcionarios={funcionariosFiltrados}
        onSelect={handleSelect}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-screen	h-screen bg-black bg-opacity-90" />
          <Dialog.Content className="max-sm:w-11/12 w-[50rem] h-auto max-sm:h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-modal p-8  max-sm:p-4 rounded-md">
            <FuncionarioForm
              funcionario={selectedFuncionario}
              onSubmit={handleSubmit}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <DetalhesFuncionario
        showDetails={showDetails}
        funcionario={selectedFuncionario}
      />
    </main>
  );
}
