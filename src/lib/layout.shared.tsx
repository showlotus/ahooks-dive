import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'
import logo from '@/app/icon.png'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image src={logo} className="w-5" aria-label="ahooks dive" alt="ahooks dive logo" />
          <span>ahooks dive</span>
        </>
      ),
    },
  }
}
