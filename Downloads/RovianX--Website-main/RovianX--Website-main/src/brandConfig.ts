/**
 * ============================================================================
 * ROVIANX SOLUTIONS - BRAND & LOGO CONFIGURATION
 * ============================================================================
 * 
 * HOW TO USE YOUR OWN LOGO IMAGE AFTER DOWNLOADING:
 * 
 * 1. Copy your logo image file (PNG, JPG, SVG, WebP) into the `public/` folder.
 *    (For example: save your file as `public/logo.png` or `public/ovian.png`)
 * 
 * 2. Paste the filename/path below into `imageSrc`:
 *    Example: imageSrc: '/logo.png'
 *    Example: imageSrc: '/ovian.png'
 *    Example: imageSrc: 'https://example.com/my-logo.png'
 * 
 * Note: If the file is not found or this is left empty, the site will 
 * automatically fall back to the built-in precision vector SVG logo.
 */

import rovianxUploadedLogo from './assets/images/rovianx_logo_transparent.png';
import rovianxJpgLogo from './assets/images/rovianx_logo_1789013386014.jpg';

/**
 * ============================================================================
 * ROVIANX SOLUTIONS - BRAND & LOGO CONFIGURATION
 * ============================================================================
 * 
 * Centralized brand configuration referencing authentic high-resolution
 * logo assets for headers, footers, visual cards, and metadata.
 */

export const BRAND_LOGO_CONFIG = {
  /**
   * Primary exact uploaded logo asset
   */
  imageSrc: rovianxUploadedLogo,

  /**
   * User-uploaded source asset
   */
  uploadedSrc: rovianxUploadedLogo,

  /**
   * High-definition master asset
   */
  hqImageSrc: rovianxUploadedLogo,

  /**
   * Exact logo for all light and dark containers
   */
  exactLogoSrc: rovianxUploadedLogo,

  /**
   * JPG variant
   */
  jpgSrc: rovianxJpgLogo,

  /**
   * Public static file URLs for external referrers & link tags
   */
  publicUrls: {
    standard: '/ovian.png',
    logo: '/logo.png',
    jpg: '/logo.jpg',
  },

  /**
   * Accessible Alt Text for search engines & screen readers
   */
  altText: 'RovianX Solutions - Ideas • Technology • Impact',
};

