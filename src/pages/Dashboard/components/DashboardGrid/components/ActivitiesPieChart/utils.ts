export const getPieChartColor = (
  activityType: string,
  colors: {
    endurance: string
    strength: string
    flexibility: string
    balance: string
  }
) => {
  switch (activityType) {
    case "endurance":
      return colors.endurance
    case "strength":
      return colors.strength
    case "flexibility":
      return colors.flexibility
    case "balance":
      return colors.balance
  }
}
