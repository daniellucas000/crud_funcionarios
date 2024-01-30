import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Plus, Search } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Card } from './Card';
import { DetalhesFuncionario } from './DetalhesFuncionario';

export interface Funcionarios {
  cargo: string;
  email: string;
  id: number;
  imagem: string;
  nome: string;
  telefone: string;
}

export function MainSection() {
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const [selectedFuncionario, setSelectedFuncionario] =
    useState<Funcionarios | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [value, setValue] = useState({
    nome: '',
    imagem: '',
    email: '',
    telefone: '',
    cargo: '',
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

  function inputValue(e: ChangeEvent<HTMLInputElement>) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(value.nome);

    try {
      const response = await fetch(
        'http://localhost/projeto/back-end/cadastrar_funcionarios.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      console.log(responseBody);

      const data = JSON.parse(responseBody);
      console.log(data);
    } catch (error) {
      console.error('Erro ao processar a resposta do servidor:', error);
    }
    setModalOpen(false);
  }

  function handleClickCard(funcionario: Funcionarios) {
    setSelectedFuncionario(funcionario);
  }

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost/projeto/back-end/editar_funcionarios.php?id=${selectedFuncionario?.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      const data = JSON.parse(responseBody);
      console.log(data);
    } catch (error) {
      console.error('Erro ao processar a resposta do servidor:', error);
    }
    setModalOpen(false);
  }

  function handleEdit(funcionario: Funcionarios) {
    setValue({
      nome: funcionario.nome,
      imagem: funcionario.imagem,
      email: funcionario.email,
      telefone: funcionario.telefone,
      cargo: funcionario.cargo,
    });
    setSelectedFuncionario(funcionario);
    setModalOpen(true);
  }

  function clearFields() {
    setValue({
      nome: '',
      imagem: '',
      email: '',
      telefone: '',
      cargo: '',
    });
  }

  async function handleDelete(funcionarioId: number) {
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
      console.error('Erro ao processar a resposta do servidor:', error);
    }
  }

  return (
    <main className="ml-80 p-16 flex-1 max-sm:ml-0 max-sm:p-8 ">
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
            />
            <Search />
          </div>
          <button
            onClick={() => {
              clearFields();
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

      <section className="grid grid-cols-4 gap-4 max-sm:grid-cols-1">
        {funcionarios.map((funcionario) => (
          <Card
            key={funcionario.id}
            nome={funcionario.nome}
            email={funcionario.email}
            cargo={funcionario.cargo}
            imagem={funcionario.imagem}
            onClick={() => handleClickCard(funcionario)}
            onEdit={() => handleEdit(funcionario)}
            onDelete={() => handleDelete(funcionario.id)}
          />
        ))}
      </section>

      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-screen	h-screen bg-black bg-opacity-90" />
          <Dialog.Content className="max-sm:w-11/12 w-[50rem] h-[70vh] max-sm:h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-modal p-8  max-sm:p-4 rounded-md">
            <div>
              <header>
                <h2 className="text-2xl font-bold text-center">
                  Adicionar novo funcionário
                </h2>

                <form
                  className="flex flex-col mt-16 gap-4"
                  onSubmit={isAdding ? handleSubmit : handleUpdate}
                >
                  <fieldset className="flex justify-between gap-8 max-sm:flex-col">
                    <div className="flex flex-col w-full gap-2">
                      <label className="font-semibold" htmlFor="nome">
                        NOME
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="border rounded-md p-2 focus:outline-none bg-input"
                        onChange={inputValue}
                        required
                        value={value.nome}
                      />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                      <label className="font-semibold" htmlFor="cargo">
                        CARGO
                      </label>
                      <input
                        type="text"
                        id="cargo"
                        name="cargo"
                        className="border rounded-md p-2 focus:outline-none bg-input"
                        onChange={inputValue}
                        required
                        value={value.cargo}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="flex justify-between gap-8 max-sm:flex-col">
                    <div className="flex flex-col w-full gap-2">
                      <label className="font-semibold" htmlFor="email">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        className="border rounded-md p-2 focus:outline-none bg-input"
                        onChange={inputValue}
                        required
                        value={value.email}
                      />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                      <label className="font-semibold" htmlFor="telefone">
                        TELEFONE
                      </label>
                      <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        className="border rounded-md p-2 focus:outline-none bg-input"
                        onChange={inputValue}
                        required
                        value={value.telefone}
                      />
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-col gap-2">
                    <label className="font-semibold" htmlFor="imagem">
                      IMAGEM
                    </label>
                    <input
                      type="text"
                      id="imagem"
                      name="imagem"
                      className="border rounded-md p-2 focus:outline-none bg-input"
                      onChange={inputValue}
                      value={value.imagem}
                    />
                  </fieldset>
                  <div className="flex justify-center">
                    <button
                      className="bg-button text-white py-3 px-12 rounded-md"
                      type="submit"
                    >
                      Salvar Detalhes
                    </button>
                  </div>
                </form>
              </header>
            </div>

            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <DetalhesFuncionario funcionario={selectedFuncionario} />
    </main>
  );
}
