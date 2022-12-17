export const setNameToStorage = (name: string) => {
  sessionStorage.setItem('username', name)
}

export const getNameFromStorage = (): string | null => {
  return sessionStorage.getItem('username')
}