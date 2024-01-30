import { MoreVertical } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface CardProps {
  nome: string;
  cargo: string;
  email: string;
  imagem: string;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

import imageProfile from '../assets/profile.png';

export function Card({
  nome,
  cargo,
  email,
  imagem,
  onClick,
  onEdit,
  onDelete,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between rounded-lg bg-white shadow-md items-center relative pt-12"
    >
      <div>
        {imagem === '' ? (
          <img
            src={imageProfile}
            alt=""
            className="rounded-full w-28 h-28 object-cover"
          />
        ) : (
          <img
            src={imagem}
            alt=""
            className="rounded-full w-28 h-28 object-cover"
          />
        )}

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <MoreVertical className="absolute right-4 top-4" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="shadow-md py-2 px-8 fixed top-[-133px] right-[-205px] bg-white rounded-lg">
              <DropdownMenu.Item className="focus:outline-none">
                <button onClick={onEdit}>Editar</button>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="focus:outline-none">
                <button onClick={onDelete}>Excluir</button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold">{nome}</p>
        <p className="text-sm text-cardEmail">{email}</p>
      </div>
      <div className="bg-modal border border-borderCard w-full text-center py-3 mt-4">
        <p>{cargo}</p>
      </div>
    </div>
  );
}
