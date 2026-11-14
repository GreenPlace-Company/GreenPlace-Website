"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: readonly string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="space-y-3">
      <Image
        src={current}
        alt={`${name}, image ${active + 1} of ${images.length}`}
        width={800}
        height={800}
        priority
        unoptimized
        className="aspect-square w-full rounded-3xl border border-sand bg-paper object-cover"
      />
      {images.length > 1 ? (
        <div role="group" aria-label="Product images" className="flex gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-pressed={index === active}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              onClick={() => setActive(index)}
              className={`overflow-hidden rounded-2xl border ${
                index === active ? "border-pine" : "border-sand"
              }`}
            >
              <Image
                src={src}
                alt=""
                width={96}
                height={96}
                unoptimized
                className="h-20 w-20 object-cover sm:h-24 sm:w-24"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
