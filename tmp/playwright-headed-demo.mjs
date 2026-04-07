import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: false,
  slowMo: 250,
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});

const page = await context.newPage();

await page.addInitScript(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const style = document.createElement("style");
    style.textContent = `
        .pw-trail-dot {
          position: fixed;
          width: 10px;
          height: 10px;
          margin-left: -5px;
          margin-top: -5px;
          border-radius: 999px;
          background: rgba(255, 80, 80, 0.35);
          pointer-events: none;
          z-index: 2147483646;
        }
        .pw-cursor-dot {
          position: fixed;
          width: 18px;
          height: 18px;
          margin-left: -9px;
          margin-top: -9px;
          border: 3px solid rgba(255, 70, 70, 0.95);
          background: rgba(255, 255, 255, 0.55);
          border-radius: 999px;
          pointer-events: none;
          z-index: 2147483647;
          box-shadow: 0 0 0 6px rgba(255, 70, 70, 0.12);
        }
      `;
    document.head.appendChild(style);

    const cursor = document.createElement("div");
    cursor.className = "pw-cursor-dot";
    document.body.appendChild(cursor);

    let count = 0;
    window.addEventListener(
      "mousemove",
      (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;

        const dot = document.createElement("div");
        dot.className = "pw-trail-dot";
        dot.style.left = `${event.clientX}px`;
        dot.style.top = `${event.clientY}px`;
        document.body.appendChild(dot);

        count += 1;
        setTimeout(() => dot.remove(), 2000);
        if (count > 40) {
          document.querySelector(".pw-trail-dot")?.remove();
          count -= 1;
        }
      },
      { passive: true },
    );
  });
});

const moveMousePath = async (points) => {
  for (const [x, y, steps = 20, wait = 120] of points) {
    await page.mouse.move(x, y, { steps });
    await page.waitForTimeout(wait);
  }
};

await page.goto("http://127.0.0.1:5173/signin", {
  waitUntil: "domcontentloaded",
});

await moveMousePath([
  [350, 180],
  [640, 350],
  [720, 405],
]);

await page.pause();
