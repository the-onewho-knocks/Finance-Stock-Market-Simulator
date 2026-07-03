import { BarChart as RechartsBar, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface BarChartProps {
  data: { label: string; value: number }[]
  color?: string
  height?: number
}

export function BarChart({ data, color = '#7F00FF', height = 250 }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data}>
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#0d0d0d', border: '1px solid #1f1f1f', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#9ca3af' }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBar>
    </ResponsiveContainer>
  )
}
