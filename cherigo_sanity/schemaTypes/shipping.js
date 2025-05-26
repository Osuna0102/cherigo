export const Shipping = {
  name: 'shippingZone',
  title: 'Shipping Zone',
  type: 'document',
  fields: [
    {
      name: 'zoneName',
      title: 'Zone Name',
      type: 'string',
    },
    {
      name: 'countryCodes',
      title: 'Country Codes (ISO 2-letter)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'feeUSD',
      title: 'Shipping Fee (USD)',
      type: 'number',
    },
    {
      name: 'estimatedMinDays',
      title: 'Min Delivery Time (Days)',
      type: 'number',
    },
    {
      name: 'estimatedMaxDays',
      title: 'Max Delivery Time (Days)',
      type: 'number',
    },
  ],
};
