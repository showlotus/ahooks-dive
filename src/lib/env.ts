export const withBasePath = (originalPath: string) => {
  return (
    process.env.NODE_ENV === 'production' ? '/ahooks-dive' + originalPath : originalPath
  ).replace(/\/\//g, '/')
}
