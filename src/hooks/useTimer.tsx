import { useTimer as useTimerNPM } from "react-timer-hook";

export default function useTimer(expiryTimestamp: any) {
  const { seconds, minutes, isRunning } = useTimerNPM({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return {
    seconds,
    minutes,
    isRunning,
  };
}
