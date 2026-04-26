interface SkillChipProps {
  label: string;
  verified?: boolean;
  size?: "sm" | "md";
  onRemove?: () => void;
}

export default function SkillChip({ label, verified = false, size = "md", onRemove }: SkillChipProps) {
  const isSmall = size === "sm";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: isSmall ? 4 : 5,
      fontSize: isSmall ? 11 : 12, fontWeight: 600,
      padding: isSmall ? "3px 9px" : "5px 12px",
      borderRadius: 999,
      background: verified ? "rgba(34,197,94,0.09)" : "rgba(42,111,191,0.09)",
      border: `1px solid ${verified ? "rgba(34,197,94,0.22)" : "rgba(42,111,191,0.20)"}`,
      color: verified ? "#16a34a" : "#2A6FBF",
      whiteSpace: "nowrap" as const,
    }}>
      <span style={{ width: isSmall ? 5 : 6, height: isSmall ? 5 : 6, borderRadius: "50%", background: verified ? "#16a34a" : "#2A6FBF", flexShrink: 0 }} />
      {label}
      {onRemove && (
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", opacity: 0.6, marginLeft: 2, fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
      )}
    </span>
  );
}
