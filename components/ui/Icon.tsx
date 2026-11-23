import type { IconType } from "react-icons";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuChevronRight,
  LuHandshake,
  LuLayers,
  LuList,
  LuMail,
  LuMenu,
  LuMinus,
  LuPencil,
  LuPhone,
  LuPlus,
  LuSettings,
  LuUser,
  LuX,
} from "react-icons/lu";
import { RiDoubleQuotesR } from "react-icons/ri";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuChevronDown,
  LuChevronRight,
  LuHandshake,
  LuLayers,
  LuList,
  LuMail,
  LuMenu,
  LuMinus,
  LuPencil,
  LuPhone,
  LuPlus,
  LuSettings,
  LuUser,
  LuX,
  RiDoubleQuotesR,
};

type Props = {
  name: string;
  className?: string;
  // Line thickness of the outline icons (Lu); the filled icons (Fa, Ri) keep their own shape.
  strokeWidth?: number;
};

export const Icon = ({ name, className, strokeWidth }: Props) => {
  const Component = icons[name] ?? LuCheck;
  const filled = name.startsWith("Fa") || name.startsWith("Ri");
  return <Component className={className} strokeWidth={filled ? undefined : strokeWidth} aria-hidden="true" />;
};
