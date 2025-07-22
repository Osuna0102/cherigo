import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'h21935xi',
  dataset: 'production',
  apiVersion: '2025-03-09',
  useCdn: true,
  //token: process.env.SANITY_TOKEN
});

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
  // fallback for rest of world (case-insensitive, handle spaces/underscores)
  return zones.find(z =>
    z.zoneName &&
    z.zoneName.replace(/\s|_/g, '').toLowerCase() === 'restofworld'
  );
};
