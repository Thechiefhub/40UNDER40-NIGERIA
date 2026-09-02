/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EntryLoaderProps {
  onComplete: () => void;
}

export default function EntryLoader({ onComplete }: EntryLoaderProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['40', 'UNDER', '40', 'NIGERIA', 'CELEBRATING THE EXCEPTIONAL.'];

  useEffect(() => {
    // Check if user has seen loader in this session to respect repeat visits
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            sessionStorage.setItem('hasSeenLoader', 'true');
            onComplete();
          }, 800);
          return prev;
        }
      });
    }, 350);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        id="entry-loader"
        className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Abstract Purple Ambient Light Glow */}
        <div className="absolute w-[500px] h-[500px] bg-indigo-500 opacity-15 rounded-full blur-[120px] pointer-events-none -translate-y-12"></div>

        <div className="text-center px-4 relative">
          <motion.p
            className="text-xs tracking-[0.3em] text-indigo-400 font-display mb-4 uppercase font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            INFLUENCE • LEADERSHIP • PROGRESS
          </motion.p>

          <div className="h-20 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={wordIndex}
                className={`text-4xl md:text-6xl font-display font-extrabold tracking-tight ${
                  wordIndex === words.length - 1 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 text-2xl md:text-3xl' 
                    : 'text-[#F7F7F5]'
                }`}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {words[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <div className="w-48 h-[1px] bg-neutral-800 mx-auto mt-8 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
