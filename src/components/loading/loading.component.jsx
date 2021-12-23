import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import fireAnime from './fireAnime.json';
import styles from './loading.module.css';

const Loading = () => {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: fireAnime,
    });
    return () => lottie.stop();
  }, []);
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContainer} ref={anime}></div>
      <div>
        <span className="truncate text-gray-500 font-semibold subpixel-antialiased italic md:text-xl">
          Tìm việc không khó, có LD Job lo !!!
        </span>
        <span className="ml-1 md:text-xl">🤖</span>
      </div>
    </div>
  );
};

export default Loading;
