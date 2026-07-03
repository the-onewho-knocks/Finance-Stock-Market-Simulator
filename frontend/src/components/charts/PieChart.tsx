import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface PieChartProps {
  data: { name: string; value: number }[]
  colors?: string[]
  height?: number
}

const DEFAULT_COLORS = ['#7F00FF', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function PieChart({ data, colors = DEFAULT_COLORS, height = 250 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPie>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: '#0d0d0d', border: '1px solid #1f1f1f', borderRadius: 8, fontSize: 12 }}
        />
      </RechartsPie>
    </ResponsiveContainer>
  )
}
