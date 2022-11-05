import Head from "next/head";
import React, { PropsWithChildren, FC } from "react";
import { Navbar } from "../ui/Navbar";

type props = PropsWithChildren & {
    title?: string;
};

const MainLayout: FC<props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || "Íñigo Aréjula"}</title>
                <meta name="author" content="Íñigo Aréjula" />
                <meta
                    name="description"
                    content={`web personal de Íñigo Aréjula Aísa. Contiene una descripción,
                    portfolio, trayectoria y blog`}
                />
                <meta
                    name="keywords"
                    content={`${title}, blog, portfolio, Íñigo Aréjula`}
                />
            </Head>
            <Navbar />
            <main
                style={{
                    padding: "0px 20px",
                }}
            >
                {children}
            </main>
        </>
    );
};

export { MainLayout };
