import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

/**
 * Custom hook to determine if the current device is a desktop.
 *
 * @returns {boolean} - True if the current device is a desktop, false otherwise.
 */
export default function useIsDesktop(): boolean {
  const isTabletOrMobileDevice = useMediaQuery({
    maxDeviceWidth: 1024,
  });
  return !isTabletOrMobileDevice;
}
