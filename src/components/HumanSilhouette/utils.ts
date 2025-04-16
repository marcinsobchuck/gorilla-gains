export const getClassesString = (arr: string[]) => {
  return arr.map((el) => `.${el}`).join(", ")
}

export const addClassToElements = (elements: NodeListOf<Element>, className: string) => {
  elements.forEach((el) => el.classList.add(className))
}
export const removeClassFromElements = (elements: NodeListOf<Element>, className: string) => {
  elements.forEach((el) => el.classList.remove(className))
}
