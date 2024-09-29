// cardConfig.js

// Default values for missing properties
export const defaultContent = {
    text: 'link',
    link: 'https://www.youtube.com/embed/oMYGJAO-0k8?si=AOfmtf7OMwynI0in',
    images: [
        { src: 'https://i.pinimg.com/564x/30/5c/63/305c63e2b038408f83545c75183102ec.jpg', duration: 4000 }
    ],
    textStyle: {
        fontSize: '8px',
        color: 'black',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '70px'
    },
    defaultSlideshowDuration: 5000, // 5 seconds
    defaultTransition: 500 // 0.5 seconds
};

// Function to set custom background
export function setCustomBackground(url) {
    const backgroundElement = document.getElementById('custom-background');
    if (backgroundElement) {
        backgroundElement.style.backgroundImage = `url('${url}')`;
    }
}

// ... rest of the existing code ...

// Function to fill in missing properties with default values
function fillDefaults(content) {
    return {
        text: content.text || defaultContent.text,
        link: content.link || defaultContent.link,
        images: content.images || defaultContent.images,
        textStyle: { ...defaultContent.textStyle, ...content.textStyle },
        defaultSlideshowDuration: content.defaultSlideshowDuration || defaultContent.defaultSlideshowDuration,
        defaultTransition: content.defaultTransition || defaultContent.defaultTransition
    };
}

