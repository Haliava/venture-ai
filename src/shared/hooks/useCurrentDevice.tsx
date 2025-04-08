import { useEffect, useState } from "react"
import { Device } from "../types/general";

export const useCurrentDevice = () => {
  const [device, setDevice] = useState<Device>();

  useEffect(() => {
    setDevice(window.innerWidth <= 800 ? Device.MOBILE : Device.WEB);
  }, [window.innerWidth]);

  return device;
}