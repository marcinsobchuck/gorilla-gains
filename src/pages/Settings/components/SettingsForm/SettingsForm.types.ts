import * as yup from "yup"

import { settingsFormSchema } from "./config"

export type SettingsFormValues = yup.InferType<typeof settingsFormSchema>
