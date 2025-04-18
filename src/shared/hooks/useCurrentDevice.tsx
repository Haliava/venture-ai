import { useEffect, useState } from "react"
import { Device } from "../types/general";

export const useCurrentDevice = () => {
  const [device, setDevice] = useState<Device>();
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    setDevice(window.innerWidth <= 800 ? Device.MOBILE : Device.WEB);
    setCurrentWidth(window.innerWidth);
  }, [window.innerWidth]);

  return {device, currentWidth};
}