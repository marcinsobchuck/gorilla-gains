import {
  HighlightedText,
  List,
  ListItem,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../ExerciseInfo.styled"
import { InfoItemWrapper } from "../ExerciseDetails/ExerciseDetails.styled"
export const FourActivityTypesInfo = () => {
  return (
    <InfoItemWrapper>
      <SectionTitle>Four key types of physical activity</SectionTitle>
      <SectionDivider>
        <SectionText>
          Physical activity is essential for maintaining a healthy, active lifestyle. Scientific
          studies highlight that a well-rounded exercise routine incorporating endurance, strength,
          balance, and flexibility activities can enhance overall well-being and reduce the risk of
          chronic diseases. By engaging in all four types, you can boost your energy levels, improve
          mental health, and strengthen your body to handle everyday challenges.
        </SectionText>
      </SectionDivider>
      <SectionDivider>
        <SectionText>Here’s why each type matters:</SectionText>
        <List>
          <ListItem>
            <HighlightedText>Endurance</HighlightedText>: Activities like running, cycling, or
            swimming help improve your heart, lungs, and circulatory system, reducing the risk of
            heart disease and diabetes.
          </ListItem>
          <ListItem>
            <HighlightedText>Strength</HighlightedText>: Resistance exercises, such as weightlifting
            or bodyweight exercises, build muscle, protect your bones, and improve mobility.
          </ListItem>
          <ListItem>
            <HighlightedText>Balance</HighlightedText>: Balance-focused exercises, including yoga or
            tai chi, are especially important as you age, helping prevent falls and improve
            coordination.
          </ListItem>
          <ListItem>
            <HighlightedText>Flexibility</HighlightedText>: Stretching or activities like Pilates
            enhance your range of motion, reduce stiffness, and lower the chance of injuries.
          </ListItem>
        </List>
      </SectionDivider>
      <SectionDivider>
        <SectionText>
          The U.S. Department of Health and Human Services recommends at least 150 minutes of
          moderate-intensity aerobic exercise and two days of muscle-strengthening activities
          weekly. Integrating balance and flexibility practices amplifies the benefits, creating a
          comprehensive fitness plan tailored to your needs. Whether you're taking your first step
          or adding variety to your current routine, there’s something for everyone. Let today be
          the start of your journey toward a healthier, happier you!
        </SectionText>
      </SectionDivider>
      <HighlightedText>
        Use the search feature to discover activities that fit your goals and interests.
      </HighlightedText>
    </InfoItemWrapper>
  )
}
