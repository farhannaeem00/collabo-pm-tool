interface BadgeProps {
  label: string;
  type?: "purple" | "blue" | "green" | "yellow" | "red" | "gray";
}

export function Badge({ label, type = "gray" }: BadgeProps) {
  const styles = {
    purple: "bg-purple-500/10 text-purple-400",
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    red: "bg-red-500/10 text-red-400",
    gray: "bg-gray-500/10 text-gray-400",
  };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles[type]}`}>
      {label}
    </span>
  );
}
