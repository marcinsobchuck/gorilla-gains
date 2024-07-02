import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip } from "recharts"

import { Title, Wrapper } from "./ActivitiesPieChart.styled"

const data01 = [
  {
    name: "Endurance",
    value: 36,
  },
  {
    name: "Strength",
    value: 123,
  },
  {
    name: "Flexibility",
    value: 5,
  },
  {
    name: "Balance",
    value: 13,
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
  name,
}: PieLabelRenderProps) => {
  const innerRadiusNum = typeof innerRadius === "number" ? innerRadius : parseFloat(innerRadius)
  const outerRadiusNum = typeof outerRadius === "number" ? outerRadius : parseFloat(outerRadius)
  const cxNum = typeof cx === "number" ? cx : parseFloat(cx)
  const cyNum = typeof cy === "number" ? cy : parseFloat(cy)

  const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 1.1
  const x = cxNum + radius * Math.cos(-midAngle * RADIAN)
  const y = cyNum + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cxNum ? "start" : "end"}
      dominantBaseline='central'
      fontSize={12}
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export const ActivitiesPieChart = () => {
  return (
    <Wrapper direction='column' justify='flex-end'>
      <Title>Activities % overall</Title>
      <ResponsiveContainer height='90%'>
        <PieChart>
          <Pie
            data={data01}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={90}
            strokeWidth={0.2}
            strokeOpacity={1}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data01.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
