"use client";

export function ConnectionStrength({
  level = 4,
  size = 16,
}: {
  level?: number;
  size?: number;
}) {
  // level 0..4
  const bars = [1, 2, 3, 4];
  return (
    <div className='flex items-end space-x-1' style={{ height: size }}>
      {bars.map((b) => (
        <div
          key={b}
          style={{ height: `${(b / 4) * 100}%`, width: size * 0.28 }}
          className={`rounded-sm bg-white/5 border border-white/5 transition-colors ${
            b <= level ? "bg-cyan-400" : "bg-white/5"
          }`}
        />
      ))}
    </div>
  );
}
