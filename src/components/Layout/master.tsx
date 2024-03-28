import Head from "next/head";
import React from "react";

interface MasterPageProps {
    children?: React.ReactNode;
    pageTitle: string;
}

function MasterPage({ children, pageTitle }: MasterPageProps) {
    return (
        <main>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            {children}
        </main>
    );
}

export default MasterPage;
