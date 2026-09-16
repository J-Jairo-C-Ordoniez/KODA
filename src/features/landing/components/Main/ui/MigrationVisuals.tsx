/* Colores de la landing */
const bg = "var(--color-background)";

export function Step1Notebook() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Cubierta */}
      <rect x="22" y="10" width="58" height="76" rx="8" fill="currentColor" />
      {/* Espiral izquierda */}
      {[22, 34, 46, 58, 70].map((cy) => (
        <circle key={cy} cx="22" cy={cy} r="5" fill={bg} />
      ))}
      {/* Página interior */}
      <rect x="30" y="18" width="42" height="60" rx="4" fill={bg} opacity="0.15" />
      {/* Líneas de texto */}
      <rect x="36" y="28" width="28" height="4" rx="2" fill={bg} opacity="0.7" />
      <rect x="36" y="38" width="22" height="4" rx="2" fill={bg} opacity="0.5" />
      <rect x="36" y="48" width="28" height="4" rx="2" fill={bg} opacity="0.5" />
      <rect x="36" y="58" width="18" height="4" rx="2" fill={bg} opacity="0.5" />
      {/* Marcador */}
      <rect x="60" y="10" width="8" height="26" rx="4" fill={bg} opacity="0.6" />
    </svg>
  );
}

export function Step1Excel() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Hoja */}
      <rect x="12" y="10" width="72" height="76" rx="8" fill="currentColor" />
      {/* Pestaña superior */}
      <rect x="12" y="10" width="72" height="20" rx="8" fill={bg} opacity="0.12" />
      <rect x="12" y="22" width="72" height="8" fill="currentColor" />
      {/* Columnas guía */}
      <rect x="36" y="30" width="2" height="56" rx="1" fill={bg} opacity="0.15" />
      <rect x="60" y="30" width="2" height="56" rx="1" fill={bg} opacity="0.15" />
      {/* Filas */}
      {[42, 56, 70].map((y) => (
        <rect key={y} x="12" y={y} width="72" height="2" rx="1" fill={bg} opacity="0.15" />
      ))}
      {/* Celda X (error) */}
      <rect x="38" y="44" width="20" height="12" rx="3" fill={bg} opacity="0.18" />
      <path d="M43 48L53 56M53 48L43 56" stroke={bg} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      {/* Celda check */}
      <rect x="38" y="60" width="20" height="10" rx="3" fill={bg} opacity="0.18" />
      <path d="M42 65L46 69L54 61" stroke={bg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      {/* Logo X esquina */}
      <rect x="18" y="14" width="14" height="4" rx="2" fill={bg} opacity="0.8" />
    </svg>
  );
}

export function Step1Receipt() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Recibo con borde dentado */}
      <path
        d="M18 10H78V82L72 78L66 82L60 78L54 82L48 78L42 82L36 78L30 82L24 78L18 82V10Z"
        fill="currentColor"
      />
      {/* Cabecera */}
      <rect x="28" y="18" width="40" height="6" rx="3" fill={bg} opacity="0.8" />
      {/* Líneas */}
      <rect x="28" y="32" width="34" height="3" rx="1.5" fill={bg} opacity="0.5" />
      <rect x="28" y="42" width="26" height="3" rx="1.5" fill={bg} opacity="0.5" />
      <rect x="28" y="52" width="34" height="3" rx="1.5" fill={bg} opacity="0.5" />
      {/* Total */}
      <rect x="28" y="64" width="40" height="5" rx="2.5" fill={bg} opacity="0.25" />
      <rect x="52" y="64" width="16" height="5" rx="2.5" fill={bg} opacity="0.7" />
    </svg>
  );
}

