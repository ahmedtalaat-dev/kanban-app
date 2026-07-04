import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Dark Mode</h1>

      <ThemeToggle />
    </main>
  );
}