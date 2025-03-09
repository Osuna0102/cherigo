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