export function Step1Cloud() {
  return (
    <svg viewBox="0 0 104 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Nube sólida */}
      <path
        d="M76 66H30C18 66 10 58 10 46C10 36 17 27 27 25C30 15 39 9 50 11C57 12 63 16 67 22C70 20 73 19 77 19C87 19 95 27 95 37C95 38 95 39 94 40C99 42 103 47 103 53C103 62 96 68 87 68"
        fill="currentColor"
      />
      {/* Check sólido */}
      <path d="M34 46L46 58L72 30" stroke={bg} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Step2PriceTag() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Etiqueta precio */}
      <path d="M20 24L46 12L80 46L46 80L12 46L20 24Z" fill="currentColor" />
      {/* Agujero */}
      <circle cx="30" cy="32" r="5.5" fill={bg} />
      {/* Símbolo $ */}
      <path
        d="M47 32V62M38 40C38 36 42 33 47 33C52 33 57 36 57 40C57 46 38 45 38 53C38 58 42 61 47 61C52 61 57 58 57 53"
        stroke={bg}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Step2InventoryBox() {
  return (
    <svg viewBox="0 0 104 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Caja */}
      <path d="M16 40H88V80H16V40Z" fill="currentColor" />
      {/* Tapa */}
      <path d="M16 40L28 20H76L88 40M52 20V40" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 40L52 52L88 40" stroke={bg} strokeWidth="4" strokeLinejoin="round" opacity="0.4" />
      {/* Franja central */}
      <rect x="40" y="52" width="24" height="20" rx="3" fill={bg} opacity="0.2" />
      <path d="M52 52V72M40 62H64" stroke={bg} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export function Step2Customer() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Persona */}
      <circle cx="40" cy="30" r="18" fill="currentColor" />
      <path d="M14 84C16 62 26 54 40 54C54 54 64 62 66 84Z" fill="currentColor" />
      {/* Badge check */}
      <circle cx="70" cy="26" r="16" fill="currentColor" />
      <circle cx="70" cy="26" r="10" fill={bg} opacity="0.25" />
      <path d="M63 26L68 31L78 19" stroke={bg} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Step2Register() {
  return (
    <svg viewBox="0 0 104 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Base caja registradora */}
      <rect x="14" y="50" width="76" height="32" rx="8" fill="currentColor" />
      {/* Pantalla */}
      <rect x="24" y="18" width="56" height="36" rx="7" fill="currentColor" />
      <rect x="30" y="24" width="44" height="20" rx="4" fill={bg} opacity="0.2" />
      {/* Texto pantalla */}
      <rect x="36" y="30" width="28" height="5" rx="2.5" fill={bg} opacity="0.8" />
      <rect x="36" y="38" width="16" height="4" rx="2" fill={bg} opacity="0.5" />
      {/* Teclas */}
      {[28, 44, 60].map((x) => [60, 70].map((y) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="12" height="8" rx="2" fill={bg} opacity="0.3" />
      )))}
    </svg>
  );
}

export function Step3ChatBubble() {
  return (
    <svg viewBox="0 0 104 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Burbuja principal */}
      <path
        d="M16 12H84C90 12 94 16 94 22V54C94 60 90 64 84 64H46L26 80V64H16C10 64 6 60 6 54V22C6 16 10 12 16 12Z"
        fill="currentColor"
      />
      {/* Checks leídos */}
      <path d="M24 42L32 50L50 30" stroke={bg} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 42L52 50L70 30" stroke={bg} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Step3Timer() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Botón superior */}
      <rect x="36" y="8" width="24" height="10" rx="5" fill="currentColor" />
      {/* Orejas */}
      <rect x="28" y="18" width="6" height="10" rx="3" fill="currentColor" transform="rotate(-20 28 18)" />
      <rect x="62" y="18" width="6" height="10" rx="3" fill="currentColor" transform="rotate(20 66 18)" />
      {/* Cuerpo reloj */}
      <circle cx="48" cy="60" r="32" fill="currentColor" />
      {/* Arco accent */}
      <path d="M48 28C60 28 71 35 77 46" stroke={bg} strokeWidth="7" strokeLinecap="round" opacity="0.35" />
      {/* Manecillas */}
      <path d="M48 60V40" stroke={bg} strokeWidth="6" strokeLinecap="round" />
      <path d="M48 60H64" stroke={bg} strokeWidth="6" strokeLinecap="round" />
      <circle cx="48" cy="60" r="5" fill={bg} />
    </svg>
  );
}

export function Step3Lightning() {
  return (
    <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Rayo sólido */}
      <path d="M48 6L18 54H38L28 90L64 38H44L48 6Z" fill="currentColor" />
    </svg>
  );
}

export function Step3NoCourse() {
  return (
    <svg viewBox="0 0 104 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Birrete/diploma */}
      <path d="M52 16L90 36L52 56L14 36L52 16Z" fill="currentColor" />
      <path d="M28 46V62C34 72 42 76 52 76C62 76 70 72 76 62V46L52 56L28 46Z" fill="currentColor" opacity="0.7" />
      <path d="M90 36V58" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <circle cx="90" cy="64" r="5" fill="currentColor" />
      {/* Tachado sólido */}
      <path d="M18 80L86 16" stroke={bg} strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      <path d="M86 80L18 16" stroke={bg} strokeWidth="10" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}
