import { useTheme } from "next-themes";
import { MagicCardSpot } from "../../frontend/magic-card";

export default function MagicCardDemo() {
  const { theme } = useTheme();

  return (
    <div className="flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row">
      <MagicCardSpot
        className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl border-transparent"
        gradientColor={theme === "dark" ? "#00d4ff" : "#020024"}
        gradientSize={80}
        gradientOpacity={1}
      >
        Magic
      </MagicCardSpot>
      <MagicCardSpot
        className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl border-transparent"
        gradientColor={theme === "dark" ? "#FFD700" : "#FFA500"}
        gradientSize={250}
        gradientOpacity={0.6}
      >
        Card
      </MagicCardSpot>
      <MagicCardSpot
        className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl border-transparent"
        gradientColor={theme === "dark" ? "#46fc81" : "#3f5efb"}
        gradientSize={300}
        gradientOpacity={0.4}
      >
        Showcase
      </MagicCardSpot>
      <MagicCardSpot
        className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl border-transparent"
        gradientColor={ theme === "dark" ? "#3f5efb" : "#fd1d1d"}
        gradientSize={350}
        gradientOpacity={0.2}
      >
        Platform
      </MagicCardSpot>
    </div>
  );
}
