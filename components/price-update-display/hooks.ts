import React from "react";

interface AnimationState {
  isAnimating: boolean;
  animationClass: string;
}

export function useAnimatedValue(
  value: string | number,
  previousValue?: string | number,
  isPositive?: boolean,
  animationType: "flash" | "slide" | "scale" | "glow" = "flash",
  duration: number = 600
) {
  const [displayValue, setDisplayValue] = React.useState(value);
  const [animationState, setAnimationState] = React.useState<AnimationState>({
    isAnimating: false,
    animationClass: "",
  });

  React.useEffect(() => {
    if (previousValue !== undefined && previousValue !== value) {
      setAnimationState({ isAnimating: true, animationClass: "" });

      // Set animation class based on type
      let animationClass = "";
      switch (animationType) {
        case "flash":
          animationClass = isPositive
            ? "animate-flash-green"
            : "animate-flash-red";
          break;
        case "slide":
          animationClass = "animate-slide-up";
          break;
        case "scale":
          animationClass = "animate-scale-pulse";
          break;
        case "glow":
          animationClass = isPositive
            ? "animate-glow-green"
            : "animate-glow-red";
          break;
      }

      setAnimationState({ isAnimating: true, animationClass });
      setDisplayValue(value);

      // Clear animation after duration
      const timer = setTimeout(() => {
        setAnimationState({ isAnimating: false, animationClass: "" });
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, previousValue, isPositive, animationType, duration]);

  return {
    displayValue,
    ...animationState,
  };
}

export function useTimeSinceUpdate(lastUpdate?: number) {
  const [timeSinceUpdate, setTimeSinceUpdate] = React.useState<string>("now");

  React.useEffect(() => {
    if (!lastUpdate) return;

    const updateTimer = setInterval(() => {
      const now = Date.now();
      const diffMs = now - lastUpdate;

      if (diffMs < 1000) {
        setTimeSinceUpdate("now");
      } else if (diffMs < 60000) {
        setTimeSinceUpdate(`${Math.floor(diffMs / 1000)}s`);
      } else {
        setTimeSinceUpdate(`${Math.floor(diffMs / 60000)}m`);
      }
    }, 1000);

    return () => clearInterval(updateTimer);
  }, [lastUpdate]);

  return timeSinceUpdate;
}

export function useCounterAnimation(
  from: number,
  to: number,
  duration: number = 1000,
  formatter?: (value: number) => string
) {
  const [current, setCurrent] = React.useState(from);

  React.useEffect(() => {
    const startTime = Date.now();
    const difference = to - from;

    const animateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newValue = from + difference * easeOutCubic;

      setCurrent(newValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      } else {
        setCurrent(to);
      }
    };

    animateValue();
  }, [from, to, duration]);

  const displayValue = formatter ? formatter(current) : current.toFixed(0);

  return { current, displayValue };
}

export function usePriceFlash(
  price: string | number,
  previousPrice?: string | number,
  isIncreasing?: boolean
) {
  const animationData = useAnimatedValue(
    price,
    previousPrice,
    isIncreasing,
    "flash"
  );

  return {
    ...animationData,
    isIncreasing,
    shouldShowArrow: isIncreasing !== undefined,
  };
}

export function useChangeIndicator(
  change: number,
  previousChange?: number,
  showSign: boolean = true,
  suffix: string = "%"
) {
  const isPositive = change >= 0;
  const displayValue = `${showSign && change >= 0 ? "+" : ""}${change.toFixed(
    2
  )}${suffix}`;
  const previousDisplayValue =
    previousChange !== undefined
      ? `${showSign && previousChange >= 0 ? "+" : ""}${previousChange.toFixed(
          2
        )}${suffix}`
      : undefined;

  const animationData = useAnimatedValue(
    displayValue,
    previousDisplayValue,
    isPositive,
    "glow"
  );

  return {
    ...animationData,
    isPositive,
  };
}
