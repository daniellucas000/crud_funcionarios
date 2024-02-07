import { Funcionarios } from '../types/funcionarios';
import { Card } from './Card';

interface Props {
  funcionarios: Funcionarios[];
  onSelect: (funcionario: Funcionarios) => void;
  onEdit: (funcionario: Funcionarios) => void;
  onDelete: (funcionarioId: number) => void;
}

export function FuncionarioList({
  funcionarios,
  onSelect,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {funcionarios.map((funcionario) => (
        <Card
          key={funcionario.id}
          nome={funcionario.nome}
          email={funcionario.email}
          cargo={funcionario.cargo}
          imagem={funcionario.imagem}
          onClick={() => onSelect(funcionario)}
          onEdit={() => onEdit(funcionario)}
          onDelete={() => onDelete(funcionario.id)}
        />
      ))}
    </section>
  );
}
