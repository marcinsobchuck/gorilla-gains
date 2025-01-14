// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omitKeysFromObject = (obj: Record<string, any>, keysToOmit: string[]) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => !keysToOmit.includes(key)))
