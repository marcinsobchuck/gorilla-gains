import { Input } from "@components/Input/Input"

import { accountInformationInputsData } from "./config"

export const Credentials = () =>
  accountInformationInputsData.map((input) => {
    const { id, label, type } = input

    return <Input key={id} id={id} label={label} type={type} />
  })
