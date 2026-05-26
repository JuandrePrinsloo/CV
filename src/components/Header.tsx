import { Link } from 'react-router-dom'
import { Button } from './ui/button'

function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container flex items-center justify-between py-4">
        <div>
          <Link to="/" className="text-2xl font-bold">
            My App
          </Link>
        </div>
        <nav className="flex gap-6">
          <Link to="/" className="text-foreground hover:text-primary">
            Home
          </Link>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  )
}

export default Header

