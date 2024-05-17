import { useEffect, useState } from "react";
import { Platform } from "react-native";

/**
 * Custom hook to determine if the user is accessing the app via a mobile browser.
 *
 * @returns {boolean} - True if the user is on a mobile browser, false otherwise.
 */
function useIsMobileBrowser(): boolean {
  const [isMobileBrowser, setIsMobileBrowser] = useState(false);

  useEffect(() => {
    // Check if the code is running in a web environment
    if (Platform.OS === "web") {
      // Retrieve the user agent string from the browser
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;

      // Regular expression to detect common mobile browsers
      const isMobile =
        /android|iphone|ipad|iPod|blackberry|iemobile|opera mini|mobile/i.test(
          userAgent
        );

      // Update state based on the detection result
      setIsMobileBrowser(isMobile);
    }
  }, []);

  return isMobileBrowser;
}

export default useIsMobileBrowser;
