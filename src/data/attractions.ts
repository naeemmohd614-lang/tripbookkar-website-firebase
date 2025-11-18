
import type { Attraction } from '@/lib/types';

function slugify(text: string) {
  return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

const jaipurAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Amer Fort',
        city: 'Jaipur',
        cityId: 'jaipur',
        image: {
            src: 'https://picsum.photos/seed/amer-fort/1200/600',
            caption: 'amer fort',
        },
        description: "A stunning example of Rajput architecture, Amer Fort is a majestic fortress-palace overlooking Maota Lake. Explore its intricate courtyards, halls, and the breathtaking Sheesh Mahal (Mirror Palace).",
        timing: "8:00 AM - 5:30 PM (Daily)",
        fees: [
            { type: "Indian Tourist", amount: "₹100" },
            { type: "Foreign Tourist", amount: "₹500" },
            { type: "Light & Sound Show (English)", amount: "₹200" },
        ],
        bestTimeToVisit: "October to March",
        distances: [
            { from: "Jaipur International Airport", distance: "22 km" },
            { from: "Jaipur Railway Station", distance: "13 km" },
            { from: "Sindhi Camp Bus Stand", distance: "12 km" },
        ],
        notes: [
            "Elephant rides are available to ascend the fort, but have specific timings.",
            "It's advisable to hire a guide to understand the rich history.",
        ],
        nearbyHotels: ["Rambagh Palace, Jaipur", "Jaipur Marriott Hotel"]
    },
    {
        name: 'Hawa Mahal',
        city: 'Jaipur',
        cityId: 'jaipur',
        image: {
            src: 'https://picsum.photos/seed/hawa-mahal/1200/600',
            caption: 'hawa mahal',
        },
        description: "The 'Palace of Winds', Hawa Mahal is an iconic five-story honeycomb-like structure with 953 windows. It allowed royal women to observe street festivities unseen from the outside.",
        timing: "9:00 AM - 4:30 PM (Daily)",
        fees: [
            { type: "Indian Tourist", amount: "₹50" },
            { type: "Foreign Tourist", amount: "₹200" },
        ],
        bestTimeToVisit: "Early morning for the best light",
        distances: [
            { from: "Jaipur International Airport", distance: "12 km" },
            { from: "Jaipur Railway Station", distance: "5 km" },
            { from: "Sindhi Camp Bus Stand", distance: "4 km" },
        ],
        notes: [
            "Best viewed from the cafes across the road for a perfect photograph.",
            "It is part of the City Palace complex, so a composite ticket can be purchased.",
        ],
        nearbyHotels: ["Rambagh Palace, Jaipur", "Jaipur Marriott Hotel", "The Raj Palace"]
    },
    {
        name: 'City Palace',
        city: 'Jaipur',
        cityId: 'jaipur',
        image: {
            src: 'https://picsum.photos/seed/city-palace-jaipur/1200/600',
            caption: 'jaipur city palace',
        },
        description: "A sprawling complex of palaces, courtyards, and gardens, the City Palace is a beautiful blend of Rajasthani and Mughal architecture. It is still home to the former royal family of Jaipur.",
        timing: "9:30 AM - 5:00 PM (Day Visit) | 7:00 PM - 10:00 PM (Night Visit)",
        fees: [
            { type: "Indian Tourist (Day)", amount: "₹200" },
            { type: "Foreign Tourist (Day)", amount: "₹700" },
            { type: "Royal Grandeur (Chandra Mahal)", amount: "₹1500 (Indian) / ₹2000 (Foreign)" }
        ],
        bestTimeToVisit: "Winter months (October - March)",
        distances: [
            { from: "Jaipur International Airport", distance: "12 km" },
            { from: "Jaipur Railway Station", distance: "5 km" },
            { from: "Sindhi Camp Bus Stand", distance: "4 km" },
        ],
        nearbyHotels: ["Rambagh Palace, Jaipur", "Jaipur Marriott Hotel", "The Raj Palace"]
    },
    {
        name: 'Jantar Mantar',
        city: 'Jaipur',
        cityId: 'jaipur',
        image: {
            src: 'https://picsum.photos/seed/jantar-mantar-jaipur/1200/600',
            caption: 'jantar mantar observatory',
        },
        description: "A UNESCO World Heritage site, Jantar Mantar is an astronomical observatory featuring the world's largest stone sundial. It consists of 19 large-scale instruments for observing celestial positions.",
        timing: "9:00 AM - 5:00 PM (Daily)",
        fees: [
            { type: "Indian Tourist", amount: "₹50" },
            { type: "Foreign Tourist", amount: "₹200" },
        ],
        bestTimeToVisit: "Mid-day when the sun is directly overhead for accurate readings.",
        distances: [
            { from: "Jaipur International Airport", distance: "12 km" },
            { from: "Jaipur Railway Station", distance: "5 km" },
            { from: "Sindhi Camp Bus Stand", distance: "4 km" },
        ],
        notes: [ "Hiring a guide is highly recommended to understand how each instrument works." ],
        nearbyHotels: ["Rambagh Palace, Jaipur", "Jaipur Marriott Hotel", "The Raj Palace"]
    },
    {
        name: 'Nahargarh Fort',
        city: 'Jaipur',
        cityId: 'jaipur',
        image: {
            src: 'https://picsum.photos/seed/nahargarh-fort-jaipur/1200/600',
            caption: 'nahargarh fort view',
        },
        description: "Standing on the edge of the Aravalli Hills, Nahargarh Fort offers breathtaking panoramic views of the entire city. It once formed a strong defense ring for Jaipur along with Amer Fort and Jaigarh Fort.",
        timing: "10:00 AM - 5:30 PM (Daily)",
        fees: [
            { type: "Indian Tourist", amount: "₹50" },
            { type: "Foreign Tourist", amount: "₹200" },
        ],
        bestTimeToVisit: "Evening for a stunning sunset view over the city.",
        distances: [
            { from: "Jaipur International Airport", distance: "25 km" },
            { from: "Jaipur Railway Station", distance: "8 km" },
            { from: "Sindhi Camp Bus Stand", distance: "7 km" },
        ],
        notes: [
            "The road to the fort is steep and winding.",
            "The fort has a restaurant and a wax museum inside.",
        ],
        nearbyHotels: ["Rambagh Palace, Jaipur", "Jaipur Marriott Hotel"]
    },
];

export const attractions: Attraction[] = [
    ...jaipurAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
];
