import { useTheme } from './ThemeProvider'
import { Monitor, Sun, Moon } from 'lucide-react'
import Button from '../Button'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const next = {
    system: 'light',
    light: 'dark',
    dark: 'system',
  }

  const labels = {
    system: <Monitor />,
    light: <Sun />,
    dark: <Moon />,
  }

  return (
    <Button
      size="icon"
      name="Mudar tema"
      onClick={() => setTheme(next[theme])}>
        {labels[theme]}
    </Button>
  )
}
