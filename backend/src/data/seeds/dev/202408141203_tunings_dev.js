const {tables} = require("../..");

module.exports = {
    seed: async (knex) => {
        // Deletes ALL existing entries
        await knex(tables.tuning).delete();

        // Inserts seed entries
        await knex(tables.tuning).insert([
            //1 Guitar
            {
                id: 1,
                name: "Standard",
                notes: JSON.stringify([20, 25, 30, 35, 39, 44]), // E2, A2, D3, G3, B3, E4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 2,
                name: "Drop D",
                notes: JSON.stringify([18, 25, 30, 35, 39, 44]), // D2, A2, D3, G3, B3, E4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 3,
                name: "Eb Standard",
                notes: JSON.stringify([19, 24, 29, 34, 38, 43]), // Eb2, Ab2, Db3, Gb3, Bb3, Eb4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 4,
                name: "D Standard",
                notes: JSON.stringify([18, 23, 28, 33, 37, 42]), // D2, G2, C3, F3, A3, D4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 5,
                name: "Drop C",
                notes: JSON.stringify([16, 23, 28, 33, 37, 42]), // C2, G2, C3, F3, A3, D4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 6,
                name: "Open G",
                notes: JSON.stringify([18, 23, 30, 35, 39, 42]), // D2, G2, D3, G3, B3, D4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 7,
                name: "Open D",
                notes: JSON.stringify([18, 25, 30, 34, 37, 42]), // D2, A2, D3, F#3, A3, D4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 8,
                name: "Open C",
                notes: JSON.stringify([16, 23, 28, 35, 40, 44]), // C2, G2, C3, G3, C4, E4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 9,
                name: "Open A",
                notes: JSON.stringify([20, 25, 29, 32, 37, 44]), // E2, A2, C#3, E3, A3, E4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            {
                id: 10,
                name: "DADGAD",
                notes: JSON.stringify([18, 25, 30, 35, 37, 42]), // D2, A2, D3, G3, A3, D4
                isCustom: false,
                instrument_id: 1,
                user_id: 1,
            },
            //2 Violin
            {
                id: 11,
                name: "Standard",
                notes: JSON.stringify([35, 42, 49, 56]), // G3, D4, A4, E5
                isCustom: false,
                instrument_id: 2,
                user_id: 1,
            },
            //3 Cello
            {
                id: 12,
                name: "Standard",
                notes: JSON.stringify([16, 23, 30, 37]), // C2, G2, D3, A3
                isCustom: false,
                instrument_id: 3,
                user_id: 1,
            },
            //4 Bass
            {
                id: 13,
                name: "Standard",
                notes: JSON.stringify([8, 13, 18, 23]), // E1, A1, D2, G2
                isCustom: false,
                instrument_id: 4,
                user_id: 1,
            },
            {
                id: 14,
                name: "Drop D",
                notes: JSON.stringify([6, 13, 18, 23]), // D1, A1, D2, G2
                isCustom: false,
                instrument_id: 4,
                user_id: 1,
            },
            {
                id: 15,
                name: "D Standard",
                notes: JSON.stringify([6, 11, 16, 21]), // D1, G1, C2, F2
                isCustom: false,
                instrument_id: 4,
                user_id: 1,
            },

            {
                id: 17,
                name: "Eb Standard",
                notes: JSON.stringify([7, 12, 17, 22]), // Eb1, Ab1, Db2, Gb2
                isCustom: false,
                instrument_id: 4,
                user_id: 1,
            },
            //5 Guitar 7
            {
                id: 18,
                name: "Standard",
                notes: JSON.stringify([15, 20, 25, 30, 35, 39, 44]), // B1, E2, A2, D3, G3, B3, E4
                isCustom: false,
                instrument_id: 5,
                user_id: 1,
            },
            {
                id: 19,
                name: "Drop A",
                notes: JSON.stringify([13, 20, 25, 30, 35, 39, 44]), // A1, E2, A2, D3, G3, B3, E4
                isCustom: false,
                instrument_id: 5,
                user_id: 1,
            },
            {
                id: 20,
                name: "Drop G",
                notes: JSON.stringify([11, 20, 25, 30, 35, 39, 44]), // G1, E2, A2, D3, G3, B3, E4
                isCustom: false,
                instrument_id: 5,
                user_id: 1,
            },
            {
                id: 21,
                name: "Bb Standard",
                notes: JSON.stringify([14, 19, 24, 29, 34, 38, 43]), // Bb1, Eb2, Ab2, Db3, Gb3, Bb3, Eb4
                isCustom: false,
                instrument_id: 5,
                user_id: 1,
            },
            //Bass 5
            {
                id: 22,
                name: "Standard",
                notes: JSON.stringify([3, 8, 13, 18, 23]), // B0, E1, A1, D2, G2
                isCustom: false,
                instrument_id: 6,
                user_id: 1,
            },
            {
                id: 24,
                name: "Drop A",
                notes: JSON.stringify([1, 8, 13, 18, 23]), // A0, E1, A1, D2, G2
                isCustom: false,
                instrument_id: 6,
                user_id: 1,
            },
            {
                id: 25,
                name: "Bb standard",
                notes: JSON.stringify([2, 7, 12, 17, 22]), // Bb0, Eb1, Ab1, Db2, Gb2
                isCustom: false,
                instrument_id: 6,
                user_id: 1,
            },
            //7 Double bass
            {
                id: 28,
                name: "Standard",
                notes: JSON.stringify([8, 13, 18, 23]), // E1, A1, D2, G2
                isCustom: false,
                instrument_id: 7,
                user_id: 1,
            },
            //8 Ukelele
            {
                id: 29,
                name: "Standard",
                notes: JSON.stringify([47, 40, 44, 49]), // G4, C4, E4, A4
                isCustom: false,
                instrument_id: 8,
                user_id: 1,
            },
            {
                id: 30,
                name: "Baritone",
                notes: JSON.stringify([30, 35, 39, 44]), // D3, G3, B3, E4
                isCustom: false,
                instrument_id: 8,
                user_id: 1,
            },
            {
                id: 31,
                name: "Low G",
                notes: JSON.stringify([35, 40, 44, 49]), // G3, C4, E4, A4
                isCustom: false,
                instrument_id: 8,
                user_id: 1,
            },
            {
                id: 32,
                name: "D Tuning",
                notes: JSON.stringify([49, 42, 46, 54]), // A4, D4, F#4, D5
                isCustom: false,
                instrument_id: 8,
                user_id: 1,
            },
            //9 Banjo
            {
                id: 33,
                name: "Standard G",
                notes: JSON.stringify([47, 30, 35, 39, 42]), // G4, D3, G3, B3, D4
                isCustom: false,
                instrument_id: 9,
                user_id: 1,
            },
            {
                id: 34,
                name: "Double C",
                notes: JSON.stringify([47, 28, 35, 40, 42]), // G4, C3, G3, C4, D4
                isCustom: false,
                instrument_id: 9,
                user_id: 1,
            },
            {
                id: 35,
                name: "Open D",
                notes: JSON.stringify([46, 30, 34, 37, 42]), // F#4, D3, F#3, A3, D4
                isCustom: false,
                instrument_id: 9,
                user_id: 1,
            },
            //10 Mandolin
            {
                id: 36,
                name: "Standard",
                notes: JSON.stringify([35, 35, 42, 42, 49, 49, 56, 56]), // G3, D4, A4, E5
                isCustom: false,
                instrument_id: 10,
                user_id: 1,
            },

            {
                id: 38,
                name: "Open G",
                notes: JSON.stringify([35, 35, 42, 42, 47, 47, 54, 54]), // G3, D4, G4, D5
                isCustom: false,
                instrument_id: 10,
                user_id: 1,
            },
            //11 Guitar 12
            {
                id: 39,
                name: "Standard",
                notes: JSON.stringify([
                    20,
                    32, // E2, E3
                    25,
                    37, // A2, A3
                    30,
                    42, // D3, D4
                    35,
                    47, // G3, G4
                    39,
                    39, // B3, B3
                    44,
                    44, // E4, E4
                ]), // E2, E3, A2, A3, D3, D4, G3, G4, B3, B3, E4, E4
                isCustom: false,
                instrument_id: 11,
                user_id: 1,
            },
        ]);
    },
};
