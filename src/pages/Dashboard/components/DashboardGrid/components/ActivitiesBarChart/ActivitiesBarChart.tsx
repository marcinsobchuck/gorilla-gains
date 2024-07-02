import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "styled-components"

import { Title, Wrapper } from "../ActivitiesPieChart/ActivitiesPieChart.styled"

const data = [
  {
    name: "Jan",
    pv: 6,
  },
  {
    name: "Feb",
    pv: 8,
  },
  {
    name: "Mar",
    pv: 12,
  },
  {
    name: "Apr",
    pv: 8,
  },
  {
    name: "May",
    pv: 7,
  },
  {
    name: "Jun",
    pv: 10,
  },
  {
    name: "Jul",
    pv: 13,
  },
  {
    name: "Aug",
    pv: 13,
  },
  {
    name: "Sep",
    pv: 12,
  },
  {
    name: "Oct",
    pv: 6,
  },
  {
    name: "Nov",
    pv: 2,
  },
  {
    name: "Dec",
    pv: 4,
  },
]

export const ActivitiesBarChart = () => {
  const theme = useTheme()
  return (
    <Wrapper direction='column' justify='flex-end'>
      <Title>Activities per month</Title>
      <ResponsiveContainer height='90%'>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeWidth={0.3} />
          <XAxis dataKey='name' interval={0} fontSize={12} />
          <YAxis axisLine={false} tickLine={false} fontSize={12} width={30} />
          <Tooltip />
          <Bar dataKey='pv' fill={theme.secondary} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}
