import Link from "next/link";
import React from "react";
import { NavigationProps } from "./types";

export const Navigation: React.FC<NavigationProps> = ({ hasToken }) => {
	return (
		<nav className="flex items-center m-auto max-w-screen-xl">
			<ul className="flex items-center justify-between gap-10">
				<li>
					<Link
						href="/"
						className="hover:text-blue-500 hover:transition-colors duration-200"
					>
						Home
					</Link>
				</li>
				<li>
					{hasToken ? (
						<Link
							href="/usuarios"
							className="hover:text-blue-500 hover:transition-colors duration-200"
						>
							Usuários
						</Link>
					) : (
						<span className="text-gray-400 cursor-not-allowed">Usuários</span>
					)}
				</li>
			</ul>
		</nav>
	);
};