// Array of cardContent items
export const cardContents = [
    //1
    fillDefaults({
        text: 'ocean vitality',
        link: 'https://assets.pinterest.com/ext/embed.html?id=892768326111882402',
        images: [
            { src: 'https://i.pinimg.com/736x/61/69/fd/6169fde0a3287171c1ed4d93f0d5cbc7.jpg' }
            //pretty seascape
        ]
    }),
    //2
    fillDefaults({
        text: 'pretty seas',
        link: 'https://assets.pinterest.com/ext/embed.html?id=135108057565352833',
        images: [
            { src: 'https://i.pinimg.com/564x/74/73/74/747374d11d0abb4174b1b7bf060c3cca.jpg' }
        ]
    }),
    //3
    fillDefaults({
        text: 'cool music',
        link: 'https://www.youtube.com/embed/YUX8fUrKRNU?si=7PKlMUKcKOWzC7oP',
        images: [
            { src: 'https://i.pinimg.com/736x/e1/e7/b0/e1e7b0ec8039991dbe7a3dd8fb692b81.jpg' }
        ]
    }),
    //4
    fillDefaults({
        text: 'cheerful music',
        link: 'https://www.youtube.com/embed/p7pY1urd26w?si=jvc_khftU166AejW',
        images: [
            { src: 'https://i.pinimg.com/564x/e0/dd/fa/e0ddfa0c86d053b8a1b21ccc402e8338.jpg' }
            //water wave shadows
        ]
    }),
    //5
    fillDefaults({
        text: 'dreamy music',
        link: 'https://www.youtube.com/embed/V5Dt23gpwqs?si=7k4tR9ibK9n5PN12',
        images: [
            { src: 'https://i.pinimg.com/564x/e4/6b/e7/e46be7073d5fff1b418831836df778dd.jpg' }
            //seals
        ]
    }),
    //6
    fillDefaults({
        text: 'very cool music',
        link: 'https://www.youtube.com/embed/YUX8fUrKRNU?si=UO2Gf-XB1s92tjrO',
        images: [
            { src: 'https://i.pinimg.com/564x/84/7d/67/847d67660571aa528cb1400ffeec0387.jpg' }
            //view on reef from surface
        ]
    }),
    //7
    fillDefaults({
        text: 'Tame Impala',
        link: 'https://www.youtube.com/embed/skX4FftyT1s?si=NiYjP277gVoWku_q',
        images: [
            { src: 'https://i.pinimg.com/564x/d6/6b/56/d66b56ed1b7960a12a1b3c9f0720d4b6.jpg' }
            // alien dolphins
        ]
    }),
    //8
    fillDefaults({
        text: 'chill music',
        link: 'https://www.youtube.com/embed/rpV4rhb7SaQ?si=sgG829eooJoouOXI',
        images: [
            { src: 'https://i.pinimg.com/736x/f2/45/dc/f245dc05a92acb5f2ae2cf67b90efae0.jpg' }
            //pixelated sea
        ]
    }),
    //9
    fillDefaults({
        text: 'Empire of the S - music',
        link: 'https://www.youtube.com/embed/JAr3y9X63Kc?si=noeTPASq4OCtZKoZ',
        images: [
            { src: 'https://i.pinimg.com/564x/c0/0e/55/c00e557c15eea2142eb5887556164bb7.jpg' }
            //sea grass
        ]
    }),
    //10
    fillDefaults({
        text: 'chillwave music',
        link: 'https://www.youtube.com/embed/WI4-HUn8dFc?si=aMSrV9GAGVefi7Lc',
        images: [
            { src: 'https://i.pinimg.com/564x/7d/e2/f5/7de2f564112df95c244e28b4b60fe307.jpg' }
            //plastic looking colorful shark
        ]
    }),
    //11
    fillDefaults({
        text: 'Still Corners - musci',
        link: 'https://www.youtube.com/embed/V5YOhcAof8I?si=9C0XhSQSq9I1V1sG',
        images: [
            { src: 'https://i.pinimg.com/564x/73/26/82/73268294b9a8396ce647137e01927208.jpg' }
        ]
    }),
    //12
    fillDefaults({
        text: 'Røyksopp - music',
        link: 'https://www.youtube.com/embed/JDBzeM6KLlQ?si=hHgj2pNFVYsVl9R8',
        images: [
            { src: 'https://i.pinimg.com/564x/0f/e2/ff/0fe2ff03426a6ba8bfa63adefcd39519.jpg' }
            //mermaid gang
        ]
    }),
    //13
    fillDefaults({
        text: 'the calmest music',
        link: 'https://www.youtube.com/embed/KSEpSpIrt98?si=-bcmVoqmmTQqlpWh',
        images: [
            { src: 'https://i.pinimg.com/564x/ae/3e/0c/ae3e0c934e45e12d34ddd9821a61fa10.jpg' }
        ]
    }),
    //14
    fillDefaults({
        text: 'The salmon dance',
        link: 'https://www.youtube.com/embed/dDj7DuHVV9E?si=MQjlh6LehHqCOlKU',
        images: [
            { src: 'https://i.pinimg.com/564x/53/29/d3/5329d39b6e580fbd22315157ed3fc0f5.jpg' }
            //shrimp on a computer
        ]
    }),
    //15
    fillDefaults({
        text: 'dreamy music',
        link: 'https://www.youtube.com/embed/8GW6sLrK40k?si=YteaPAFfXbnRucVB',
        images: [
            { src: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDA4eHV3d3psbG9kbmF5ZmkyanR5YTAybWZyMWp4dWcyMmpjNXdoeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2YZJj7ss1MjOwM/giphy.webp' }
        ]
    }),
    //16
    fillDefaults({
        text: 'very cool music',
        link: 'https://www.youtube.com/embed/ZKSM-jyQh3o?si=4kxU8ZIsZfc0Z5LF',
        images: [
            { src: 'https://i.pinimg.com/564x/cf/50/3a/cf503a207cb98e9039fb66efb4d1ec16.jpg' }
            //lillies
        ]
    }),
    //17
    fillDefaults({
        text: 'music',
        link: 'https://www.youtube.com/embed/j7HfxgQdDW4?si=xC5BvdBtfJNb5sUw',
        images: [
            { src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHhvMXN4em9mOHVxM3F3dTdldnFtbmM4dnk0Y2loNHQ4bDZhcDB1dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2ASnsAoUwwuiQg/giphy.webp' }
            //seagrass and fish
        ]
    }),
    //18
    fillDefaults({
        text: 'feet - music',
        link: 'https://www.youtube.com/embed/s5tKHiu5gws?si=TYBdbDPfuzMhLVI0',
        images: [
            { src: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHhhajBndnJneDh3c21wN2FycmE0emxsa21pOTZvb2JpN2hkYXJreSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gptkyO5tS3A2QEEWEl/giphy.webp' }
            //more seagrass
        ]
    }),
    //19
    fillDefaults({
        text: 'Casiopea - mint jams',
        link: 'https://www.youtube.com/embed/q23fD1Kg7SI?si=8sbevgRmSjuzEnCn',
        images: [
            { src: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDM4OW45czNrY25ubGZ6ZXlqcGl1bTB1ZDkxYjZrajIxc2s3azl6NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lMZrblc3osP14VDywq/giphy.webp' }
        ]
    }),
    //20
    fillDefaults({
        text: 'Limperatrice',
        link: 'https://www.youtube.com/embed/S2NZLSfAeIc?si=70lMPNXrgUCGPFQE',
        images: [
            { src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVuczF5MWJpamVqaGowdXdncHBkZmxxcGZreGdoNHFoNGF3aGs0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LSKsoZvvMl92R6YZ2o/giphy.webp' }
            //nemo
        ]
    }),
    //21
    fillDefaults({
        text: 'killing machine',
        link: 'https://assets.pinterest.com/ext/embed.html?id=756323331190019257',
        images: [
            { src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmptcHl6djFuc2VrZWY5dHQ0Z2hhODM3eHpjb3NpMjJndnd5c2E2dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rVC4HgciIpYGI/giphy.webp' }
            //fish parting for shark
        ]
    }),
    //22
    fillDefaults({
        text: 'wanna see something weird?',
        link: 'https://www.youtube.com/embed/lZbfNtDCHdM?si=oTBswKhvE_ih9c46',
        images: [
            { src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGJhYXN2dGt2bzl4YWJyeWQyamlhN3k4ZGlvZThnZWFvcDYzbWp2OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dXi0qrwYhBZXdryEN1/giphy.webp' }
            //turtle
        ]
    }),
    //23
    fillDefaults({
        text: 'trust me, you want this game!',
        link: 'https://www.youtube.com/embed/p85VHMpE0to?si=7-ajdRqfyxdux8dg',
        images: [
            { src: 'https://i.pinimg.com/564x/e9/b4/e4/e9b4e42ba3ac1647452890b025305865.jpg' }
            //dave the diver
        ]
    }),
    //24
    fillDefaults({
        text: 'bubbles',
        link: 'https://assets.pinterest.com/ext/embed.html?id=603271312604644809',
        images: [
            { src: 'https://i.pinimg.com/564x/50/c0/94/50c0946000606fd1758b6f180e1df257.jpg' }
            //seal
        ]
    }),
    //25
    fillDefaults({
        text: 'agar agar - music',
        link: 'https://www.youtube.com/embed/Yp257b5APOg?si=-tX3Ax_B5vDyPu8Z',
        images: [
            { src: 'https://i.pinimg.com/originals/18/c3/1f/18c31ff0a02cf6ca402edfe311ba38be.gif' }
        ]
    }),
    //26
    fillDefaults({
        text: 'they are agile!',
        link: 'https://assets.pinterest.com/ext/embed.html?id=889460995129950174',
        images: [
            { src: 'https://i.pinimg.com/originals/b5/80/22/b58022d1af97fde9f2a85135f6d2ab77.gif' }
        ]
    }),
    //27
    fillDefaults({
        text: 'more manatees',
        link: 'https://assets.pinterest.com/ext/embed.html?id=262123640804845063',
        images: [
            { src: 'https://i.pinimg.com/564x/a3/f4/8f/a3f48f3286173a8915d9c433a2e3d321.jpg' }
             //manatee
        ]
    }),
    //28
    fillDefaults({
        text: 'actually an eel',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978128098',
        images: [
            { src: 'https://i.pinimg.com/originals/ab/f4/59/abf459886dde21d8b2f867cfa498c5a8.gif' }
            //sea snakes
        ]
    }),
    //29
    fillDefaults({
        text: 'close-up',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978120072',
        images: [
            { src: 'https://i.pinimg.com/originals/7e/45/46/7e454692c351e7a30bbf1dd46e2d0240.gif' }
             //writhing tentacles gif
        ]
    }),
    //30
    fillDefaults({
        text: 'more like this',
        link: 'https://assets.pinterest.com/ext/embed.html?id=2181499815323809',
        images: [
            { src: 'https://i.pinimg.com/originals/be/14/1b/be141b5f8bfd10a522176b7c612b9fd0.gif' }
            //serene waters
        ]
    }),
    //31
    fillDefaults({
        text: 'bobbit worms',
        link: 'https://assets.pinterest.com/ext/embed.html?id=12666442696175548',
        images: [
            { src: 'https://i.pinimg.com/564x/69/44/cc/6944cc645423c3a0cd242946330a48c9.jpg' }
            //worms
        ]
    }),
    //32
    fillDefaults({
        text: 'it gets stranger',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978129029',
        images: [
            { src: 'https://i.prcdn.co/img?regionKey=dYPsi7rz73yPzJQLYKrXjg%3D%3D' }
             //rainbow belly pipefish
        ]
    }),
    //33
    fillDefaults({
        text: 'majestic octopus',
        link: 'https://assets.pinterest.com/ext/embed.html?id=59672763807269103',
        images: [
            { src: 'https://i.pinimg.com/564x/73/fe/d5/73fed56358a957a47bc5e2d52c9f4de3.jpg'},      
            //drunk octopus
        ]
    }),
    //34
    fillDefaults({
        text: 'hypnotic sea grass',
        link: 'https://www.youtube.com/embed/oMYGJAO-0k8?si=NQml2LXi-7qibPbb',
        images: [
            { src: 'https://i.pinimg.com/564x/31/8d/8b/318d8b79e5f192fb6fbf927d5870a332.jpg' }
             //sea grass
        ]
    }),
    //35
    fillDefaults({
        text: 'more sea grass...',
        link: 'https://www.youtube.com/embed/oMYGJAO-0k8?si=AOfmtf7OMwynI0in',
        images: [
            { src: 'https://i.pinimg.com/564x/73/6a/c9/736ac98add389df10edef7514cd96da3.jpg' }
             //sea grass too
        ]
    }),
    //36
    fillDefaults({
        text: 'click to continue',
        link: 'https://assets.pinterest.com/ext/embed.html?id=374361787787917512',
        images: [
            { src: 'https://i.pinimg.com/736x/b9/6f/83/b96f83a99b607e6a5b7a7f6960c693fd.jpg' }
             //water lilly plates
        ]
    }),
    //37
    fillDefaults({
        text: 'cthulhu?',
        link: '',
        images: [
            { src: 'https://i.pinimg.com/564x/29/fb/3b/29fb3bd0fb3651bd6ac2ee762f590776.jpg' }
             //fisherman on a tentacle
        ]
    }),
    //38
    fillDefaults({
        text: 'jellies and salad',
        link: 'https://assets.pinterest.com/ext/embed.html?id=1046875875875762571',
        images: [
            { src: 'https://i.pinimg.com/564x/85/27/e0/8527e03ee77012721186d0ef756c7cfc.jpg' }
             //jellyfish
        ]
    }),
    //39
    fillDefaults({
        text: 'cute shark',
        link: 'https://assets.pinterest.com/ext/embed.html?id=7881368092585731',
        images: [
            { src: 'https://i.pinimg.com/564x/be/ce/44/bece44877aa7f4d8aab94f634a4a987e.jpg' }
             //shark
        ]
    }),
    //40
    fillDefaults({
        text: 'vegetarianism',
        link: 'https://assets.pinterest.com/ext/embed.html?id=3518505952291724',
        //iguana video
        images: [
            { src: 'https://i.pinimg.com/564x/82/88/b8/8288b817f2f3c6fedf2535d2cc7eed2d.jpg' }
            //marine iguana
        ]
    }),
    //41
    fillDefaults({
        text: 'incredible',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978077446',
        //those fish which pick over the sea-floor
        images: [
            { src: 'https://i.pinimg.com/564x/db/1e/06/db1e062e586379a1c1358106f85487c4.jpg' }
             //seahorse
        ]
    }),
    //42
    fillDefaults({
        text: 'Drexciya - kingdom of drowned slaves babies. For real, google it.',
        link: 'https://www.youtube.com/embed/f9y9Snt1g5E?si=R1mnJuf6HK4sU22O',
        images: [
            { src: 'https://www.ondarock.it/images/monografie/drexciya_1_1492853772.jpg' }
        ]
    }),
    //43
    fillDefaults({
        text: 'Natalia Lafourcada - music',
        link: 'https://www.youtube.com/embed/K1kawgnJWTU?si=jAuDjyH_rUUxVmdt',
        images: [
            { src: 'https://i.pinimg.com/736x/1d/ab/9a/1dab9a0503a87c8c04b5f50fdbd4c225.jpg' }
             //pretty seascape
        ]
    }),
    //44
    fillDefaults({
        text: 'pond',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978145551',
        images: [
            { src: 'https://i.pinimg.com/736x/5b/10/53/5b1053cdb839d852eab5b710482ed3d2.jpg' }
             //coy fish
        ]
    }),
    //45
    fillDefaults({
        text: 'Oar fish can be more than 3 m long!',
        link: 'https://i.pinimg.com/564x/bd/0e/96/bd0e9601abb8f99850c3d2d82e9e0758.jpg',
        images: [
            { src: 'https://i.pinimg.com/564x/bd/b3/a0/bdb3a0c3d33f6129e532ef6eda46f8b4.jpg' }
             //oar fish
        ]
    }),
    //46
    fillDefaults({
        text: 'Gyotaku: Fish Printing',
        link: 'https://www.youtube.com/embed/6MtT5dCCEg8?si=w9Xhj79ZLn_V-k2Z',
        images: [
            { src: 'https://i.pinimg.com/564x/df/b6/52/dfb6527daa64ca3a12bb762b5d2b432e.jpg' }
             //japanese fish diagram
        ]
    }),
    //47
    fillDefaults({
        text: 'frog fish',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978085227',
        images: [
            { src: 'https://i.pinimg.com/564x/8b/d3/1d/8bd31d2d0cfbebecb548b1ce85d50bb3.jpg' },
            { src: 'https://i.pinimg.com/564x/23/00/09/230009a7a9eee5870846e3a196fcfd41.jpg' },
            { src: 'https://i.pinimg.com/736x/81/e4/70/81e4708a50c87f494f27234f3574ab97.jpg' }
            //fish art
        ]
    }),
    //48
    fillDefaults({
        text: 'mosaics',
        link: '',
        images: [
                { src: 'https://i.pinimg.com/564x/bf/7f/5e/bf7f5ead083c174a84897febc9eb2c69.jpg' },
                { src: 'https://i.pinimg.com/564x/d2/b5/58/d2b5581194eac4ad14c0a02139a6382c.jpg' },
                { src: 'https://i.pinimg.com/564x/59/f1/fb/59f1fbdc2200dd3a9cb000415540baf6.jpg' },
                { src: 'https://i.pinimg.com/564x/9a/80/10/9a801098f9966660faa787b4be2f72d0.jpg' },
                { src: 'https://i.pinimg.com/564x/a1/09/5a/a1095a6ba3330e1f1c126232656974e7.jpg' }
             //fish mosaics
        ]
    }),
    //49
    fillDefaults({
        text: 'alien technology or fish?',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978119846',
        //shaol parting around diver
        images: [
            { src: 'https://i.pinimg.com/564x/01/99/03/01990318a798083450a82e363b432afb.jpg' }
            //ball shoal of fish
        ]
    }),
    //50
    fillDefaults({
        text: 'close-up',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978077394',
        //leafy seahorse up-close
        images: [
            { src: 'https://i.pinimg.com/564x/88/16/0f/88160fbd6ec7d61d4e56b4e242d5ada3.jpg' }
            //leafy seahorse
        ]
    }),
    //51
    fillDefaults({
        text: '',
        link: 'https://assets.pinterest.com/ext/embed.html?id=701646816978120016',
        //jellyfish with fish inside
        images: [
            { src: 'https://i.pinimg.com/564x/b4/11/98/b411984eca6ad65259859bc0c7244d5f.jpg' }
            //jellyfish
        ]
    }),
    //52
    fillDefaults({
        text: 'the terrifying power of orcas',
        link: 'https://assets.pinterest.com/ext/embed.html?id=5066618328199341',
        images: [
            { src: 'https://i.pinimg.com/564x/7a/ab/4d/7aab4dc684da5eaef7f670e141acd06a.jpg' }
            //orca drawing
        ]
    }),
];



// Function to assign content to cards
export function assignCardContents() {
    const assignedContent = {}; // Key: 'rank+suit', Value: content

    // First, assign content items with specific 'rank' and 'suit'
    cardContents.forEach(content => {
        if (content.rank && content.suit) {
            const key = content.rank + content.suit;
            assignedContent[key] = content;
        }
    });

    // Collect cards without assigned content
    const allCards = [];
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6',
        '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (let suit of suits) {
        for (let rank of ranks) {
            const key = rank + suit;
            if (!assignedContent[key]) {
                allCards.push(key);
            }
        }
    }

    // Shuffle the remaining content items
    const randomContents = cardContents.filter(content => !(content.rank && content.suit));
    shuffleArray(randomContents);

    // Assign remaining content to cards randomly
    let contentIndex = 0;
    allCards.forEach(cardKey => {
        if (contentIndex < randomContents.length) {
            assignedContent[cardKey] = randomContents[contentIndex];
            contentIndex++;
        } else {
            // If no content left, assign default content
            assignedContent[cardKey] = defaultContent;
        }
    });

    return assignedContent;
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
