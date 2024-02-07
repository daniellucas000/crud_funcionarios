import { useState, FormEvent } from 'react';
import { Funcionarios } from '../types/funcionarios';
interface Props {
  funcionario?: Funcionarios;
  onSubmit: (funcionario: Funcionarios) => void;
}

export function FuncionarioForm({ funcionario, onSubmit }: Props) {
  const [value, setValue] = useState<Funcionarios>(
    funcionario || {
      cargo: '',
      email: '',
      id: 0,
      imagem: '',
      nome: '',
      telefone: '',
    }
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center m-6">
        Adicionar novo funcionário
      </h2>
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
            value={value.nome}
            onChange={handleChange}
            required
            autoComplete="off"
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
            value={value.cargo}
            onChange={handleChange}
            required
            autoComplete="off"
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
            className="border rounded-md p-2 focus:outline-none bg-input"
            value={value.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold" htmlFor="telefone">
            TELEFONE
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            className="border rounded-md p-2 focus:outline-none bg-input"
            value={value.telefone}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <div className="flex flex-col w-full gap-2">
          <label className="font-semibold" htmlFor="imagem">
            IMAGEM
          </label>
          <input
            type="text"
            id="imagem"
            name="imagem"
            className="border rounded-md p-2 focus:outline-none bg-input"
            value={value.imagem}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
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
  );
}
