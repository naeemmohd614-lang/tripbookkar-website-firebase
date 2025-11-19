
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
        name: 'City Palace, Jaipur',
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

const jodhpurAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Mehrangarh Fort',
        city: 'Jodhpur',
        cityId: 'jodhpur',
        image: {
            src: 'https://picsum.photos/seed/mehrangarh-fort/1200/600',
            caption: 'mehrangarh fort jodhpur',
        },
        description: "One of India's largest and most magnificent forts, Mehrangarh Fort towers 400 feet above the city. Its thick, imposing walls enclose a complex of palaces and courtyards that are breathtaking in their beauty and detail.",
        timing: "9:00 AM - 5:00 PM (Daily)",
        fees: [
            { type: "Indian Tourist", amount: "₹120" },
            { type: "Foreign Tourist", amount: "₹600" },
        ],
        bestTimeToVisit: "October to March",
        distances: [
            { from: "Jodhpur Airport", distance: "6 km" },
            { from: "Jodhpur Railway Station", distance: "5 km" },
        ],
        notes: ["Audio guides are available and highly recommended.", "The fort has a museum with an impressive collection of royal artifacts."],
        nearbyHotels: ["Umaid Bhawan Palace, Jodhpur", "RAAS Jodhpur"]
    },
    {
        name: 'Jaswant Thada',
        city: 'Jodhpur',
        cityId: 'jodhpur',
        image: {
            src: 'https://picsum.photos/seed/jaswant-thada/1200/600',
            caption: 'jaswant thada monument',
        },
        description: "This milky-white marble memorial to Maharaja Jaswant Singh II is a masterpiece of Rajputana architecture. Often called the 'Taj Mahal of Marwar', its intricate carvings and peaceful setting by a lake make it a must-visit.",
        timing: "9:00 AM - 6:00 PM (Daily)",
        fees: [
            { type: "Indian Tourist", amount: "₹30" },
            { type: "Foreign Tourist", amount: "₹50" },
        ],
        bestTimeToVisit: "Morning or late afternoon",
        distances: [
            { from: "Jodhpur Airport", distance: "7 km" },
            { from: "Mehrangarh Fort", distance: "1 km" },
        ],
        nearbyHotels: ["Umaid Bhawan Palace, Jodhpur", "RAAS Jodhpur"]
    },
];

const udaipurAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'City Palace, Udaipur',
        city: 'Udaipur',
        cityId: 'udaipur',
        image: {
            src: 'https://picsum.photos/seed/city-palace-udaipur/1200/600',
            caption: 'udaipur city palace view',
        },
        description: "A majestic architectural marvel on the banks of Lake Pichola, the City Palace of Udaipur is a grand complex of palaces, courtyards, and gardens, showcasing a beautiful blend of Rajasthani and Mughal architectural styles.",
        timing: "9:30 AM - 5:30 PM (Daily)",
        fees: [
            { type: "Adult", amount: "₹300" },
            { type: "Child", amount: "₹100" },
        ],
        bestTimeToVisit: "September to March",
        distances: [
            { from: "Maharana Pratap Airport", distance: "22 km" },
            { from: "Udaipur City Railway Station", distance: "3 km" },
        ],
        notes: ["A boat ride on Lake Pichola offers stunning views of the palace."],
        nearbyHotels: ["Taj Lake Palace, Udaipur", "The Oberoi Udaivilas"]
    },
    {
        name: 'Lake Pichola',
        city: 'Udaipur',
        cityId: 'udaipur',
        image: {
            src: 'https://picsum.photos/seed/lake-pichola/1200/600',
            caption: 'boat ride on lake pichola',
        },
        description: "An artificial freshwater lake, created in the year 1362 AD, Lake Pichola is one of the several contiguous lakes in the city of Udaipur. The lake’s surroundings and the several islands within the lake have been developed over the centuries with palaces, marble temples, family mansions, and bathing ghats.",
        timing: "9:00 AM - 6:00 PM for boating",
        fees: [
            { type: "Regular Boat Ride", amount: "approx. ₹400" },
            { type: "Sunset Boat Ride", amount: "approx. ₹700" },
        ],
        bestTimeToVisit: "Sunset for a romantic experience",
        distances: [
            { from: "City Centre", distance: "0 km" },
        ],
        nearbyHotels: ["Taj Lake Palace, Udaipur", "The Oberoi Udaivilas", "The Leela Palace Udaipur"]
    },
];

