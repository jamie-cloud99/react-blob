import { getRandomNumber } from "@/utils";
import { useEffect, useState } from "react";
import styles from "@/styles/BlobBackground.module.css";

export function Blobs() {
  const [blobs, setBlobs] = useState([]);

  useEffect(() => {
    const MIN_SPEED = 0.5;
    const MAX_SPEED = 2;
    const BLOB_SIZE = 180;

    const initializeBlob = (index) => {
      const initialX = getRandomNumber(0, window.innerWidth - BLOB_SIZE);
      const initialY = getRandomNumber(0, window.innerHeight - BLOB_SIZE);

      const vx =
        getRandomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
      const vy =
        getRandomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);

      return {
        size: BLOB_SIZE,
        initialX,
        initialY,
        x: initialX,
        y: initialY,
        vx,
        vy,
        index,
      };
    };

    const updateBlob = (blob) => {
      let { x, y, vx, vy, size } = blob;

      x += vx;
      y += vy;

      if (x >= window.innerWidth - size) {
        x = window.innerWidth - size;
        vx *= -1;
      }

      if (x <= 0) {
        x = 0;
        vx *= -1;
      }

      if (y >= window.innerHeight - size) {
        y = window.innerHeight - size;
        vy *= -1;
      }

      if (y <= 0) {
        y = 0;
        vy *= -1;
      }

      return { ...blob, x, y, vx, vy };
    };

    const initBlobs = () => {
      const blobData = Array.from({ length: 7 }, (_, index) =>
        initializeBlob(index),
      );
      setBlobs(blobData);
    };

    const update = () => {
      requestAnimationFrame(update);
      setBlobs((preBlobs) => preBlobs.map(updateBlob));
    };

    initBlobs();
    update();
  }, []);

  return (
    <div className={styles.blobs}>
      {blobs.map((blob) => (
        <div
          key={blob.index}
          className={styles.blob}
          style={{
            width: `${blob.size}px`,
            height: `${blob.size}px`,
            top: `${blob.y}px`,
            left: `${blob.x}px`,
          }}
        />
      ))}
    </div>
  );
}
