const {tables} = require('../..');

module.exports = {
    seed: async (knex) => {
        await knex(tables.instrument).delete();

        await knex(tables.instrument).insert([
            {
                id: 1,
                name: 'Guitar',
                type: 'string',
                nrOfNotes: 6,
                description:
                    'A six-stringed instrument that is popular in a variety of music genres' +
                    ' known for its versatility and rich sound.',
                user_id: 1,

            },
            {
                id: 2,
                name: 'Violin',
                type: 'string',
                nrOfNotes: 4,
                description:
                    'A four-stringed instrument known for its high-pitched sound and prominent role' +
                    ' in classical music, orchestras, and various other music genres.',
                user_id: 1,


            },
            {
                id: 3,
                name: 'Cello',
                type: 'string',
                nrOfNotes: 4,
                description:
                    'A large string instrument that produces deep, rich tones, ' +
                    ' commonly used in orchestras and chamber music.',
                user_id: 1,


            },
            {
                id: 4,
                name: 'Bass',
                type: 'string',
                nrOfNotes: 4,
                description:
                    'A string instrument that provides the low-end foundation in many music genres,' +
                    ' including jazz, rock, and classical.',
                user_id: 1,


            },
            {
                id: 5,
                name: 'Guitar 7',
                type: 'string',
                nrOfNotes: 7,
                description:
                    'A seven-stringed guitar that extends the range of a standard guitar, often used in metal and jazz music.',
                user_id: 1,


            },
            {
                id: 6,
                name: 'Bass 5',
                type: 'string',
                nrOfNotes: 5,
                description:
                    'A five-stringed bass guitar that offers extended range and versatility, popular in various music genres.',
                user_id: 1,


            },
            {
                id: 7,
                name: 'Double bass',
                type: 'string',
                nrOfNotes: 4,
                description:
                    'The largest and lowest-pitched bowed string instrument, used in classical, jazz, and folk music.',
                user_id: 1,


            },
            {
                id: 8,
                name: 'Ukelele',
                type: 'string',
                nrOfNotes: 4,
                description:
                    'A small, four-stringed instrument that originated in Hawaii, known for its bright and cheerful sound.',

                user_id: 1,

            },
            {
                id: 9,
                name: 'Banjo',
                type: 'string',
                nrOfNotes: 5,
                description:
                    'A string instrument with a distinctive twangy sound, commonly used in folk, bluegrass, and country music.',
                user_id: 1,


            },
            {
                id: 10,
                name: 'Mandolin',
                type: 'string',
                nrOfNotes: 8,
                description:
                    'A small, eight-stringed instrument with a bright, plucky sound,' +
                    ' often used in bluegrass, folk, and classical music.',
                user_id: 1,


            },
            {
                id: 11,
                name: 'Guitar 12',
                type: 'string',
                nrOfNotes: 12,
                description:
                    'A twelve-stringed guitar that produces a rich, full sound, popular in folk, rock, and blues music.',
                user_id: 1,


            },
        ]);
    },
};
