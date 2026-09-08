import { redirect } from 'next/navigation'
export const metadata = { title: 'Appliances — South Grant' }
export default function Appliances() { redirect('/category/refrigerators') }
