import { Card, CardTitle } from '../../components/ui/Card'

export default function AlertsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-lg font-semibold text-gray-100">Alerts</h1>
      <Card>
        <CardTitle>Price Alerts</CardTitle>
        <p className="mt-2 text-sm text-gray-500">Set price alerts for your watchlist symbols. Coming soon.</p>
      </Card>
    </div>
  )
}
