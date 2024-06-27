interface GetItemsParams {
  BMI: string
  BMR: string
  TDEE: string
  PAL: string
}

const calculateBMR = (gender: string, weight: number, height: number, age: number) => {
  //https://www.omnicalculator.com/health/bmr-harris-benedict-equation
  if (gender === "male") {
    return 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age
  } else {
    return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age
  }
}

export const getItems = ({ BMI, BMR, TDEE, PAL }: GetItemsParams) => [
  {
    label: "BMI",
    value: BMI,
    tooltipInfo:
      "The BMI is a useful index that measures whether you are overweight, underweight, or just right. However, please remember that BMI is a rough estimation. The result can be somewhat misleading for individuals who are well-muscled (such as bodybuilders) or for those who have lost a significant amount of muscle (such as the elderly).",
    source: "https://www.omnicalculator.com/health/bmi",
  },
  {
    label: "BMR",
    value: BMR,
    tooltipInfo:
      "Your basal metabolic rate (BMR) is equivalent to the amount of energy (in the form of calories) that your body needs to function if it were to rest for 24 hours.",
    source: "https://www.omnicalculator.com/health/bmr-harris-benedict-equation",
  },
  {
    label: "TDEE",
    value: TDEE,
    tooltipInfo:
      "Total daily energy expenditure is the energy burnt on average during an entire day. It reflects the average amount of energy spent during a typical day, but it is not the same each and every day. It is because our TDEE depends on many different factors, such as basal metabolism, metabolic response of food, physical activity or physiological state.",
    source: "https://www.omnicalculator.com/health/tdee",
  },
  {
    label: "PAL",
    value: PAL,
    tooltipInfo:
      "The physical activity level (PAL) is a way to express a person's daily physical activity as a number and is used to estimate their total energy expenditure. Typically ranging from 1.2 to 2.4 (the higher the more active)",
    source: "https://en.wikipedia.org/wiki/Physical_activity_level",
  },
]

export const getHealthMetrics = (
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: number
) => {
  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1)
  const BMR = calculateBMR(gender, weight, height, age).toFixed(1)
  const TDEE = (+BMR * activityLevel).toFixed(1)
  const PAL = (+TDEE / +BMR).toFixed(1)

  return {
    BMI,
    BMR,
    TDEE,
    PAL,
  }
}
