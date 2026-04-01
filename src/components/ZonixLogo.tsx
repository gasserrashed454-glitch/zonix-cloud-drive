import zonixLogo from "@/assets/zonix-logo.png";

interface ZonixLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeMap = { sm: 28, md: 36, lg: 48 };

const ZonixLogo = ({ size = "md", showText = true }: ZonixLogoProps) => (
  <div className="flex items-center gap-2">
    <img src={zonixLogo} alt="Zonix Cloud" width={sizeMap[size]} height={sizeMap[size]} />
    {showText && (
      <span className="font-semibold text-foreground text-lg tracking-tight">
        Zonix Cloud
      </span>
    )}
  </div>
);

export default ZonixLogo;
