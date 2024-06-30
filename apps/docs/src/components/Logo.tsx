import Image from "next/image";

import logo from '@/images/logo.png';

export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Image src={logo} alt="Dust/Player" className="w-10" />
      <div className="flex text-xl">
        <span>@Dust/</span>
        <span className="text-blue-700">Player</span>
      </div>
    </div>
  )
}
