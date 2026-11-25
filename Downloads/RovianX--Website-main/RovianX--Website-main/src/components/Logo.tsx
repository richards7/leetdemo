import React, { useState } from 'react';
import { BRAND_LOGO_CONFIG } from '../brandConfig';

/**
 * ============================================================================
 * QUICK LOGO CUSTOMIZATION:
 * ============================================================================
 * After downloading the code, you can easily use your original logo image:
 * 
 * 1. Place your logo file (e.g. `logo.png` or `ovian.png`) inside the `/public` folder.
 * 2. Either update `imageSrc` in `src/brandConfig.ts` OR change the path below:
 *    Example: const LOCAL_IMAGE_PATH = '/logo.png';
 * 
 * If the image path is provided, the website will display your exact image.
 * If the image hasn't been placed yet or fails to load, it will automatically
 * fall back to the built-in precision vector SVG logo.
 * ============================================================================
 */
export const LOCAL_IMAGE_PATH = BRAND_LOGO_CONFIG.imageSrc;

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
  variant?: 'light' | 'dark' | 'auto';
  src?: string; // Optional direct image path override
  alt?: string; // Optional alt text override
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtext = true,
  variant = 'auto',
  src,
  alt
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  // Height mappings with generous proportions for crystal clear legibility
  const heightMap = {
    sm: 'h-9 sm:h-10',
    md: 'h-14 sm:h-16 md:h-18',
    lg: 'h-20 sm:h-22',
    xl: 'h-24 sm:h-28'
  };

  const isDark = variant === 'dark';
  const navyColor = isDark ? '#FFFFFF' : '#083887';
  const cyanLegColor = '#2563EB';
  const xDark = isDark ? '#60A5FA' : '#1E3A68';
  const xLight = isDark ? '#93C5FD' : '#7D9FC7';
  const solutionsBlue = isDark ? '#60A5FA' : '#2563EB';
  const sublineColor = isDark ? '#CBD5E1' : '#083887';

  // Use the exact uploaded logo image directly across all contexts
  const defaultSrc = BRAND_LOGO_CONFIG.imageSrc;
  const activeImageSrc = src !== undefined ? src : defaultSrc;

  // Render user's custom image if provided and valid
  if (activeImageSrc && !imageFailed) {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={activeImageSrc}
          alt={alt || BRAND_LOGO_CONFIG.altText}
          className={`${heightMap[size]} w-auto max-w-full object-contain drop-shadow-xs transition-opacity duration-200`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            // Gracefully fall back to the vector logo if image file is not yet in public/
            setImageFailed(true);
          }}
        />
      </div>
    );
  }

  // Fallback: Built-in high-precision vector SVG logo
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 200"
        className={`${heightMap[size]} w-auto max-w-full drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt || BRAND_LOGO_CONFIG.altText}
      >
        <defs>
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800;900&display=swap');
              .logo-brand-text {
                font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                font-weight: 800;
              }
              .logo-sub-text {
                font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                font-weight: 700;
              }
              .logo-tagline-text {
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-weight: 600;
              }
            `}
          </style>
        </defs>

        <g id="rovianx-official-logo">
          {/* ================= 1. STYLIZED 'R' ================= */}
          {/* Vertical left stem and rounded top bowl (Deep Royal Navy) */}
          <path
            d="M 42 38 
               L 100 38 
               C 122 38 134 50 134 63 
               C 134 76 122 88 100 88 
               L 70 88 
               L 70 122 
               L 42 122 
               L 42 38 Z 
               M 70 56 
               L 96 56 
               C 106 56 110 60 110 63 
               C 110 66 106 70 96 70 
               L 70 70 
               L 70 56 Z"
            fill={navyColor}
          />

          {/* Dynamic forward-leaning leg of R (Vibrant Azure / Cyan Blue) */}
          <polygon
            points="76,88 104,88 136,122 108,122"
            fill={cyanLegColor}
          />

          {/* ================= 2. 'ovian' TEXT ================= */}
          <text
            x="146"
            y="122"
            fill={navyColor}
            fontSize="78"
            letterSpacing="-0.025em"
            className="logo-brand-text"
          >
            ovian
          </text>

          {/* ================= 3. STYLIZED 'X' ================= */}
          {/* Stroke 1: Top-Left to Bottom-Right (Deep Navy) */}
          <polygon
            points="370,38 398,38 454,122 426,122"
            fill={xDark}
          />

          {/* Stroke 2: Top-Right to Bottom-Left (Soft Slate Blue) */}
          <polygon
            points="454,38 426,38 370,122 398,122"
            fill={xLight}
            style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
          />

          {/* ================= 4. SOLUTIONS SUBTITLE ================= */}
          {showSubtext && (
            <>
              <text
                x="248"
                y="158"
                textAnchor="middle"
                fill={solutionsBlue}
                fontSize="21"
                letterSpacing="0.48em"
                className="logo-sub-text"
              >
                SOLUTIONS
              </text>

              {/* ================= 5. TAGLINE ROW ================= */}
              {/* Left hairline accent */}
              <line
                x1="42"
                y1="182"
                x2="108"
                y2="182"
                stroke={sublineColor}
                strokeWidth="1.8"
                strokeOpacity="0.85"
              />

              {/* IDEAS */}
              <text
                x="144"
                y="186"
                textAnchor="middle"
                fill={sublineColor}
                fontSize="12.5"
                letterSpacing="0.22em"
                className="logo-tagline-text"
              >
                IDEAS
              </text>

              {/* Bullet Dot 1 */}
              <circle
                cx="183"
                cy="182"
                r="4.2"
                fill={cyanLegColor}
              />

              {/* TECHNOLOGY */}
              <text
                x="248"
                y="186"
                textAnchor="middle"
                fill={sublineColor}
                fontSize="12.5"
                letterSpacing="0.22em"
                className="logo-tagline-text"
              >
                TECHNOLOGY
              </text>

              {/* Bullet Dot 2 */}
              <circle
                cx="313"
                cy="182"
                r="4.2"
                fill={cyanLegColor}
              />

              {/* IMPACT */}
              <text
                x="353"
                y="186"
                textAnchor="middle"
                fill={sublineColor}
                fontSize="12.5"
                letterSpacing="0.22em"
                className="logo-tagline-text"
              >
                IMPACT
              </text>

              {/* Right hairline accent */}
              <line
                x1="388"
                y1="182"
                x2="454"
                y2="182"
                stroke={sublineColor}
                strokeWidth="1.8"
                strokeOpacity="0.85"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
