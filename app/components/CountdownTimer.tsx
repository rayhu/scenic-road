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
    if (count <= 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, onComplete]);

  return <Text style={{ color: "white" }}> (Dismissing in {count})</Text>;
};

export default CountdownTimer;
