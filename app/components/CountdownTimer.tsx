import React, { useEffect, useState } from "react";
import { Text } from "react-native";

interface CountdownTimerProps {
  initialCount: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialCount,
  onComplete,
}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return <Text style={{ color: "white" }}> (Dismissing in {count})</Text>;
};

export default CountdownTimer;
