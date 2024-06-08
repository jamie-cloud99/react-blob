import { getRandomNumber } from "@/utils";
import { useEffect, useRef } from "react";
import styles from "@/styles/BlobBackground.module.css";

export function Blobs() {
  const blobRefs = useRef([]);

  useEffect(() => {
    const MIN_SPEED = 0.5;
    const MAX_SPEED = 2;

    class Blob {
      constructor(el) {
        this.el = el;
        const boundingRect = this.el.getBoundingClientRect();
        this.size = boundingRect.width;
        this.initialX = getRandomNumber(0, window.innerWidth - this.size);
        this.initialY = getRandomNumber(0, window.innerHeight - this.size);
        this.el.style.top = `${this.initialY}px`;
        this.el.style.left = `${this.initialX}px`;
        this.vx =
          getRandomNumber(MIN_SPEED, MAX_SPEED) *
          (Math.random() > 0.5 ? 1 : -1);
        this.vy =
          getRandomNumber(MIN_SPEED, MAX_SPEED) *
          (Math.random() > 0.5 ? 1 : -1);
        this.x = this.initialX;
        this.y = this.initialY;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x >= window.innerWidth - this.size) {
          this.x = window.innerWidth - this.size;
          this.vx *= -1;
        }

        if (this.y >= window.innerHeight - this.size) {
          this.y = window.innerHeight - this.size;
          this.vy *= -1;
        }

        if (this.x <= 0) {
          this.x = 0;
          this.vx *= -1;
        }

        if (this.y <= 0) {
          this.y = 0;
          this.vy *= -1;
        }

        this.el.style.transform = `translate(${this.x - this.initialX}px, ${this.y - this.initialY}px)`;
      }
    }

    function initBlobs() {
      const blobs = blobRefs.current.map((blobEl) => new Blob(blobEl));

      function update() {
        requestAnimationFrame(update);
        blobs.forEach((blob) => blob.update());
      }

      requestAnimationFrame(update);
    }

    initBlobs();
  }, []);

  return (
    <div className={styles.blobs}>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (blobRefs.current[index] = el)}
          className={styles.blob}
        />
      ))}
    </div>
  );
}
