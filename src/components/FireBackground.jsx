import { useEffect, useRef } from "react";

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

function renderFireBackground(ctx, width, height, time, options = {}) {
    const {
        fontSize = 14,
        chars = " .,:;i+xX#&@",
        color = "#ff1a1a",
        hotColor = "#ffb45c",
        intensity = 1.0,
        wind = 0,
        speed = 1,
        lightMode = false,
    } = options;

    const charW = fontSize * 0.62;
    const lineH = fontSize * 1.4;
    const cols = Math.ceil(width / charW);
    const rows = Math.ceil(height / lineH);
    const len = cols * rows;

    const key = "__fire_heat__";
    const canvasAny = ctx.canvas;
    let heat = canvasAny[key];
    if (!heat || heat.length !== len) {
        heat = new Float32Array(len);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const profile = Math.pow(r / (rows - 1), 1.4);
                const noise = 0.55 + 0.45 * Math.sin(c * 0.35 + r * 0.5) * Math.sin(c * 0.11 - r * 0.2);
                heat[r * cols + c] = Math.min(1, profile * (0.75 + 0.25 * noise));
            }
        }
        canvasAny[key] = heat;
    }

    const dt = 0.016 * speed;
    const coolingRate = 0.15 * dt;
    const windShift = wind * speed * 0.8;

    const baseRow = rows - 1;
    const t = time * speed;
    for (let c = 0; c < cols; c++) {
        const flicker = Math.sin(c * 0.31 + t * 4.1) * 0.5 + 0.5;
        const flicker2 = Math.sin(c * 0.73 - t * 2.7) * 0.5 + 0.5;
        const seed = (flicker * 0.6 + flicker2 * 0.4) * intensity;
        heat[baseRow * cols + c] = Math.min(1, seed + Math.random() * 0.12 * intensity);
        if (baseRow > 0) heat[(baseRow - 1) * cols + c] = Math.min(1, seed * 0.85 + Math.random() * 0.08 * intensity);
    }

    const newHeat = new Float32Array(len);
    for (let r = 0; r < rows - 2; r++) {
        for (let c = 0; c < cols; c++) {
            const below = heat[(r + 1) * cols + c];
            const below2 = heat[(r + 2) * cols + Math.max(0, Math.min(cols - 1, c + Math.round(windShift)))];
            const left = heat[(r + 1) * cols + Math.max(0, c - 1)];
            const right = heat[(r + 1) * cols + Math.min(cols - 1, c + 1)];
            const avg = below * 0.4 + below2 * 0.25 + left * 0.175 + right * 0.175;
            newHeat[r * cols + c] = Math.max(0, avg - coolingRate - Math.random() * 0.012 * speed);
        }
    }
    for (let c = 0; c < cols; c++) {
        newHeat[(rows - 1) * cols + c] = heat[(rows - 1) * cols + c];
        if (rows > 1) newHeat[(rows - 2) * cols + c] = heat[(rows - 2) * cols + c];
    }
    canvasAny[key] = newHeat;

    const cp = parseColor(color) ?? { r: 255, g: 26, b: 26 };
    const hp = parseColor(hotColor) ?? { r: 255, g: 180, b: 92 };

    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const v = newHeat[r * cols + c];
            if (v < 0.04) continue;

            const charIdx = Math.min(chars.length - 1, Math.floor(v * chars.length));
            const ch = chars[charIdx];
            if (ch === " ") continue;

            const blend = Math.min(1, v * 1.2);
            const rr = (cp.r + (hp.r - cp.r) * blend) | 0;
            const gg = (cp.g + (hp.g - cp.g) * blend) | 0;
            const bb = (cp.b + (hp.b - cp.b) * blend) | 0;

            const alpha = lightMode ? 1 - v * 0.3 : Math.min(1, v * 1.6 + 0.12);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
            ctx.fillText(ch, c * charW, r * lineH);
        }
    }
    ctx.globalAlpha = 1;
}

function FireBackground({ color = "#ff1a1a", hotColor = "#ffb45c", intensity = 1.0 }) {
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
            renderFireBackground(ctx, canvas.width, canvas.height, now / 1000, {
                fontSize: 14 * dpr,
                color,
                hotColor,
                intensity,
            });
            rafId = requestAnimationFrame(frame);
        };
        rafId = requestAnimationFrame(frame);

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }, [color, hotColor, intensity]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
        />
    );
}

export default FireBackground;
