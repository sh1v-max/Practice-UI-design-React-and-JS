export default function Signal({ color, isActive, size = "normal" }) {
  return (
    <div
      className={`signal signal-${size} ${isActive ? 'signal-active' : 'signal-inactive'}`}
      data-color={color}
    >
      <div className="signal-glow"></div>
    </div>
  );
}