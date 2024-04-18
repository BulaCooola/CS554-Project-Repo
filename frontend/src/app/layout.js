import "./globals.css";
import AuthProvider from "./(components)/AuthProvider";

export const metadata = {
  title: "Tourney Pro",
  description: "Welcome to the next gen of battles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          {children}
          </body>
      </AuthProvider>
    </html>
  );
}
