import * as React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

const StatChart = ({ title, data, yKey, color, yMax }) => (
  <div className="chartContainer">
    <h3>{title}</h3>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 15 }}>
        <Tooltip
          formatter={(value) => `${value.toFixed(5)}`}
          labelFormatter={(time) => dayjs(time).format(`llll`)}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={3}
          dot={false}
          isAnimationActive={false}
        />
        <XAxis
          dataKey="proposedTime"
          tickFormatter={(time) => dayjs(time).format(`YYYY-MM-DD`)}
          minTickGap={20}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          interval={0}
          domain={[
            (dataMin) => Math.floor(dataMin / yMax) * yMax,
            (dataMax) => Math.ceil(dataMax / yMax) * yMax,
          ]}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  </div>
)

export default StatChart
