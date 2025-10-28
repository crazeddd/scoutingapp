import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const iOS = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsIos(iOS);
    setIsStandalone(standalone);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleClose = () => setShowBanner(false);

  // iOS prompt (manual install)
  if (isIos && !isStandalone) {
    return (
      <div className="banner">
        <p>
          📱 To install this app, tap <br /> <strong>Share</strong> →{" "}
          <strong>Add to Home Screen</strong>
        </p>
        <button>✕</button>
      </div>
    );
  }

  // Regular install prompt
  return (
    <>
      {showBanner && (
        <div className="banner">
          <p>
            Hey, you can install this app <br /> to use offline.{" "}
          </p>
          <div className="banner-btns">
            <button onClick={handleInstall} className="primary">
              Install
            </button>
            <button onClick={handleClose}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}
