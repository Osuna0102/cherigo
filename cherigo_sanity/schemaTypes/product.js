
import { ImageIcon } from "@sanity/icons";

export const ProductSchema = 
{
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            title: 'Categories',
            name: 'categories',
            type: 'array',
            of: [{type: 'string'}],
            options: {
              layout: 'categories'
            }
        },
        {
            title: 'Choices',
            name: 'choices',
            type: 'array',
            of: [{type: 'string'}],
            options: {
              layout: 'choices'
            }
        },
        {
            name: 'details',
            title: 'Details',
            type: 'array',
              of: [
             {
                  type: 'block',
                  marks: {
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'url',
                            title: 'Url',
                          },
                        ],
                      },
                    ],
                  },
                  styles: [],
                },
                // Custom blocks
                {
                  name: 'timeline',
                  type: 'timeline',
                },
               {
                  type: 'image',
                  icon: ImageIcon,
                  name: 'image',
                  title: 'Image',
                  options: {
                    hotspot: true,
                  },
                  preview: {
                    select: {
                      imageUrl: 'asset.url',
                      title: 'caption',
                    },
                  },
                  fields: [
                    {
                      title: 'Caption',
                      name: 'caption',
                      type: 'string',
                    },
                   {
                      name: 'alt',
                      type: 'string',
                      title: 'Alt text',
                      description:
                        'Alternative text for screenreaders. Falls back on caption if not set',
                    },
                  ],
                },
                { type: 'youtube'  },
              ],
            },
        {
            name: 'inventory',
            title: 'Inventory',
            type: 'number',
            description: 'Number of items available'
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'number',
            description: 'Discount percentage on the price'
        }
    ]
}