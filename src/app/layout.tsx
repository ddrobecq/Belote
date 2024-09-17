import type { Metadata } from "next";
import React from "react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ThemeModeContextProvider from '@/theme/theme-context';
import Footer from "@/app/home/footer";
import Header from "@/app/home/header";
import { Stack } from "@mui/material";

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
            <Stack margin={1} >
              {children}
            </Stack>
            <Footer />
          </ThemeModeContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
