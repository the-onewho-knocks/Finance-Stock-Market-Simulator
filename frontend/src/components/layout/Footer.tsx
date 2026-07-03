export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl px-6 py-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">HexaFinance &copy; {new Date().getFullYear()}</span>
        <div className="flex items-center gap-4 text-gray-600">
          <span>React &middot; Go &middot; Python</span>
          <span className="h-3 w-px bg-white/5" />
          <span>Finnhub &middot; PostgreSQL</span>
        </div>
      </div>
    </footer>
  )
}
