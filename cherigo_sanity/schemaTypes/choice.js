export default {
    name: 'choice',
    title: 'Choice',
    type: 'object',
    fields: [
        {
            name: 'option',
            title: 'Option',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            validation: (Rule) => Rule.required().min(1),
        },
    ],
};