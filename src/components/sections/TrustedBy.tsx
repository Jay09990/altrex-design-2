/**
 * TrustedBy section rendered as an infinite auto-looping horizontal logo track.
 */

import { LogoLoop } from "../LogoLoop";

const techLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    alt: "React",
    href: "https://react.dev",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    alt: "Next.js",
    href: "https://nextjs.org",
    className: "dark:invert"
  },
  {
    src: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    alt: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    alt: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    alt: "Figma",
    href: "https://figma.com",
  },
  {
    src: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg",
    alt: "Docker",
    href: "https://docker.com",
  },
];

const TrustedBy = () => {
  return (
    <div className="w-full overflow-hidden pb-16 opacity-100">
      <LogoLoop 
        logos={techLogos} 
        speed={40} 
        gap={80} 
        logoHeight={54} 
        fadeOut={true}
        pauseOnHover={false}
      />
    </div>
  );
};

export default TrustedBy;
