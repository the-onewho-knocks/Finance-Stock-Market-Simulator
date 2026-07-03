import type { StockPrice } from '../types'

interface MarketTableProps {
  data: StockPrice[]
}

export function MarketTable({ data }: MarketTableProps) {
  if (!data.length) return <p className="text-sm text-gray-500">No data</p>

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[#1f1f1f] text-left text-xs text-gray-500">
            <th className="pb-2 pr-4 font-medium">Symbol</th>
            <th className="pb-2 pr-4 font-medium">Price</th>
            <th className="pb-2 pr-4 font-medium">Change</th>
            <th className="pb-2 pr-4 font-medium">%</th>
            <th className="pb-2 font-medium">Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const isUp = row.change >= 0
            return (
              <tr key={row.symbol} className="border-b border-[#1f1f1f]/50 text-gray-300">
                <td className="py-2.5 pr-4 font-medium text-gray-100">{row.symbol}</td>
                <td className="py-2.5 pr-4">${row.price.toFixed(2)}</td>
                <td className={isUp ? 'py-2.5 pr-4 text-green-400' : 'py-2.5 pr-4 text-red-400'}>{isUp ? '+' : ''}{row.change.toFixed(2)}</td>
                <td className={isUp ? 'py-2.5 pr-4 text-green-400' : 'py-2.5 pr-4 text-red-400'}>{isUp ? '+' : ''}{row.change_percent.toFixed(2)}%</td>
                <td className="py-2.5">{(row.volume / 1_000_000).toFixed(1)}M</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
