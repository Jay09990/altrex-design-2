import React from 'react';

// Patched version of the React Bits StarBorder component.
// Change from original: added `innerClassName` prop so callers can override
// the default dark inner div (from-black to-gray-900) with any bg they need.

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  innerClassName?: string;   // NEW: override the inner card div classes
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  innerClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  // Default inner classes kept for backward compat when innerClassName not passed
  const defaultInner = 'bg-gradient-to-b from-black to-gray-900 border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px]';
  const innerClasses = innerClassName || defaultInner;

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...(rest as any)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as any).style,
      }}
    >
      {/* Sweeping star — bottom */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* Sweeping star — top */}
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* Inner card */}
      <div className={`relative z-[1] rounded-[20px] ${innerClasses}`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;

// ── Required Tailwind keyframes ──────────────────────────────────────────────
// Add these to your CSS (e.g. index.css) inside @layer utilities or @theme:
//
// @keyframes star-movement-bottom {
//   0%   { transform: translate(0%, 0%);    opacity: 1; }
//   100% { transform: translate(-100%, 0%); opacity: 0; }
// }
// @keyframes star-movement-top {
//   0%   { transform: translate(0%, 0%);   opacity: 1; }
//   100% { transform: translate(100%, 0%); opacity: 0; }
// }
//
// And in your Tailwind theme (tailwind.config.js or @theme in index.css):
//   animate-star-movement-bottom: star-movement-bottom linear infinite alternate
//   animate-star-movement-top:    star-movement-top    linear infinite alternate