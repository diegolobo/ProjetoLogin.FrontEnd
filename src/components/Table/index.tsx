import React, { memo } from 'react';
import { TableProps } from './types';

const Table: React.FC<TableProps> = ({ users }) => {
  return (
    <table className="w-full shadow-md rounded- overflow-hidden bg-white">
      <thead>
        <tr>
          <th className="w-1/5 border-t border-l text-black/75 border-gray-300 p-1">Id</th>
          <th className="w-1/5 border-t border-l text-black/75 border-gray-300 p-2">Nome</th>
          <th className="w-1/5 border-t border-l text-black/75 border-gray-300 p-2">Email</th>
          <th className="w-1/5 border-t border-l text-black/75 border-gray-300 p-2">Tipo do Usuario</th>
          <th className="w-1/5 border-t border-l border-r text-black/75 border-gray-300 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} className="hover:bg-gray-100">
            <td className="border-t border-l text-black/75 border-gray-300 p-2 pr-5 text-right">{user.id}</td>
            <td className="border-t border-l text-black/75 border-gray-300 p-2">{user.nome}</td>
            <td className="border-t border-l text-black/75 border-gray-300 p-2">{user.email}</td>
            <td className="border-t border-l text-black/75 border-gray-300 p-2">{user.tipoUsuario}</td>
            <td className="border-t border-l border-r text-black/75 border-gray-300 p-2">{user.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(Table);
