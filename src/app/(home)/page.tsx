import { Button } from '@/components/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">
        一个深入剖析 ahooks 源码与用法的文档站点，帮助开发者更好地理解和应用 ahooks
      </h1>

      <Link href="/docs/ahooks/use-request" className="font-medium underline">
        <Button className="px-5 py-3 text-base rounded-full">开始探索</Button>
      </Link>
    </div>
  )
}
