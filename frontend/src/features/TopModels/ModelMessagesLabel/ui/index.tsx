type Props = {
  x: number;
  y: number;
  messages: number;
}

export default function ModelMessagesLabel({ x, y, messages }: Props) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#ffffff"
      style={{ fontSize: 18, fontWeight: 600 }}
    >
      {`${messages} requests`}
    </text>
  );
}
