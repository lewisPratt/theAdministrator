import "../../assets/css/footer.css";
import type { JSX } from "react";

interface FooterProps{
    children: JSX.Element
}

export default function Footer({children} : FooterProps) {
  return (
    <footer>
      
      {children}
    </footer>
  );
}
