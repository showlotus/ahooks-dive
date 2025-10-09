export const useBase = (url: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `/ahooks-dive/${url}`
  }
  return `/${url}`
}
