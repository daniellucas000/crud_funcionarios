import { Funcionarios } from '../types/funcionarios';

interface DetalhesFuncionarioProps {
  funcionario: Funcionarios | null;
  showDetails: boolean;
}

import imageProfile from '../assets/profile.png';

export function DetalhesFuncionario({
  funcionario,
  showDetails,
}: DetalhesFuncionarioProps) {
  const shouldShowDetails =
    showDetails &&
    funcionario &&
    (funcionario.nome !== '' || funcionario.email !== '');

  return (
    <aside className="flex flex-col items-center w-80 h-screen fixed left-0 top-0 bg-white border-r pt-16 px-4 border-borderCard max-sm:hidden">
      <h1 className="text-3xl font-semibold text-center">Detalhes</h1>

      {shouldShowDetails && showDetails ? (
        <>
          {funcionario?.imagem === '' ? (
            <img
              src={imageProfile}
              alt=""
              className="rounded-full w-56 h-56 object-cover my-4"
            />
          ) : (
            <img
              src={funcionario?.imagem}
              alt=""
              className="rounded-full w-56 h-56 object-cover my-4"
            />
          )}

          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold">{funcionario?.nome}</span>
            <span>{funcionario?.email}</span>
            <span>
              ({funcionario?.telefone.substring(0, 2)}){' '}
              {funcionario?.telefone.substring(2)}
            </span>
            <span>{funcionario?.cargo}</span>
          </div>
        </>
      ) : (
        <p className="text-center mt-6">
          Clique em um funcionário para ver mais detalhes sobre ele.
        </p>
      )}
    </aside>
  );
}
