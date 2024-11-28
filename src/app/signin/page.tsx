"use client";
import { createUser } from "@/services/api/users";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PostUser } from "../usuarios/types";

const SignIn: FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();

	const onSubmit = async(data: PostUser) => {
		console.log("Entrou no onSubmit", data);
		if(data.senha !== data.senhaConfirmacao) {
			alert("Senhas não conferem");
			return;
		}

		if(data.nome === "" || data.email === "" || data.senha === "") {
			alert("Preencha todos os campos");
			return;
		}

		const response = await createUser(data);
		console.log("Response:", response);
		if(response.status === 201) {
			alert("Usuário criado com sucesso!");
			router.push("/login");
		}

		console.error("Erro ao criar usuário:", response);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<h1 className="text-2xl font-bold mb-8">Crie sua conta</h1>
			<form className="w-full max-w-sm">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="name"
					>
						Nome
					</label>
					<input
						id="name"
						type="text"
						placeholder="Digite seu nome"
						className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Digite seu email"
						className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-4 relative">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Senha
					</label>
					<div className="relative">
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Digite sua senha"
							className={`shadow appearance-none border rounded w-full py-2 px-3 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute inset-y-0 right-0 flex items-center px-3"
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
				</div>
				<div className="mb-6 relative">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="confirm-password"
					>
						Confirme sua Senha
					</label>
					<div className="relative">
						<input
							id="confirm-password"
							type={showConfirmPassword ? "text" : "password"}
							placeholder="Confirme sua senha"
							className={`shadow appearance-none border rounded w-full py-2 px-3 pr-12 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className="absolute inset-y-0 right-0 flex items-center px-3"
						>
							{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
				</div>
				<div className="mb-6">
					<button
						type="button"
						className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline`}
						disabled={!name && !email && !password && !confirmPassword}
						onClick={() => onSubmit({
							nome: name,
							email: email,
							senha: password,
							senhaConfirmacao: confirmPassword
						})}
					>
						Confirmar
					</button>
				</div>
			</form>
		</main>
	);
};

export default SignIn;
