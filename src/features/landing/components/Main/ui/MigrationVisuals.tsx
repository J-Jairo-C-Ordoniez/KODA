const accent = "var(--color-accent)";
const danger = "var(--color-accent-red)";
const success = "var(--color-success)";

const line = {
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const softLine = {
  ...line,
  opacity: 0.24,
};

const guideLine = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  opacity: 0.18,
};

export function Step1Notebook() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="27" y="12" width="52" height="68" rx="6" fill="currentColor" opacity="0.04" />
      <rect x="27" y="12" width="52" height="68" rx="6" {...softLine} />
      {[26, 36, 46, 56, 66].map((cy) => (
        <circle key={cy} cx="22" cy={cy} r="3.2" {...softLine} fill="none" />
      ))}
      <path d="M35 31H66M35 42H61M35 55H66M35 66H54" {...guideLine} />
      <path d="M34 52C43 50 52 58 67 54" stroke={danger} strokeWidth="2.8" strokeLinecap="round" opacity="0.72" />
      <path d="M64 72L75 61L79 65L68 76L62 78L64 72Z" fill={accent} opacity="0.68" />
    </svg>
  );
}

export function Step1Excel() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="14" y="13" width="68" height="70" rx="7" fill="currentColor" opacity="0.04" />
      <rect x="14" y="13" width="68" height="70" rx="7" {...softLine} />
      <path d="M14 28H82" {...softLine} />
      <path d="M31 29V82M50 29V82M69 29V82M15 45H81M15 62H81" {...guideLine} />
      <path d="M24 20H39" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.82" />
      <rect x="56" y="49" width="16" height="12" rx="2" fill={danger} opacity="0.12" />
      <path d="M60 57L68 51M68 57L60 51" stroke={danger} strokeWidth="1.9" strokeLinecap="round" opacity="0.72" />
      <rect x="56" y="66" width="16" height="9" rx="2" fill={success} opacity="0.16" />
    </svg>
  );
}

export function Step1Receipt() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M24 12H72V76L66 72L60 76L54 72L48 76L42 72L36 76L30 72L24 76V12Z"
        fill="currentColor"
        opacity="0.04"
      />
      <path
        d="M24 12H72V76L66 72L60 76L54 72L48 76L42 72L36 76L30 72L24 76V12Z"
        {...softLine}
      />
      <path d="M34 25H62M34 36H58M34 48H64M34 59H49" {...guideLine} />
      <path d="M56 59H64" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.36" />
      <rect x="34" y="17" width="28" height="4" rx="1.5" fill={accent} opacity="0.28" />
    </svg>
  );
}

export function Step1Cloud() {
  return (
    <svg viewBox="0 0 104 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M78 61H31C20.5 61 12 52.5 12 42C12 32.8 18.8 25.1 27.7 23.5C30.2 14.7 38.2 9 47.4 10.5C54.1 11.6 59.3 15.8 62.1 21.4C64.5 20 67.3 19.2 70.2 19.2C79.4 19.2 86.9 26.7 86.9 35.9C86.9 36.7 86.8 37.4 86.7 38.1C91.7 40.3 95 45.2 95 50.9C95 58.6 88.7 64.8 81 64.8"
        fill="currentColor"
        opacity="0.04"
      />
      <path
        d="M78 61H31C20.5 61 12 52.5 12 42C12 32.8 18.8 25.1 27.7 23.5C30.2 14.7 38.2 9 47.4 10.5C54.1 11.6 59.3 15.8 62.1 21.4C64.5 20 67.3 19.2 70.2 19.2C79.4 19.2 86.9 26.7 86.9 35.9C86.9 36.7 86.8 37.4 86.7 38.1C91.7 40.3 95 45.2 95 50.9C95 58.6 88.7 64.8 81 64.8"
        {...softLine}
      />
      <path d="M37 45L48 55L70 32" stroke={success} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Step2PriceTag() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M23 26L46 15L76 45L45 76L15 46L23 26Z" fill="currentColor" opacity="0.04" />
      <path d="M23 26L46 15L76 45L45 76L15 46L23 26Z" {...softLine} />
      <circle cx="32" cy="34" r="4" {...softLine} fill="none" />
      <path d="M47 36V61M39 43C39 39.5 42.5 37.5 47.5 37.5C52.5 37.5 56 40 56 43.5C56 48 39 47 39 54C39 58 43 60.5 48 60.5C53 60.5 57 58 57 54" {...line} opacity="0.54" />
      <path d="M25 52L39 66" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.64" />
    </svg>
  );
}

