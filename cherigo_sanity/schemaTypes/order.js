import { defineType } from 'sanity'

export const OrderSchema = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      description: 'Unique order identifier from Stripe or generated'
    },
    {
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string'
    },
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }]
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number'
            },
            {
              name: 'choice',
              title: 'Choice',
              type: 'string'
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number'
            }
          ]
        }
      ]
    },
    {
      name: 'total',
      title: 'Total Amount',
      type: 'number'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
      },
      initialValue: 'pending'
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },
        { name: 'line1', type: 'string' },
        { name: 'line2', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'postal_code', type: 'string' },
        { name: 'country', type: 'string' }
      ]
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
})