import React, { useEffect, useRef, useState } from 'react';

const PrismeKapferer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const resize = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc?.body) {
          const h = doc.body.scrollHeight;
          if (h > 0) setHeight(h);
        }
      } catch { /* cross-origin safety */ }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', () => {
        resize();
        // Inject styles to remove the fixed nav (handled by parent app) and allow natural flow
        try {
          const doc = iframe.contentDocument || iframe.contentWindow?.document;
          if (doc) {
            const style = doc.createElement('style');
            style.textContent = `
              body { overflow: visible !important; height: auto !important; }
            `;
            doc.head.appendChild(style);
            // Re-measure after style injection
            setTimeout(resize, 100);
          }
        } catch { /* cross-origin safety */ }

        // Observe size changes inside the iframe (tab switches change content height)
        const interval = setInterval(resize, 300);
        return () => clearInterval(interval);
      });
    }

    // Also poll for height changes (tab switches inside the iframe)
    const interval = setInterval(resize, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="kapferer" className="border-b border-black/[.08]">
      <iframe
        ref={iframeRef}
        src="/prisme-kapferer.html"
        title="Prisme de Kapferer"
        style={{
          width: '100%',
          height: `${height}px`,
          border: 'none',
          display: 'block',
        }}
      />
    </div>
  );
};

export default PrismeKapferer;
