import './globals.css'
import { CartProvider } from './components/CartContext'

export const metadata = { title: 'South Grant — Considered living', description: 'Considered appliances and furniture for modern living.' }

export default function RootLayout({ children }) {
  return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html>
}
