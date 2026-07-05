import { ThemeProvider } from "@/components/ThemeProvider";

export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Dark Mode</h1>

      <ThemeProvider>
      <p>hello</p>
    </ThemeProvider>
    </main>
  );
}