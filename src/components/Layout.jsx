import Nav from "./Nav";
import Footer from "./Footer";
export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className="pt-16 bg-white dark:bg-gray-950 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
