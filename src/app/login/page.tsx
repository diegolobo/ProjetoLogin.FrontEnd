"use client";
import { setAccessToken } from "@/commons/storage/accessToken";
import { authenticate } from "@/services/api/users";
import { checkUserAuthenticated } from "@/utils/checkUserAuthenticated";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { schema } from "./schema";
import { FormData } from "./types";

const Login: FC = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try{
      const token = await authenticate(email, password)
      if (token) {
        setAccessToken(token.toString());

        if(checkUserAuthenticated()){
          router.push("/usuarios");
          setAuthError(null);
        }        
      } else {
        setAuthError("Email ou senha inválidos");
      }
    }catch(err){
      console.log(err)
    }
  };

  const finalErrorMessage = errors.password?.message || authError;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Login</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            id="email"
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-12 right-0 pr-3 flex items-center"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          {finalErrorMessage && !errors.password && (
            <p className="text-red-500 text-xs mt-1">{finalErrorMessage}</p>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Entrar
          </button>
          <p className="text-center">ou</p>
          <Link href="/signin">
            <button
              className="bg-white hover:bg-slate-50 text-black/80 font-semibold border py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              type="button"
            >
              Criar uma conta
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
