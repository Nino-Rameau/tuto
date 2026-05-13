"use client";

import { useState, Children, cloneElement } from "react";
import Image from "next/image";

const CSS = `
    @keyframes confettis {
        0%   { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
        15%  { opacity: 1; scale: 1.5; }
        85%  { opacity: 1; scale: 1.2; }
        100% { transform: translate(var(--tw-x-end), var(--tw-y-end)) rotate(var(--tw-rotation)) scale(0.8); opacity: 0; }
    }
`;

const BtnConfettis = ({ children, burstIcon = "/img/ampoule.svg", onClick }) => {
    const [particles, setParticles] = useState([]);

    function confettieAleatoire(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const nbConfettis = 16;

        const next = Array.from({ length: nbConfettis }, (_, i) => {
            const angle = (i / nbConfettis) * Math.PI * 2 + (Math.random() * 0.5);
            const distance = 100 + Math.random() * 100;

            const xEnd = Math.cos(angle) * distance;
            const yEnd = Math.sin(angle) * distance;
            const rotation = Math.random() * 720 - 360;

            return {
                id: crypto.randomUUID(),
                left: centerX - 20,
                top: centerY - 20,
                xEnd: `${xEnd}px`,
                yEnd: `${yEnd}px`,
                rotation: `${rotation}deg`,
                delay: i * 10,
                duration: 1200 + Math.random() * 600,
            };
        });

        setParticles((prev) => [...prev, ...next]);
        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => !next.find((n) => n.id === p.id)));
        }, 3000);

        onClick?.(e);
    }

    const cloned = cloneElement(Children.only(children), { onClick: confettieAleatoire });

    return (
        <>
            <style>{CSS}</style>
            {cloned}
            {particles.map((p) => (
                <Image
                    key={p.id}
                    src={burstIcon}
                    width={40}
                    height={40}
                    alt=""
                    style={{
                        position: "fixed",
                        left: p.left,
                        top: p.top,
                        pointerEvents: "none",
                        zIndex: 9999,
                        opacity: 0,
                        filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.6))",
                        "--tw-x-end": p.xEnd,
                        "--tw-y-end": p.yEnd,
                        "--tw-rotation": p.rotation,
                        animation: `confettis ${p.duration}ms cubic-bezier(0.1, 0.8, 0.3, 1) ${p.delay}ms forwards`,
                    }}
                />
            ))}
        </>
    );
};

export default BtnConfettis;
