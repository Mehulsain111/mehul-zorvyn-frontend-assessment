import Button from "./Button.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useApp();

  return (
    <Button
      variant="default"
      onClick={() => setDarkMode((v) => !v)}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
