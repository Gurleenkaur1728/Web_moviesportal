import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">IMR Movie Portal</h1>
        <ul className="flex gap-4">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
