import { type ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

/**
 * Displays text with an animated linear gradient fill and an optional animated gradient border.
 *
 * The gradient colors, animation speed, and border effect can be customized via props.
 *
 * @param children - The content to render with gradient styling.
 * @param className - Optional additional CSS classes for the container.
 * @param colors - Optional array of colors for the gradient. Defaults to orange and purple hues.
 * @param animationSpeed - Optional animation duration in seconds. Defaults to 8.
 * @param showBorder - Optional flag to display an animated gradient border.
 *
 * @returns A React element rendering the content with animated gradient effects.
 */

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  const baseClasses = [
    "relative mx-auto flex max-w-fit cursor-pointer",
    "flex-row items-center justify-center overflow-hidden",
    "rounded-none font-medium backdrop-blur",
    "transition-shadow duration-500",
  ].join(" ");

  return (
    <div
      className={`${baseClasses} ${className}`}
      role="text"
      aria-label={typeof children === "string" ? children : "Gradient text"}
    >
      {showBorder && (
        <div
          className="animate-gradient pointer-events-none absolute inset-0 z-0 bg-cover"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 z-[-1] rounded-[1.25rem] bg-black"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="animate-gradient relative z-10 inline-block bg-cover text-transparent"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
