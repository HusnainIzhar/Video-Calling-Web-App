import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { MetaData } from "@/utils/MetaData";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import StreamProvider from "../providers/StreamClientProvider";

const inter = Inter({ subsets: ["latin"] });
const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

<MetaData title="chime" description="Calling app" />;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppin.className} bg-theme-dark`}>
        {" "}
        <ClerkProvider
          appearance={{
            variables: {
              colorBackground: "#161b22",
              colorText: "#dbe2e8",
              colorPrimary: "#0d1117",
              colorInputBackground: "#0d1117",
              colorInputText: "#848d97",
              colorTextSecondary: "#848d97",
              colorTextOnPrimaryBackground: "#dbe2e8",
            },
          }}
        >
          <NextTopLoader showSpinner={false} />
          <ToastContainer hideProgressBar theme="#0d1117" autoClose={3000} />
          <StreamProvider>{children}</StreamProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
