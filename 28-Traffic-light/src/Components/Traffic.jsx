import { useEffect, useState } from "react";
import Signal from "./Signal";

export default function Traffic({ lights = ["green", "yellow", "red"] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActive((pervActive) => {
        return (pervActive + 1) % lights.length;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {lights.map((color, index) => {
        return <Signal key={index} isActive={active === index} color={color} />;
      })}
    </>
  );
}
