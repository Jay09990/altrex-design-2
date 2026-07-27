import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { IndustryChallenge } from "@/types/industry";

interface ChallengesOrbitProps {
    challenges: IndustryChallenge[];
}

export default function ChallengesOrbit({ challenges }: ChallengesOrbitProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    // wrapperRef doubles as the inView target — no need for a separate sectionRef
    const isInView = useInView(wrapperRef, { once: true, margin: "-100px" });
    const animRef = useRef<number>(0);
    const tRef = useRef(0);
    const hoveredRef = useRef(-1);
    const activeRef = useRef(isInView);

    useEffect(() => {
        activeRef.current = isInView;
    }, [isInView]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const tooltip = tooltipRef.current;
        const wrapper = wrapperRef.current;
        if (!canvas || !tooltip || !wrapper) return;

        const ctx = canvas.getContext("2d")!;
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        const W = wrapper.clientWidth || 680;
        const H = Math.round(W * (440 / 680))

        canvas.width = W * DPR;
        canvas.height = H * DPR;
        canvas.style.width = `${W}px`
        canvas.style.height = `${H}px`;
        ctx.scale(DPR, DPR);

        const cx = W / 2, cy = H / 2;
        const BASE_SPEED = 0.00035;

        const nodes = challenges.map((ch, i) => ({
            label: ch.title.split(" & ").join(" &\n").split(" and ").join("\nand "),
            angle: -Math.PI / 2 + (i * Math.PI * 2) / challenges.length,
            r: 300,
            items: ch.items,
        }));

        const getIsDark = () =>
            document.documentElement.classList.contains("dark");

        const getColors = () => {
            const dark = getIsDark();
            return {
                ring: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                spoke: dark ? "rgba(249,115,22,0.2)" : "rgba(249,115,22,0.15)",
                centerFill: dark ? "#111" : "#fff",
                centerStroke: dark ? "rgba(249,115,22,0.55)" : "rgba(249,115,22,0.4)",
                nodeFill: dark ? "#111" : "#fff",
                textPrimary: dark ? "#f0f0f0" : "#1a1a1a",
                waveLine: dark ? "rgba(249,115,22,0.2)" : "rgba(249,115,22,0.16)",
                waveLineBright: dark ? "rgba(249,115,22,0.45)" : "rgba(249,115,22,0.38)",
            };
        };

        const drawWave = (
            phase: number,
            amplitude: number,
            freq: number,
            bright: boolean,
            lineWidth: number
        ) => {
            const colors = getColors();
            ctx.beginPath();
            ctx.strokeStyle = bright ? colors.waveLineBright : colors.waveLine;
            ctx.lineWidth = lineWidth;
            for (let x = 0; x <= W; x += 2) {
                const env = Math.max(0, 1 - Math.abs((x - cx) / (W * 0.5)) * 1.5);
                const y = cy + Math.sin(x * freq + phase) * amplitude * env;
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
        };

        const getNodePos = (node: (typeof nodes)[0]) => {
            const wobble = Math.sin(tRef.current * 0.4 + node.angle * 2) * 2.5;
            const angle = node.angle + tRef.current;
            return {
                x: cx + Math.cos(angle) * (node.r + wobble),
                y: cy + Math.sin(angle) * (node.r + wobble),
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            const colors = getColors();

            if (activeRef.current) tRef.current += BASE_SPEED;

            // rings
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = colors.ring;
            [210, 140].forEach((r) => {
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
            });

            // waves — phase multipliers are large so movement is visible every frame
            drawWave(tRef.current * 38 * 2.2 + 0.0, 16, 0.022, false, 0.8);
            drawWave(tRef.current * 38 * 1.7 + 1.2, 22, 0.018, true,  0.8);
            drawWave(tRef.current * 38 * 2.8 + 2.4, 12, 0.028, false, 0.5);

            const positions = nodes.map((n) => getNodePos(n));

            // spokes
            positions.forEach((pos) => {
                ctx.beginPath();
                ctx.strokeStyle = colors.spoke;
                ctx.lineWidth = 0.8;
                ctx.setLineDash([3, 6]);
                ctx.moveTo(cx, cy);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
                ctx.setLineDash([]);
            });

            // center hub
            ctx.beginPath();
            ctx.fillStyle = colors.centerFill;
            ctx.strokeStyle = colors.centerStroke;
            ctx.lineWidth = 1.5;
            ctx.arc(cx, cy, 70, 0, Math.PI * 2);
            ctx.fill(); ctx.stroke();

            ctx.textAlign = "center";
            ctx.font = "500 10px var(--font-mono, monospace)";
            ctx.fillStyle = "#f97316";
            ctx.fillText("INDUSTRY", cx, cy - 4);
            ctx.fillText("CHALLENGES", cx, cy + 10);

            // nodes
            positions.forEach((pos, i) => {
                const node = nodes[i];
                const isHov = hoveredRef.current === i;
                const R = isHov ? 70 : 58;
                const pulse = Math.sin(tRef.current * 38 * 0.04 + i * 1.4) * 1.5;

                if (isHov) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgba(249,115,22,0.18)";
                    ctx.lineWidth = 12;
                    ctx.arc(pos.x, pos.y, R + 7 + pulse, 0, Math.PI * 2);
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.fillStyle = colors.nodeFill;
                ctx.strokeStyle = isHov ? "#ea580c" : "#f97316";
                ctx.lineWidth = isHov ? 2 : 1.5;
                ctx.arc(pos.x, pos.y, R, 0, Math.PI * 2);
                ctx.fill(); ctx.stroke();

                const lines = node.label.split("\n");
                const lineH = 14;
                const startY = pos.y - ((lines.length - 1) * lineH) / 2;
                ctx.fillStyle = isHov ? "#f97316" : colors.textPrimary;
                ctx.textAlign = "center";
                ctx.font = `500 ${isHov ? 11 : 10}px var(--font-sans, sans-serif)`;
                lines.forEach((ln, li) =>
                    ctx.fillText(ln, pos.x, startY + li * lineH + 4)
                );

                if (isHov) {
                    ctx.font = "400 9px var(--font-mono, monospace)";
                    ctx.fillStyle = "#f97316";
                    ctx.fillText(`${node.items.length} issues`, pos.x, pos.y + R + 14);
                }
            });

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            // ✅ separate X and Y scales — canvas CSS width != height ratio
            const scaleX = W / rect.width;
            const scaleY = H / rect.height;
            const mx = (e.clientX - rect.left) * scaleX;
            const my = (e.clientY - rect.top) * scaleY;

            let found = -1;
            nodes.forEach((node, i) => {
                const pos = getNodePos(node);
                const dx = mx - pos.x;
                const dy = my - pos.y;
                if (Math.sqrt(dx * dx + dy * dy) < 52) found = i;
            });

            hoveredRef.current = found;

            if (found !== -1) {
                const node = nodes[found];

                // ✅ position relative to wrapper div, not the viewport
                const wrapRect = wrapper.getBoundingClientRect();
                let lx = e.clientX - wrapRect.left + 16;
                let ly = e.clientY - wrapRect.top - 10;

                tooltip.style.opacity = "1";
                tooltip.style.left = `${lx}px`;
                tooltip.style.top = `${ly}px`;
                tooltip.innerHTML = `
                    <div style="font-size:11px;font-weight:500;color:#f97316;margin-bottom:8px;font-family:var(--font-mono,monospace);letter-spacing:0.05em;">
                        ${node.label.replace("\n", " ").toUpperCase()}
                    </div>
                    ${node.items.map((it) => `
                        <div style="display:flex;gap:7px;align-items:flex-start;padding:3px 0;font-size:12px;color:var(--muted-foreground);">
                            <span style="color:#f97316;flex-shrink:0;margin-top:1px;">›</span>${it}
                        </div>
                    `).join("")}
                `;

                // ✅ flip tooltip to left if it would overflow right edge
                const ttRect = tooltip.getBoundingClientRect();
                const wrapRect2 = wrapper.getBoundingClientRect();
                if (e.clientX - wrapRect2.left + 16 + ttRect.width > wrapRect2.width) {
                    tooltip.style.left = `${e.clientX - wrapRect2.left - ttRect.width - 16}px`;
                }
            } else {
                tooltip.style.opacity = "0";
            }
        };

        const handleMouseLeave = () => {
            hoveredRef.current = -1;
            tooltip.style.opacity = "0";
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animRef.current);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [challenges]);

    return (
        <motion.div
            ref={wrapperRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
        >
            <canvas
                ref={canvasRef}
                style={{ display: "block", width: "100%", cursor: "pointer" }}
            />
            <div
                ref={tooltipRef}
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                    opacity: 0,
                    transition: "opacity 0.18s",
                    background: "var(--card)",
                    border: "0.5px solid var(--border)",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    maxWidth: "220px",
                    zIndex: 10,
                }}
            />
        </motion.div>
    );
}