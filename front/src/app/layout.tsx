import type { Metadata } from "next";
import React from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ThemeModeContextProvider from '@/theme/theme-context';
import Menu from "@/app/home/components/menu";
import Header from "@/app/home/components/header";
import { Stack } from "@mui/material";
import GameContextProvider from "@/app/game/components/game-context";

export const metadata: Metadata = {
	title: "Belote",
	description: "",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
	return (
		<html lang="fr">
			<body >
				<AppRouterCacheProvider>
					<ThemeModeContextProvider>
						<Header />
						<GameContextProvider team1='Eux' team2='Nous' >
							<Stack margin={1} >
								{children}
							</Stack>
						</GameContextProvider>
						<Menu />
					</ThemeModeContextProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
