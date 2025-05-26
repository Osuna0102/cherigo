import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'h21935xi',
  dataset: 'production',
  apiVersion: '2025-03-09',
  useCdn: true,
  //token: import.meta.env.VITE_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const fetchShippingZones = async () => {
  return await client.fetch(`*[_type == "shippingZone"]`);
};

export const getShippingFeeByCountry = (zones, countryCode) => {
  for (const zone of zones) {
    if (zone.countryCodes.includes(countryCode)) {
      return {
        fee: zone.feeUSD,
        minDays: zone.estimatedMinDays,
        maxDays: zone.estimatedMaxDays,
        name: zone.zoneName,
      };
    }
  }
  // fallback for rest of world
  return zones.find(z => z.zoneName.toLowerCase() === 'restOfWorld');
};