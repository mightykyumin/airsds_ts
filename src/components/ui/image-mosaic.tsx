import React from "react"

type Props = {
  images: string[]
  className?: string
}

export default function ImageMosaic({ images, className }: Props) {
  const pics = images?.filter(Boolean) ?? []
  const p5 = pics.slice(0, 5)

  if (p5.length <= 1) {
    return (
      <div className={["w-full overflow-hidden rounded-2xl", className].join(" ")}>
        <div className="relative w-full aspect-[16/10]">
          <img src={p5[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    )
  }

  if (p5.length < 5) {
    return (
      <div className={["w-full overflow-hidden rounded-2xl grid gap-2 md:grid-cols-2", className].join(" ")}>
        {p5.map((src, i) => (
          <div key={i} className="relative w-full aspect-[4/3]">
            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={["grid gap-2 md:grid-cols-3 w-full overflow-hidden", className].join(" ")}>
      <div className="md:col-span-2 md:row-span-2">
        <div className="relative w-full h-full md:aspect-[4/3] aspect-[16/10] rounded-2xl">
          <img src={p5[0]} alt="" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {p5.slice(1, 5).map((src, i) => (
          <div key={i} className="relative w-full aspect-square">
            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  )
}