"use client";
import { Pagination } from "@/components/Pagination";
import Table from "@/components/Table";
import { fetchUsers } from "@/services/api/users";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaSearch, FaTrash } from "react-icons/fa";
import { PaginationConfig, User } from "./types";

const Usuarios: FC = () => {
  const [id, setId] = useState<number>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [userType, setUserType] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [pageNumber, setPageNumber] = useState<number>();
  const [pageSize, setPageSize] = useState<number>();
  const [order, setOrder] = useState<string>();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(1);

  const itemsPerPage = PaginationConfig.ITEMS_PER_PAGE;

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      userType: "",
      status: "",
    },
  });

  const idFilter = watch("id");
  const nameFilter = watch("name");
  const emailFilter = watch("email");
  const userTypeFilter = watch("userType");
  const statusFilter = watch("status");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUsers(id, name, email, userType, status, pageNumber, pageSize, order);
        setUsers(data.users);
        setFilteredUsers(data.users);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUserData();
  }, []);

  const clearFilters = () => {
    reset();
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const submit = async() => {
    try {
        setPageSize(itemsPerPage);
        setPageNumber(currentPage);
        const data = await fetchUsers(id, name, email, userType, status, pageNumber, pageSize, order);
        setUsers(data.users);
        setFilteredUsers(data.users);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-24 bg-gray-50">
      <h1 className="text-2xl text-black/75 font-bold mb-4">Buscar Usuários</h1>
      <div className="mb-4 flex items-center">
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              placeholder="Filtrar por identificador"
              {...field}
              className="border rounded-md outline-none border-gray-300 p-2 mr-2"
              onChange={() => setId(Number(idFilter))}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Filtrar por nome"
              {...field}
              className="border rounded-md outline-none border-gray-300 p-2 mr-2"
              onChange={() => setName(nameFilter)}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Filtrar por e-mail"
              {...field}
              className="border rounded-md outline-none border-gray-300 p-2 mr-2"
              onChange={() => setEmail(emailFilter)}
            />
          )}
        />
        <Controller
          name="userType"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Filtrar por Tipo de Usuário"
              {...field}
              className="border rounded-md outline-none border-gray-300 p-2 mr-2"
              onChange={() => setUserType(userTypeFilter)}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="Filtrar por Status do Usuário"
              {...field}
              className="border rounded-md outline-none border-gray-300 p-2 mr-2"
              onChange={() => setStatus(statusFilter)}
            />
          )}
        />
        <button
          onClick={() => submit()}
          className="flex items-center text-black/75 rounded-md p-2 font-medium"
        >
          <FaSearch className="mr-2" />
          Filtrar usuários
        </button>
        <button
          onClick={clearFilters}
          className="flex items-center text-black/75 border rounded-md p-2 font-medium ml-2 hover:bg-gray-100"
        >
          <FaTrash className="mr-2" />
          Limpar filtros
        </button>
      </div>
      {users.length === 0 ? (
        <p className="text-gray-500">Nenhum usuário encontrado</p>
      ) : (
        <>
          <Table users={users} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <br />
          <p>Página {pageNumber} de {totalPages} páginas com {totalItems} Usuário(s)</p>
        </>
      )}
    </div>
  );
};

export default Usuarios;
