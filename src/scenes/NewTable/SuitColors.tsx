export const SuitColors: React.FC<{ colors: string[][] }> = ({ colors }) => {
  const colorArrs = colors
  return (
    <svg width={0} height={0}>
      <defs>
        {colorArrs.map((colorArr, i) => (
          <linearGradient key={`suit${i}`} id={`suit${i}`} x1="0" x2="1" y1="0" y2="1">
            {colorArr.map((color, j, arr) => (
              <stop
                offset={`${(j / (arr.length - 1)) * 100}%`}
                key={`suit${i}${j}${color}`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        ))}
      </defs>
    </svg>
  )
}
