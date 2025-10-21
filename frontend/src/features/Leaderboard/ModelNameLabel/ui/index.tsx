type Props = {
  x: number;
  y: number;
  name: string;
}

export default function ModelNameLabel({ x, y, name }: Props) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#ffffff"
      style={{ fontSize: 17, fontWeight: 600 }}
    >
      {name}
    </text>
  );
}
