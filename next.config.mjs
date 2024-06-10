
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['images.pokemontcg.io'],
  }
};

export default withNextIntl(nextConfig);
