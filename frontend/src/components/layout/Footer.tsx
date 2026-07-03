import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/60 backdrop-blur-xl px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-md bg-accent/20 flex items-center justify-center">
                <span className="text-[10px] font-bold text-accent-light">HF</span>
              </div>
              <span className="text-sm font-semibold text-gray-200">HexaFinance</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
              A professional-grade financial platform with real-time market data, portfolio management,
              AI-powered research, and expense tracking.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="text-gray-600 hover:text-gray-300 transition-colors">Dashboard</Link></li>
              <li><Link to="/market" className="text-gray-600 hover:text-gray-300 transition-colors">Market Heatmap</Link></li>
              <li><Link to="/portfolio" className="text-gray-600 hover:text-gray-300 transition-colors">Portfolio</Link></li>
              <li><Link to="/trade" className="text-gray-600 hover:text-gray-300 transition-colors">Trade</Link></li>
              <li><Link to="/research" className="text-gray-600 hover:text-gray-300 transition-colors">Research</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/news" className="text-gray-600 hover:text-gray-300 transition-colors">Market News</Link></li>
              <li><Link to="/expenses" className="text-gray-600 hover:text-gray-300 transition-colors">Expenses</Link></li>
              <li><Link to="/networth" className="text-gray-600 hover:text-gray-300 transition-colors">Net Worth</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-gray-300 transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Connect</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:contact@hexafinance.app" className="text-gray-600 hover:text-gray-300 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-gray-700">
            &copy; {new Date().getFullYear()} HexaFinance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