export function Step2InventoryBox() {
  return (
    <svg viewBox="0 0 104 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 38H86V77H18V38Z" fill="currentColor" opacity="0.04" />
      <path d="M18 38H86V77H18V38Z" {...softLine} />
      <path d="M18 38L29 21H75L86 38M52 21V38M18 38L52 50L86 38" {...softLine} />
      <path d="M43 51H61V68H43V51Z" fill={accent} opacity="0.14" />
      <path d="M52 51V68M43 59.5H61" stroke={accent} strokeWidth="2.5" strokeLinecap="round" opacity="0.58" />
      <path d="M31 70H50" {...guideLine} />
    </svg>
  );
}

export function Step2Customer() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="43" cy="32" r="17" fill="currentColor" opacity="0.04" />
      <circle cx="43" cy="32" r="17" {...softLine} />
      <path d="M17 80C19 61 29 53 43 53C57 53 67 61 69 80" fill="currentColor" opacity="0.04" />
      <path d="M17 80C19 61 29 53 43 53C57 53 67 61 69 80" {...softLine} fill="none" />
      <circle cx="68" cy="25" r="13" fill={success} opacity="0.15" />
      <circle cx="68" cy="25" r="13" stroke={success} strokeWidth="2.4" opacity="0.58" />
      <path d="M62 25L67 30L76 19" stroke={success} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Step2Register() {
  return (
    <svg viewBox="0 0 104 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="18" y="48" width="68" height="28" rx="6" fill="currentColor" opacity="0.04" />
      <rect x="18" y="48" width="68" height="28" rx="6" {...softLine} />
      <rect x="27" y="21" width="50" height="31" rx="5" fill="currentColor" opacity="0.04" />
      <rect x="27" y="21" width="50" height="31" rx="5" {...softLine} />
      <rect x="35" y="29" width="34" height="14" rx="3" fill={accent} opacity="0.13" />
      <path d="M44 36H60" stroke={accent} strokeWidth="2.5" strokeLinecap="round" opacity="0.66" />
      {[34, 46, 58].map((x) => (
        <path key={x} d={`M${x} 59H${x + 6}M${x} 67H${x + 6}`} {...guideLine} />
      ))}
      <path d="M34 76H70" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" opacity="0.22" />
    </svg>
  );
}

export function Step3ChatBubble() {
  return (
    <svg viewBox="0 0 104 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M18 14H80C85 14 89 18 89 23V53C89 58 85 62 80 62H43L25 76V62H18C13 62 9 58 9 53V23C9 18 13 14 18 14Z"
        fill="currentColor"
        opacity="0.04"
      />
      <path
        d="M18 14H80C85 14 89 18 89 23V53C89 58 85 62 80 62H43L25 76V62H18C13 62 9 58 9 53V23C9 18 13 14 18 14Z"
        {...softLine}
      />
      <path d="M26 42L34 49L50 31M45 42L53 49L69 31" stroke={success} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Step3Timer() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="39" y="11" width="18" height="8" rx="4" fill="currentColor" opacity="0.12" />
      <path d="M32 25L26 17M64 25L70 17" {...guideLine} />
      <circle cx="48" cy="57" r="29" fill="currentColor" opacity="0.04" />
      <circle cx="48" cy="57" r="29" {...softLine} />
      <path d="M48 30C58 30 67 36 72 44" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.72" />
      <path d="M48 57V38M48 57H61" {...line} opacity="0.54" />
      <circle cx="48" cy="57" r="3.5" fill="currentColor" opacity="0.64" />
    </svg>
  );
}

export function Step3Lightning() {
  return (
    <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M46 9L20 52H38L31 87L61 40H43L46 9Z" fill="currentColor" opacity="0.86" />
      <path d="M28 53H16M37 87H25M54 40H66" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function Step3NoCourse() {
  return (
    <svg viewBox="0 0 104 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M52 19L88 37L52 55L16 37L52 19Z" fill="currentColor" opacity="0.04" />
      <path d="M52 19L88 37L52 55L16 37L52 19Z" {...softLine} />
      <path d="M30 47V61C35 69 43 73 52 73C61 73 69 69 74 61V47" {...softLine} fill="none" />
      <path d="M88 37V59" {...guideLine} />
      <circle cx="88" cy="64" r="3.5" fill="currentColor" opacity="0.16" />
      <path d="M22 75L82 20M82 75L22 20" stroke={danger} strokeWidth="4" strokeLinecap="round" opacity="0.62" />
    </svg>
  );
}
