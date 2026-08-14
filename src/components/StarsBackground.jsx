import { useEffect, useRef } from "react";

function hash2(ix, iy) {
    let n = ix * 127 + iy * 311;
    n = ((n >> 13) ^ n);
    return ((n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 0x7fffffff;
}

function parseColor(c) {
    const hex = c.match(/^#([0-9a-f]{3,8})$/i)?.[1];
    if (hex) {
        const h = hex.length <= 4
            ? hex.split("").map((x) => parseInt(x + x, 16))
            : [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
        return { r: h[0], g: h[1], b: h[2] };
    }
    const rgb = c.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3] };
    return null;
}

function renderStarsBackground(ctx, width, height, time, mousePos = { x: 0.5, y: 0.5 }, options = {}) {
    const {
        fontSize = 15,
        chars = " . · * + ° ★",
        accentColor = undefined,
        color,
        speed = 1,
        count = 260,
        lightMode = false,
    } = options;
    const resolvedAccent = accentColor ?? (lightMode ? "#6b8700" : "#d4ff00");

    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    const cx = width * (0.2 + mousePos.x * 0.6);
    const cy = height * (0.2 + mousePos.y * 0.6);
    const maxR = Math.sqrt(width * width + height * height) * 0.42;

    let br = 255, bg = 255, bb = 255;
    if (lightMode) { br = 55; bg = 55; bb = 55; }
    if (color) { const p = parseColor(color); if (p) { br = p.r; bg = p.g; bb = p.b; } }

    let acR = 212, acG = 255, acB = 0;
    const ap = parseColor(resolvedAccent);
    if (ap) { acR = ap.r; acG = ap.g; acB = ap.b; }

    const charArr = chars.replace(/ /g, "").split("");
    if (charArr.length === 0) return;

    for (let i = 0; i < count; i++) {
        const angle = hash2(i * 17, 3) * Math.PI * 2;
        const baseSpd = 0.15 + hash2(i * 31, 7) * 0.85;
        const phase = hash2(i * 13, 11);

        const r = ((time * baseSpd * speed * 0.22 + phase) % 1.0);

        const x = cx + Math.cos(angle) * r * maxR;
        const y = cy + Math.sin(angle) * r * maxR;

        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;

        const sz = Math.max(8, fontSize * (0.4 + r * 0.9));
        ctx.font = `${sz}px monospace`;

        const charIdx = Math.min(charArr.length - 1, Math.floor(r * charArr.length));
        const ch = charArr[charIdx];
        const isAccent = r > 0.72;
        const alpha = lightMode ? r * 0.85 : 0.3 + r * 0.5;

        ctx.fillStyle = isAccent
            ? `rgba(${acR},${acG},${acB},${Math.min(lightMode ? 0.95 : 0.95, alpha * 1.4)})`
            : `rgba(${br},${bg},${bb},${alpha})`;

        ctx.fillText(ch, x, y);
    }

    ctx.textAlign = "left";
}

function StarsBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let rafId;
        let running = true;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
        };
        resize();
        window.addEventListener("resize", resize);

        const frame = (now) => {
            if (!running) return;
            const dpr = window.devicePixelRatio || 1;
            renderStarsBackground(ctx, canvas.width, canvas.height, now / 1000, undefined, {
                fontSize: 15 * dpr,
                count: 260,
            });
            rafId = requestAnimationFrame(frame);
        };
        rafId = requestAnimationFrame(frame);

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
        />
    );
}

export default StarsBackground;
