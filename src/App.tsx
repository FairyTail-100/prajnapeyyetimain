/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { NoiseOverlay } from './components/NoiseOverlay';
import { EntrySequence } from './components/EntrySequence';
import { MainCanvas } from './components/MainCanvas';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Stop scrolling during entry sequence
    if (!hasEntered) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [hasEntered]);

  return (
    <div className="relative w-full min-h-screen bg-theme-bg">
      <NoiseOverlay />
      <CustomCursor />
      
      {!hasEntered && (
        <EntrySequence onEnter={() => setHasEntered(true)} />
      )}
      
      {hasEntered && (
        <MainCanvas />
      )}
    </div>
  );
}
