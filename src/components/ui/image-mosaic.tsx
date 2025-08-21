import React from "react";

type Props = {
  images: string[];
  className?: string;
};

export default function ImageMosaic({ images, className }: Props) {
  const pics = images?.filter(Boolean) ?? [];
  const p5 = pics.slice(0, 5);
  const cls = ["w-full overflow-hidden rounded-2xl", className].filter(Boolean).join(" ");

  if (p5.length === 0) {
    return <div className={cls} />;
  }

  // 1장: 전체 규격
  if (p5.length === 1) {
    return (
      <div className={cls}>
        <div className="relative w-full aspect-[16/10]">
          <img src={p5[0]} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  // 2장: 가로로 이어붙여 큰 사각형처럼
  if (p5.length === 2) {
    return (
      <div className={cls}>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-2 gap-0">
            <div className="w-full h-full">
              <img src={p5[0]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-full">
              <img src={p5[1]} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3~4장: 2열 그리드
  if (p5.length < 5) {
    return (
      <div className={[cls, "grid gap-2 md:grid-cols-2"].join(" ")}>
        {p5.map((src, i) => (
          <div key={i} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
            <img src={src} alt={`img-${i}`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  // 5장 이상: 좌측 큰 사진 + 우측 2x2
  return (
    <div className={["grid gap-2 md:grid-cols-3 w-full overflow-hidden", className].join(" ")}>
      <div className="md:col-span-2 md:row-span-2">
        <div className="relative w-full h-full md:aspect-[4/3] aspect-[16/10] rounded-2xl overflow-hidden">
          <img src={p5[0]} alt="main" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {p5.slice(1, 5).map((src, i) => (
          <div key={i} className="relative w-full aspect-square rounded-2xl overflow-hidden">
            <img src={src} alt={`thumb-${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}