import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface MasterPageProps {
    children?: React.ReactNode;
}

export default function MasterPage({ children }: MasterPageProps) {
    return <main className={`${poppins.variable}`}>{children}</main>;
}
