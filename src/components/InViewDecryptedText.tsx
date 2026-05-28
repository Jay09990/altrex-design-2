/**
 * Triggers the existing DecryptedText effect when the wrapper enters the viewport.
 * This keeps section titles feeling "alive" without animating everything on load.
 */

import { useRef } from "react";
import { useInView } from "framer-motion";

import DecryptedText from "./DecryptedText";

type InViewDecryptedTextProps = Omit<
  React.ComponentProps<typeof DecryptedText>,
  "animateOn"
> & {
  margin?: MarginType;
};

export default function InViewDecryptedText({
  margin = "-20%",
  ...props
}: InViewDecryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <span ref={ref} className="inline-block">
      <DecryptedText {...props} animateOn={isInView ? "mount" : "none"} />
    </span>
  );
}

type MarginValue = `${number}${"px" | "%"}`;
type MarginType =
  | MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;
