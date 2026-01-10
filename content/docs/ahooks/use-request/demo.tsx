'use client'

import { useRequest } from 'ahooks'

function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Math.random().toString())
    }, 1000)
  })
}

export default function Demo() {
  const { data, error, loading } = useRequest(getUsername)

  if (error) {
    return <div>failed to load</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return <div>Username: {data}</div>
}
