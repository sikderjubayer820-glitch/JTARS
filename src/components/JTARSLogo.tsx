import React from 'react';

interface JTARSLogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

export const JTARSLogo: React.FC<JTARSLogoProps> = ({
  className = 'w-24 h-16',
  showText = true,
  textSize = 'text-3xl'
}) => {
  return (
    <div className="inline-flex items-center gap-2 group select-none">
      <svg
        viewBox="0 0 240 180"
        className={`${className} filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="jtars-silver-grad" x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.28" stopColor="#a9adb4" />
            <stop offset="0.52" stopColor="#f5f6f7" />
            <stop offset="0.78" stopColor="#b2b6bd" />
            <stop offset="1" stopColor="#f2f3f5" />
          </linearGradient>
        </defs>
        <g fill="url(#jtars-silver-grad)">
          <path d="M8 7C23 42 62 55 111 39L95 60C54 67 20 45 8 7Z" />
          <path d="M232 7C217 42 178 55 129 39L145 60C186 67 220 45 232 7Z" />
          <path d="M18 20C39 43 66 48 95 41C68 55 37 46 18 20Z" opacity="0.7" />
          <path d="M222 20C201 43 174 48 145 41C172 55 203 46 222 20Z" opacity="0.7" />
          <text
            x="120"
            y="94"
            textAnchor="middle"
            fontFamily="'Rajdhani', sans-serif"
            fontSize="43"
            fontWeight="700"
            letterSpacing="3"
            fill="url(#jtars-silver-grad)"
          >
            JTARS
          </text>
          <path d="M37 91L94 101L113 154L88 129L76 113L61 145L70 106Z" />
          <path d="M203 91L146 101L127 154L152 129L164 113L179 145L170 106Z" />
          <path d="M93 100L107 106L113 139L102 124L96 145L91 119L78 128Z" opacity="0.82" />
          <path d="M147 100L133 106L127 139L138 124L144 145L149 119L162 128Z" opacity="0.82" />
          <path d="M108 98L120 169L132 98L126 140L120 176L114 140Z" />
        </g>
      </svg>
      {showText && (
        <span
          className={`font-display font-bold tracking-[0.25em] ${textSize} text-[#f5f6f7] leading-none transform scale-x-105 origin-left`}
        >
          JTARS
        </span>
      )}
    </div>
  );
};
