import * as React from "react"
import Image from "next/image";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export function Logo({ size = 24, className, ...props }: LogoProps) {
  return (
      <>
          <Image width={size} height={size} src={'/image/logo.png'} alt={"Gontobbo"}/>
      </>

  )
}
