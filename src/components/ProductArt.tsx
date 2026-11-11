import React, { useId } from 'react';
import { GarmentType } from '../types';

interface ProductArtProps {
  type: GarmentType;
  color: string;
  name?: string;
  className?: string;
}

function adjustColor(hex: string, amount: number): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (num & 255) + amount));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function isLightColor(hex: string): boolean {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  const r = num >> 16;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 145;
}

export const ProductArt: React.FC<ProductArtProps> = ({ type, color, name, className = '' }) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  const light = adjustColor(color, 42);
  const mid = adjustColor(color, 12);
  const dark = adjustColor(color, -28);
  const seam = adjustColor(color, 65);
  const isLight = isLightColor(color);
  const logoColor = isLight ? '#111317' : '#f1f2f3';

  const renderMiniLogo = (x: number, y: number, scale = 1) => (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={logoColor}>
      <path d="M0 0C7 9 18 10 28 5L24 12C14 14 5 9 0 0ZM52 0C45 9 34 10 24 5L28 12C38 14 47 9 52 0Z" />
      <text
        x="26"
        y="24"
        textAnchor="middle"
        fontFamily="'Rajdhani', sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing=".5"
        fill={logoColor}
      >
        JTARS
      </text>
      <path d="M7 24L21 27L26 45L31 27L45 24L35 33L31 31L26 49L21 31L17 33Z" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 300 230"
      role="img"
      aria-label={name || `${type} apparel`}
      className={`w-full h-full select-none ${className}`}
    >
      <defs>
        <linearGradient id={`${uid}-fabric`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="0.32" stopColor={mid} />
          <stop offset="0.72" stopColor={color} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <linearGradient id={`${uid}-hood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="0.55" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </linearGradient>
        <filter id={`${uid}-shadow`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000" floodOpacity="0.38" />
        </filter>
      </defs>

      {type === 'cap' && (
        <>
          <ellipse cx="150" cy="183" rx="94" ry="10" fill="#000" opacity="0.24" />
          <g filter={`url(#${uid}-shadow)`}>
            <path
              d="M82 137C81 82 105 45 151 43C199 41 222 79 218 137Z"
              fill={`url(#${uid}-fabric)`}
              stroke={light}
              strokeOpacity="0.35"
            />
            <path
              d="M82 137C54 140 39 151 43 163C50 181 130 183 194 163C220 155 239 145 254 137Z"
              fill={`url(#${uid}-fabric)`}
              stroke={light}
              strokeOpacity="0.35"
            />
            <path
              d="M151 44V136M112 55C98 77 95 105 96 136M190 55C204 77 207 105 204 136"
              fill="none"
              stroke={seam}
              strokeOpacity="0.32"
              strokeWidth="2"
            />
            <path
              d="M43 162C93 168 179 153 218 138"
              fill="none"
              stroke={seam}
              strokeOpacity="0.25"
              strokeWidth="2"
            />
            <circle cx="151" cy="43" r="5" fill={light} />
            {renderMiniLogo(126, 82, 0.95)}
          </g>
        </>
      )}

      {type === 'tshirt' && (
        <>
          <ellipse cx="150" cy="211" rx="86" ry="8" fill="#000" opacity="0.22" />
          <g filter={`url(#${uid}-shadow)`}>
            <path
              d="M121 42 105 48 78 56 41 101 70 126 89 104 86 202Q150 214 214 202L211 104 230 126 259 101 222 56 195 48 179 42Q150 58 121 42Z"
              fill={`url(#${uid}-fabric)`}
              stroke={light}
              strokeOpacity="0.34"
            />
            <path
              d="M121 42Q150 71 179 42L171 37Q150 52 129 37Z"
              fill={dark}
              stroke={seam}
              strokeOpacity="0.35"
            />
            <path
              d="M89 104 82 85M211 104 218 85M91 193Q150 202 209 193"
              fill="none"
              stroke={seam}
              strokeOpacity="0.27"
              strokeWidth="2"
            />
            <path
              d="M103 67C96 107 99 160 96 187M197 67C204 107 201 160 204 187"
              fill="none"
              stroke={light}
              strokeOpacity="0.13"
              strokeWidth="3"
            />
            {renderMiniLogo(121, 91, 1.12)}
          </g>
        </>
      )}

      {(type === 'hoodie' || type === 'sweatshirt' || type === 'jacket') && (
        <>
          <ellipse cx="150" cy="213" rx="88" ry="8" fill="#000" opacity="0.23" />
          <g filter={`url(#${uid}-shadow)`}>
            <path
              d="M105 62 85 69C70 75 62 91 56 110L39 169 68 180 86 139 90 203Q150 214 210 203L214 139 232 180 261 169 244 110C238 91 230 75 215 69L195 62 178 51H122Z"
              fill={`url(#${uid}-fabric)`}
              stroke={light}
              strokeOpacity="0.34"
            />

            {type === 'hoodie' && (
              <>
                <path
                  d="M110 66C101 47 107 24 123 15C139 5 161 5 177 15C193 24 199 47 190 66L174 82H126Z"
                  fill={`url(#${uid}-hood)`}
                  stroke={light}
                  strokeOpacity="0.4"
                />
                <path
                  d="M124 60C117 42 125 24 150 19C175 24 183 42 176 60L165 70H135Z"
                  fill={dark}
                  stroke={seam}
                  strokeOpacity="0.28"
                />
                <path
                  d="M133 63 128 91M167 63 172 91"
                  fill="none"
                  stroke={logoColor}
                  strokeOpacity="0.75"
                  strokeWidth="2"
                />
                <circle cx="128" cy="91" r="2" fill={logoColor} />
                <circle cx="172" cy="91" r="2" fill={logoColor} />
              </>
            )}

            {type === 'jacket' && (
              <>
                <path
                  d="M119 49 136 39 150 57 164 39 181 49 172 76 150 61 128 76Z"
                  fill={`url(#${uid}-hood)`}
                  stroke={light}
                  strokeOpacity="0.4"
                />
                <path
                  d="M136 39 150 57 164 39"
                  fill="none"
                  stroke={seam}
                  strokeOpacity="0.45"
                  strokeWidth="2"
                />
              </>
            )}

            {type === 'sweatshirt' && (
              <>
                <path
                  d="M119 52Q150 76 181 52L173 40Q150 56 127 40Z"
                  fill={dark}
                  stroke={seam}
                  strokeOpacity="0.4"
                />
                <path
                  d="M126 48Q150 65 174 48"
                  fill="none"
                  stroke={light}
                  strokeOpacity="0.45"
                  strokeWidth="3"
                />
              </>
            )}

            <path
              d="M86 139 79 113M214 139 221 113M91 194Q150 204 209 194M42 163 69 173M231 173 258 163"
              fill="none"
              stroke={seam}
              strokeOpacity="0.28"
              strokeWidth="2"
            />
            <path
              d="M102 78C95 112 101 158 98 187M198 78C205 112 199 158 202 187"
              fill="none"
              stroke={light}
              strokeOpacity="0.12"
              strokeWidth="3"
            />

            {type === 'hoodie' && (
              <path
                d="M121 157H179L185 181H115Z"
                fill={dark}
                fillOpacity="0.28"
                stroke={seam}
                strokeOpacity="0.3"
              />
            )}

            {type === 'jacket' && (
              <>
                <path d="M150 61V204" stroke={seam} strokeOpacity="0.65" strokeWidth="3" />
                <path d="M154 66V199" stroke="#090a0b" strokeOpacity="0.55" />
                <path d="M112 146H133M167 146H188" stroke={seam} strokeOpacity="0.4" strokeWidth="2" />
              </>
            )}

            {renderMiniLogo(
              type === 'jacket' ? 169 : 121,
              type === 'hoodie' ? 102 : 91,
              type === 'jacket' ? 0.72 : 1.12
            )}
          </g>
        </>
      )}
    </svg>
  );
};
