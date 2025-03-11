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
            name: 'details',
            title: 'Details',
            type: 'string'
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