const jaisalmerAttractionsData: Omit<Attraction, 'attractionId'>[] = [
     {
        name: 'Jaisalmer Fort',
        city: 'Jaisalmer',
        cityId: 'jaisalmer',
        image: {
            src: 'https://picsum.photos/seed/jaisalmer-fort/1200/600',
            caption: 'golden jaisalmer fort',
        },
        description: "Also known as Sonar Quila or the Golden Fort, Jaisalmer Fort is a massive sandcastle rising from the sandy plains of the Thar desert. It is one of the very few 'living forts' in the world, with a quarter of the city's population residing within its walls.",
        timing: "9:00 AM - 9:00 PM (Daily)",
        fees: [
            { type: "Entry", amount: "Free" },
            { type: "Palace Museum", amount: "₹250 (Indians) / ₹500 (Foreigners)" },
        ],
        bestTimeToVisit: "October to March",
        distances: [
            { from: "Jaisalmer Airport", distance: "15 km" },
            { from: "Jaisalmer Railway Station", distance: "2 km" },
        ],
        notes: ["Explore the narrow lanes inside the fort to discover havelis, temples, and shops."],
        nearbyHotels: ["Suryagarh Jaisalmer", "Jaisalmer Marriott Resort & Spa"]
    },
    {
        name: 'Sam Sand Dunes',
        city: 'Jaisalmer',
        cityId: 'jaisalmer',
        image: {
            src: 'https://picsum.photos/seed/sam-sand-dunes/1200/600',
            caption: 'sam sand dunes desert safari',
        },
        description: "Experience the quintessential desert life at Sam Sand Dunes. Enjoy a camel safari or a thrilling jeep safari over the golden sands, and witness a spectacular sunset followed by a cultural evening with Rajasthani folk music and dance.",
        timing: "Afternoon to evening is best",
        fees: [
            { type: "Camel Safari", amount: "approx. ₹500-800" },
            { type: "Jeep Safari", amount: "approx. ₹1200-1500" },
        ],
        bestTimeToVisit: "November to February for pleasant weather",
        distances: [
            { from: "Jaisalmer City", distance: "42 km" },
        ],
        notes: ["Overnight desert camping is a popular activity here."],
        nearbyHotels: ["Desert Springs Resort", "Sam Sand Dunes Desert Safari Camp"]
    },
];

const goaAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Baga Beach',
        city: 'North Goa',
        cityId: 'north-goa',
        image: {
            src: 'https://picsum.photos/seed/baga-beach/1200/600',
            caption: 'Baga Beach shacks and crowd',
        },
        description: "One of the most famous beaches in North Goa, Baga is known for its lively atmosphere, beach shacks, water sports, and electrifying nightlife. It's the perfect spot for fun and excitement.",
        timing: "Open 24 hours",
        fees: [
            { type: "Entry", amount: "Free" },
        ],
        bestTimeToVisit: "October to March",
        distances: [
            { from: "Goa International Airport", distance: "40 km" },
            { from: "Panaji", distance: "16 km" },
        ],
        nearbyHotels: ["Goa Marriott Resort & Spa", "The Westin Goa"]
    },
    {
        name: 'Dudhsagar Falls',
        city: 'South Goa',
        cityId: 'south-goa',
        image: {
            src: 'https://picsum.photos/seed/dudhsagar-falls/1200/600',
            caption: 'dudhsagar falls in monsoon',
        },
        description: "Literally meaning 'Sea of Milk', this four-tiered waterfall is one of India's tallest. Located on the Mandovi River, its majestic cascade amidst lush green forests is a breathtaking sight, especially during the monsoon.",
        timing: "7:00 AM - 5:00 PM",
        fees: [
            { type: "Jeep Safari", amount: "Approx. ₹400-500 per person" },
        ],
        bestTimeToVisit: "June to September",
        distances: [
            { from: "Panaji", distance: "60 km" },
        ],
        notes: ["Accessible via a thrilling jeep safari through the forest.", "Swimming is allowed at the base of the falls."]
    },
    {
        name: 'Old Goa (Velha Goa)',
        city: 'North Goa',
        cityId: 'north-goa',
        image: {
            src: 'https://picsum.photos/seed/old-goa-church/1200/600',
            caption: 'Basilica of Bom Jesus in Old Goa',
        },
        description: "The former capital of Portuguese India, Old Goa is a UNESCO World Heritage site. It's renowned for its magnificent colonial-era churches and cathedrals, including the Basilica of Bom Jesus and Se Cathedral.",
        timing: "9:00 AM - 6:30 PM",
        fees: [
            { type: "Entry", amount: "Free for most churches" },
        ],
        bestTimeToVisit: "November to February",
        distances: [
            { from: "Panaji", distance: "10 km" },
        ],
        nearbyHotels: ["Goa Marriott Resort & Spa"]
    },
    {
        name: 'Palolem Beach',
        city: 'South Goa',
        cityId: 'south-goa',
        image: {
            src: 'https://picsum.photos/seed/palolem-beach/1200/600',
            caption: 'crescent-shaped Palolem beach',
        },
        description: "A picturesque crescent-shaped beach known for its calm waters and serene atmosphere. It's lined with palm trees and colorful beach huts, offering a perfect escape from the crowds.",
        timing: "Open 24 hours",
        fees: [{ type: "Entry", amount: "Free" }],
        bestTimeToVisit: "November to February",
        distances: [
            { from: "Goa International Airport", distance: "60 km" },
            { from: "Margao Railway Station", distance: "37 km" },
        ],
        notes: ["Famous for 'Silent Noise' headphone parties.", "Ideal for kayaking and swimming."],
        nearbyHotels: ["The LaLiT Golf & Spa Resort Goa", "Sobit Sarovar Portico"]
    },
    {
        name: 'Agonda Beach',
        city: 'South Goa',
        cityId: 'south-goa',
        image: {
            src: 'https://picsum.photos/seed/agonda-beach/1200/600',
            caption: 'pristine Agonda beach',
        },
        description: "A quiet and pristine beach, perfect for relaxing, swimming, and sunbathing. Agonda is also a designated turtle nesting site, making it a haven for nature lovers.",
        timing: "Open 24 hours",
        fees: [{ type: "Entry", amount: "Free" }],
        bestTimeToVisit: "October to April",
        distances: [
            { from: "Goa International Airport", distance: "60 km" },
            { from: "Margao Railway Station", distance: "36 km" },
        ],
        notes: ["It's a protected turtle nesting site, so be mindful of the rules.", "Less commercialized than other beaches, offering a peaceful experience."],
        nearbyHotels: ["The LaLiT Golf & Spa Resort Goa", "Agonda White Sand"]
    },
];

const uttarPradeshAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Taj Mahal',
        city: 'Agra',
        cityId: 'agra',
        image: { src: 'https://picsum.photos/seed/taj-mahal/1200/600', caption: 'taj mahal agra' },
        description: "An ivory-white marble mausoleum on the south bank of the Yamuna river. It was commissioned in 1632 by the Mughal emperor, Shah Jahan, to house the tomb of his favourite wife, Mumtaz Mahal.",
        timing: "Sunrise to Sunset (Closed on Fridays)",
        fees: [ { type: "Indian", amount: "₹50" }, { type: "Foreigner", amount: "₹1100" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Agra Cantt Railway Station", distance: "6 km" } ],
        nearbyHotels: ["The Oberoi Amarvilas, Agra", "ITC Mughal, Agra"]
    },
    {
        name: 'Agra Fort',
        city: 'Agra',
        cityId: 'agra',
        image: { src: 'https://picsum.photos/seed/agra-fort/1200/600', caption: 'agra fort' },
        description: "A historical fort in the city of Agra. It was the main residence of the emperors of the Mughal Dynasty until 1638. A UNESCO World Heritage site.",
        timing: "Sunrise to Sunset",
        fees: [ { type: "Indian", amount: "₹40" }, { type: "Foreigner", amount: "₹550" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Agra Cantt Railway Station", distance: "5 km" } ],
        nearbyHotels: ["The Oberoi Amarvilas, Agra", "ITC Mughal, Agra"]
    },
    {
        name: 'Ghats of Varanasi',
        city: 'Varanasi',
        cityId: 'varanasi',
        image: { src: 'https://picsum.photos/seed/varanasi-ghats/1200/600', caption: 'varanasi ghats evening' },
        description: "The riverfront steps leading to the banks of the River Ganges. The city has 88 ghats. Most of the ghats are bathing and puja ceremony ghats, while two ghats are used exclusively as cremation sites.",
        timing: "Open 24 hours",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Varanasi Junction Railway Station", distance: "4 km" } ],
        nearbyHotels: ["BrijRama Palace, Varanasi", "Taj Ganges, Varanasi"]
    },
    {
        name: 'Kashi Vishwanath Temple',
        city: 'Varanasi',
        cityId: 'varanasi',
        image: { src: 'https://picsum.photos/seed/kashi-temple/1200/600', caption: 'kashi vishwanath temple' },
        description: "One of the most famous Hindu temples dedicated to Lord Shiva. It is located in Varanasi, Uttar Pradesh, India. The temple stands on the western bank of the holy river Ganga, and is one of the twelve Jyotirlingas.",
        timing: "3:00 AM - 11:00 PM",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Varanasi Junction Railway Station", distance: "4 km" } ],
        nearbyHotels: ["BrijRama Palace, Varanasi", "Taj Ganges, Varanasi"]
    }
];

const himachalAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'The Ridge',
        city: 'Shimla',
        cityId: 'shimla',
        image: { src: 'https://picsum.photos/seed/shimla-ridge/1200/600', caption: 'the ridge shimla' },
        description: "The Ridge is a large open space in the heart of Shimla, offering spectacular views of the mountain ranges. It is a hub of all cultural activities of Shimla.",
        timing: "Open 24 hours",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "April to August and December to January",
        distances: [ { from: "Shimla Airport", distance: "20 km" } ],
        nearbyHotels: ["Wildflower Hall, An Oberoi Resort, Shimla", "The Oberoi Cecil, Shimla"]
    },
    {
        name: 'Mall Road',
        city: 'Shimla',
        cityId: 'shimla',
        image: { src: 'https://picsum.photos/seed/shimla-mall-road/1200/600', caption: 'mall road shimla' },
        description: "The main street in Shimla, lined with showrooms, department stores, shops, restaurants and cafes. A stroll on The Mall Road is a must-do activity.",
        timing: "9:00 AM - 9:00 PM",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "All year round",
        distances: [ { from: "Shimla Railway Station", distance: "1 km" } ],
        nearbyHotels: ["Wildflower Hall, An Oberoi Resort, Shimla", "The Oberoi Cecil, Shimla"]
    },
    {
        name: 'Solang Valley',
        city: 'Manali',
        cityId: 'manali',
        image: { src: 'https://picsum.photos/seed/solang-valley/1200/600', caption: 'solang valley manali' },
        description: "A picturesque valley famous for its summer and winter sport conditions. You can enjoy paragliding, zorbing, and skiing here.",
        timing: "10:00 AM - 6:00 PM",
        fees: [ { type: "Entry", amount: "Free (charges for activities)" } ],
        bestTimeToVisit: "For snow, December to February. For other activities, May to November.",
        distances: [ { from: "Manali Bus Stand", distance: "14 km" } ],
        nearbyHotels: ["Manuallaya - The Resort Spa in the Himalayas"]
    },
    {
        name: 'Rohtang Pass',
        city: 'Manali',
        cityId: 'manali',
        image: { src: 'https://picsum.photos/seed/rohtang-pass/1200/600', caption: 'rohtang pass snow' },
        description: "A high mountain pass that connects the Kullu Valley with the Lahaul and Spiti Valleys. It offers stunning views and is a gateway to more adventures. Open from May to November.",
        timing: "Varies, depends on weather",
        fees: [ { type: "Permit required", amount: "₹550 (approx)" } ],
        bestTimeToVisit: "June to October",
        distances: [ { from: "Manali", distance: "51 km" } ],
        notes: ["A permit is required to visit Rohtang Pass.", "The pass is closed during winter due to heavy snowfall."],
        nearbyHotels: ["Manuallaya - The Resort Spa in the Himalayas"]
    }
];

export const attractions: Attraction[] = [
    ...jaipurAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...jodhpurAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...udaipurAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...jaisalmerAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...goaAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...uttarPradeshAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...himachalAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
];
