import { Card, CardTitle } from '../../components/ui/Card'

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-100">Alerts</h1>
      <Card className="bg-[#0d0d0d] border-[#1f1f1f]">
        <CardTitle>Price Alerts</CardTitle>
        <p className="mt-2 text-sm text-gray-500">Set price alerts for your watchlist symbols. Coming soon.</p>
      </Card>
    </div>
  )
}
