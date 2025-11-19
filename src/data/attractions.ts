
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
    },
    {
        name: 'Dalai Lama Temple Complex',
        city: 'Dharamshala',
        cityId: 'dharamshala',
        image: { src: 'https://picsum.photos/seed/dalai-lama-temple/1200/600', caption: 'dalai lama temple complex' },
        description: "The official residence of the Dalai Lama, Tsuglagkhang Complex is a spiritual center for Tibetan Buddhism. The complex includes the Photang (Dalai Lama's residence), Tibet Museum, and the Tsuglagkhang Temple.",
        timing: "5:00 AM - 8:00 PM (Summer), 6:00 AM - 6:00 PM (Winter)",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "March to June and September to November",
        distances: [ { from: "Gaggal Airport", distance: "15 km" } ],
        notes: ["Maintain silence and respect the serene atmosphere. Photography might be restricted in some areas."],
        nearbyHotels: ["Hyatt Regency Dharamshala Resort", "Fortune Park Moksha"]
    },
    {
        name: 'Khajjiar Lake',
        city: 'Dalhousie',
        cityId: 'dalhousie',
        image: { src: 'https://picsum.photos/seed/khajjiar-lake/1200/600', caption: 'khajjiar lake dalhousie' },
        description: "Often referred to as the 'Mini Switzerland of India', Khajjiar is a small plateau with a small stream-fed lake in the middle that is surrounded by a meadow and forests. It's a picturesque spot for picnics and horse riding.",
        timing: "All day",
        fees: [ { type: "Entry", amount: "Free (charges for activities)" } ],
        bestTimeToVisit: "April to July",
        distances: [ { from: "Dalhousie", distance: "24 km" } ],
        notes: ["Zorbing and horse riding are popular activities here."],
        nearbyHotels: ["Fortune Park Dalhousie", "Grand View Hotel"]
    }
];

const uttarakhandAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Ram Jhula',
        city: 'Rishikesh',
        cityId: 'rishikesh',
        image: { src: 'https://picsum.photos/seed/ram-jhula/1200/600', caption: 'ram jhula bridge rishikesh' },
        description: "An iconic iron suspension bridge across the river Ganges in Rishikesh. It connects Sivananda Nagar area of Muni Ki Reti to Swargashram. It offers panoramic views of the river and the surrounding temples.",
        timing: "Open 24 hours",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Dehradun Airport (Jolly Grant)", distance: "20 km" } ],
        nearbyHotels: ["The Roseate Ganges", "Taj Rishikesh Resort & Spa, Uttarakhand"]
    },
    {
        name: 'Laxman Jhula',
        city: 'Rishikesh',
        cityId: 'rishikesh',
        image: { src: 'https://picsum.photos/seed/laxman-jhula/1200/600', caption: 'laxman jhula rishikesh' },
        description: "Similar to Ram Jhula, this is another major suspension bridge across the Ganges. It is said that Laxman, the brother of Lord Ram, crossed the Ganges on jute ropes where this bridge is built.",
        timing: "5:00 AM - 10:00 PM",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Ram Jhula", distance: "2 km" } ],
        nearbyHotels: ["The Roseate Ganges", "Aloha on the Ganges"]
    },
    {
        name: 'Triveni Ghat',
        city: 'Rishikesh',
        cityId: 'rishikesh',
        image: { src: 'https://picsum.photos/seed/triveni-ghat/1200/600', caption: 'triveni ghat rishikesh' },
        description: "The biggest and most famous ghat in Rishikesh, Triveni Ghat is a confluence of three holy rivers: Ganga, Yamuna, and Saraswati. It is a revered place for bathing and for the evening 'Maha Aarti'.",
        timing: "Open 24 hours",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "Evening for the Ganga Aarti",
        distances: [ { from: "Rishikesh Railway Station", distance: "1.5 km" } ],
        nearbyHotels: ["Hotel Ganga Kinare", "Holy River Hotel"]
    },
    {
        name: 'Naini Lake',
        city: 'Nainital',
        cityId: 'nainital',
        image: { src: 'https://picsum.photos/seed/naini-lake/1200/600', caption: 'naini lake boating' },
        description: "The heart of Nainital, this natural freshwater lake is a beautiful crescent-shaped body of water. Boating on the lake is a popular activity, offering serene views of the surrounding hills.",
        timing: "6:00 AM to 6:00 PM for boating",
        fees: [ { type: "Boating", amount: "Starting from ₹160" } ],
        bestTimeToVisit: "March to June and October to November",
        distances: [ { from: "Pantnagar Airport", distance: "65 km" } ],
        nearbyHotels: ["The Naini Retreat, by Leisure Hotels", "The Manu Maharani"]
    },
    {
        name: 'Snow View Point',
        city: 'Nainital',
        cityId: 'nainital',
        image: { src: 'https://picsum.photos/seed/snow-view-point/1200/600', caption: 'snow view point nainital' },
        description: "Accessible by a scenic cable car ride, Snow View Point offers mesmerizing panoramic views of the snow-capped Himalayan peaks like Nanda Devi, Trishul, and Nanda Kot.",
        timing: "10:30 AM to 5:00 PM (Closed on Saturdays)",
        fees: [ { type: "Cable Car (two-way)", amount: "₹300 for Adults" } ],
        bestTimeToVisit: "October to February for clear views",
        distances: [ { from: "Mallital, Nainital", distance: "2.5 km" } ],
        nearbyHotels: ["The Naini Retreat", "Shervani Hilltop"]
    },
    {
        name: 'The Mall Road, Nainital',
        city: 'Nainital',
        cityId: 'nainital',
        image: { src: 'https://picsum.photos/seed/nainital-mall-road/1200/600', caption: 'mall road nainital' },
        description: "A bustling promenade running parallel to the Naini Lake, the Mall Road is the main commercial and cultural hub of Nainital, lined with shops, cafes, and hotels.",
        timing: "Vehicle entry restricted during peak hours (6 PM - 9 PM)",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "Evenings for a lively stroll",
        distances: [ { from: "Tallital Bus Stand", distance: "1 km" } ],
        nearbyHotels: ["The Manu Maharani", "Hotel Chevron Fairhavens"]
    },
    {
        name: 'Kempty Falls',
        city: 'Mussoorie',
        cityId: 'mussoorie',
        image: { src: 'https://picsum.photos/seed/kempty-falls/1200/600', caption: 'kempty falls mussoorie' },
        description: "One of the most famous waterfalls in Uttarakhand, Kempty Falls is a popular tourist spot. Visitors can enjoy the refreshing water and the scenic beauty of the surroundings.",
        timing: "8:00 AM - 5:00 PM",
        fees: [ { type: "Entry", amount: "Free (charges for activities)" } ],
        bestTimeToVisit: "March to June",
        distances: [ { from: "Mussoorie Library Bus Stand", distance: "15 km" } ],
        nearbyHotels: ["JW Marriott Mussoorie Walnut Grove Resort & Spa", "Jaypee Residency Manor"]
    },
     {
        name: 'Gun Hill',
        city: 'Mussoorie',
        cityId: 'mussoorie',
        image: { src: 'https://picsum.photos/seed/gun-hill/1200/600', caption: 'gun hill mussoorie' },
        description: "The second highest peak of Mussoorie, Gun Hill offers a breathtaking 360-degree view of the Himalayan ranges and the Doon Valley. It is accessible by a thrilling cable car ride.",
        timing: "10:00 AM - 6:00 PM",
        fees: [ { type: "Cable Car (two-way)", amount: "₹75" } ],
        bestTimeToVisit: "March to June for clear views",
        distances: [ { from: "Mall Road, Mussoorie", distance: "400m walk to cable car" } ],
        nearbyHotels: ["Jaypee Residency Manor", "Welcomhotel by ITC Hotels, The Savoy"]
    },
    {
        name: 'Robber\'s Cave',
        city: 'Dehradun',
        cityId: 'dehradun',
        image: { src: 'https://picsum.photos/seed/robbers-cave/1200/600', caption: 'robbers cave dehradun' },
        description: "Locally known as Guchu Pani, Robber's Cave is a river cave formation. It's a popular picnic spot where you can walk through the cold stream flowing inside the cave.",
        timing: "7:00 AM - 6:00 PM",
        fees: [ { type: "Entry", amount: "₹25" } ],
        bestTimeToVisit: "All year round, except monsoons",
        distances: [ { from: "Dehradun Railway Station", distance: "8 km" } ],
        nearbyHotels: ["Hyatt Regency Dehradun", "Four Points by Sheraton Dehradun"]
    },
    {
        name: 'Forest Research Institute',
        city: 'Dehradun',
        cityId: 'dehradun',
        image: { src: 'https://picsum.photos/seed/fri-dehradun/1200/600', caption: 'fri dehradun' },
        description: "A premier institution in the field of forestry research, the Forest Research Institute (FRI) is also an architectural marvel. Its Greco-Roman style building and vast campus are a popular tourist attraction.",
        timing: "9:00 AM - 5:30 PM",
        fees: [ { type: "Entry", amount: "₹10" } ],
        bestTimeToVisit: "Anytime",
        distances: [ { from: "Dehradun Railway Station", distance: "6 km" } ],
        nearbyHotels: ["Hyatt Regency Dehradun", "Lemon Tree Hotel, Dehradun"]
    }
];

const jammuAndKashmirAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Dal Lake',
        city: 'Srinagar',
        cityId: 'srinagar',
        image: { src: 'https://picsum.photos/seed/dal-lake/1200/600', caption: 'shikara ride dal lake' },
        description: "The jewel of Srinagar, Dal Lake is famous for its houseboats (shikaras), floating gardens, and scenic beauty. A shikara ride is a must-do experience.",
        timing: "All day",
        fees: [ { type: "Shikara Ride", amount: "Approx. ₹500-700 per hour" } ],
        bestTimeToVisit: "May to November",
        distances: [ { from: "Srinagar International Airport", distance: "22 km" } ],
        nearbyHotels: ["The Lalit Grand Palace Srinagar", "Vivanta Dal View, Srinagar"]
    },
    {
        name: 'Gulmarg Gondola',
        city: 'Gulmarg',
        cityId: 'gulmarg',
        image: { src: 'https://picsum.photos/seed/gulmarg-gondola/1200/600', caption: 'gulmarg gondola view' },
        description: "One of the highest cable cars in the world, the Gulmarg Gondola offers breathtaking views of the snow-capped Himalayas. It has two phases, with the second phase taking you to Apharwat Peak.",
        timing: "10:00 AM - 4:00 PM (Varies with weather)",
        fees: [ { type: "Phase 1", amount: "₹740" }, { type: "Phase 2", amount: "₹950" } ],
        bestTimeToVisit: "December to March for snow, May to September for green landscapes",
        distances: [ { from: "Srinagar", distance: "50 km" } ],
        notes: ["Booking tickets online in advance is highly recommended.", "The gondola operation is subject to weather conditions."],
        nearbyHotels: ["The Khyber Himalayan Resort & Spa"]
    },
    {
        name: 'Shankaracharya Temple',
        city: 'Srinagar',
        cityId: 'srinagar',
        image: { src: 'https://picsum.photos/seed/shankaracharya-temple/1200/600', caption: 'shankaracharya temple srinagar' },
        description: "Perched on a hilltop, this ancient temple dedicated to Lord Shiva offers panoramic views of Srinagar and the Dal Lake. It's a significant pilgrimage site and a historical monument.",
        timing: "8:00 AM - 5:00 PM",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "Anytime",
        distances: [ { from: "Srinagar City Center", distance: "6 km" } ],
        notes: ["You need to climb about 243 steps to reach the temple.", "Vehicles are allowed only up to a certain point."],
        nearbyHotels: ["Vivanta Dal View, Srinagar", "The Lalit Grand Palace Srinagar"]
    }
];

const sikkimAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Tsomgo Lake',
        city: 'Gangtok',
        cityId: 'gangtok',
        image: { src: 'https://picsum.photos/seed/tsomgo-lake/1200/600', caption: 'tsomgo lake gangtok' },
        description: "A glacial lake located at an altitude of 12,313 ft. The lake is highly revered by the local Sikkimese people. It remains frozen during the winter season.",
        timing: "All day, but permits are checked between 7 AM to 3 PM",
        fees: [ { type: "Permit required", amount: "Shared vehicle approx. ₹700-1000 per person" } ],
        bestTimeToVisit: "May to October for pleasant weather, January to March for snow.",
        distances: [ { from: "Gangtok", distance: "40 km" } ],
        notes: ["A protected area permit is required for all tourists.", "The lake is prone to heavy snowfall in winter, which can cause road closures."],
        nearbyHotels: ["Mayfair Spa Resort & Casino", "The Elgin Nor-Khill"]
    },
    {
        name: 'Rumtek Monastery',
        city: 'Gangtok',
        cityId: 'gangtok',
        image: { src: 'https://picsum.photos/seed/rumtek-monastery/1200/600', caption: 'rumtek monastery gangtok' },
        description: "One of the largest and most significant monasteries in Sikkim, Rumtek Monastery is the seat of the Karmapa Lama. The monastery complex is a beautiful example of Tibetan architecture.",
        timing: "6:00 AM - 6:00 PM",
        fees: [ { type: "Entry", amount: "₹10" } ],
        bestTimeToVisit: "October to December",
        distances: [ { from: "Gangtok", distance: "24 km" } ],
        nearbyHotels: ["Mayfair Spa Resort & Casino", "The Elgin Nor-Khill"]
    },
    {
        name: 'Pelling Skywalk',
        city: 'Pelling',
        cityId: 'pelling',
        image: { src: 'https://picsum.photos/seed/pelling-skywalk/1200/600', caption: 'pelling skywalk' },
        description: "India's first glass skywalk, offering stunning views of the 137-feet tall statue of Chenrezig (Avalokiteshvara) and the surrounding Himalayan peaks.",
        timing: "8:00 AM - 5:00 PM",
        fees: [ { type: "Entry", amount: "₹50" } ],
        bestTimeToVisit: "October to May",
        distances: [ { from: "Pelling Town", distance: "3 km" } ],
        nearbyHotels: ["The Elgin Mount Pandim", "Summit Newa Regency"]
    },
    {
        name: 'Khecheopalri Lake',
        city: 'Pelling',
        cityId: 'pelling',
        image: { src: 'https://picsum.photos/seed/khecheopalri-lake/1200/600', caption: 'khecheopalri lake pelling' },
        description: "A sacred lake for both Buddhists and Hindus, believed to be a wish-fulfilling lake. It is known for its serene beauty and the fact that leaves are not allowed to float on the lake surface.",
        timing: "6:00 AM - 6:00 PM",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "February to May and October to December",
        distances: [ { from: "Pelling", distance: "34 km" } ],
        nearbyHotels: ["The Elgin Mount Pandim", "Hotel Dubdi"]
    },
    {
        name: 'Char Dham, Namchi',
        city: 'Namchi',
        cityId: 'namchi',
        image: { src: 'https://picsum.photos/seed/char-dham-namchi/1200/600', caption: 'char dham namchi' },
        description: "A vast pilgrimage and cultural complex featuring a massive 108-ft statue of Lord Shiva and replicas of the twelve Jyotirlingas and four Dhams.",
        timing: "8:00 AM - 7:00 PM",
        fees: [ { type: "Entry", amount: "₹50" } ],
        bestTimeToVisit: "October to May",
        distances: [ { from: "Gangtok", distance: "78 km" } ],
        nearbyHotels: ["My Vibe, Namchi", "Hotel Summit Sobralia"]
    },
    {
        name: 'Yumthang Valley',
        city: 'Lachung',
        cityId: 'lachung',
        image: { src: 'https://picsum.photos/seed/yumthang-valley/1200/600', caption: 'yumthang valley sikkim' },
        description: "Known as the 'Valley of Flowers' of Sikkim, Yumthang Valley is a stunning landscape filled with rhododendrons, hot springs, yaks, and rolling meadows, set against a backdrop of Himalayan peaks.",
        timing: "Permit required, typically daytime visits",
        fees: [ { type: "Permit & vehicle", amount: "Varies, arranged via tour operators" } ],
        bestTimeToVisit: "Late February to June for flowers, September to December for clear skies.",
        distances: [ { from: "Lachung", distance: "26 km" } ],
        notes: ["A protected area permit is required.", "The valley is snow-covered in deep winter."],
        nearbyHotels: ["Yarlam, Lachung"]
    }
];

const westBengalAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Victoria Memorial',
        city: 'Kolkata',
        cityId: 'kolkata',
        image: { src: 'https://picsum.photos/seed/victoria-memorial/1200/600', caption: 'victoria memorial kolkata' },
        description: "A large marble building in Kolkata, which was built between 1906 and 1921. It is dedicated to the memory of Queen Victoria and is now a museum and popular tourist destination.",
        timing: "10:00 AM - 6:00 PM (Museum), 5:30 AM - 6:15 PM (Gardens)",
        fees: [ { type: "Indian", amount: "₹30" }, { type: "Foreigner", amount: "₹500" } ],
        bestTimeToVisit: "October to February",
        distances: [ { from: "Netaji Subhas Chandra Bose International Airport", distance: "22 km" } ],
        nearbyHotels: ["The Oberoi Grand, Kolkata", "The Park Kolkata"]
    },
    {
        name: 'Howrah Bridge',
        city: 'Kolkata',
        cityId: 'kolkata',
        image: { src: 'https://picsum.photos/seed/howrah-bridge/1200/600', caption: 'howrah bridge kolkata' },
        description: "A cantilever bridge over the Hooghly River. It is one of the most iconic landmarks of Kolkata and is considered to be one of the busiest bridges in the world.",
        timing: "Open 24 hours",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "Evening for a stunning view",
        distances: [ { from: "Howrah Railway Station", distance: "2 km" } ],
        nearbyHotels: ["The Oberoi Grand, Kolkata", "The Peerless Inn Kolkata"]
    },
    {
        name: 'Tiger Hill',
        city: 'Darjeeling',
        cityId: 'darjeeling',
        image: { src: 'https://picsum.photos/seed/tiger-hill/1200/600', caption: 'tiger hill darjeeling sunrise' },
        description: "Famous for its panoramic views of Mount Everest and Kanchenjunga at sunrise. It is the highest point in Darjeeling.",
        timing: "4:00 AM to 6:00 PM",
        fees: [ { type: "Entry", amount: "Free (Vehicle charges apply)" } ],
        bestTimeToVisit: "October to December and March to April",
        distances: [ { from: "Darjeeling Town", distance: "11 km" } ],
        nearbyHotels: ["Mayfair Darjeeling", "Windamere Hotel"]
    },
    {
        name: 'Batasia Loop',
        city: 'Darjeeling',
        cityId: 'darjeeling',
        image: { src: 'https://picsum.photos/seed/batasia-loop/1200/600', caption: 'batasia loop toy train' },
        description: "A spiral railway track where the Darjeeling Himalayan Railway makes a 360-degree turn. It offers a panoramic view of Darjeeling town and the snow-capped Kanchenjunga.",
        timing: "5:00 AM - 4:30 PM",
        fees: [ { type: "Entry", amount: "₹15" } ],
        bestTimeToVisit: "Anytime",
        distances: [ { from: "Darjeeling Town", distance: "5 km" } ],
        nearbyHotels: ["Mayfair Darjeeling", "Cedar Inn"]
    }
];

const tamilNaduAttractionsData: Omit<Attraction, 'attractionId'>[] = [
    {
        name: 'Marina Beach',
        city: 'Chennai',
        cityId: 'chennai',
        image: { src: 'https://picsum.photos/seed/marina-beach/1200/600', caption: 'marina beach chennai sunset' },
        description: "India's longest urban beach, stretching for about 13 km. It's a popular spot for locals and tourists to enjoy the sea breeze, food stalls, and evening walks.",
        timing: "Open 24 hours",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "Early morning or evening",
        distances: [ { from: "Chennai Central Railway Station", distance: "5 km" } ],
        nearbyHotels: ["The Leela Palace Chennai", "Taj Connemara, Chennai"]
    },
    {
        name: 'Meenakshi Amman Temple',
        city: 'Madurai',
        cityId: 'madurai',
        image: { src: 'https://picsum.photos/seed/meenakshi-temple/1200/600', caption: 'meenakshi amman temple madurai' },
        description: "A historic Hindu temple dedicated to Goddess Meenakshi. It's renowned for its stunning Dravidian architecture, with towering gopurams (gateway towers) covered in colorful figures.",
        timing: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
        fees: [ { type: "Entry", amount: "Free" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Madurai Airport", distance: "12 km" } ],
        notes: ["A strict dress code is enforced; legs and shoulders must be covered.","Electronic gadgets are not allowed inside."],
        nearbyHotels: ["Heritage Madurai"]
    },
    {
        name: 'Vivekananda Rock Memorial',
        city: 'Kanyakumari',
        cityId: 'kanyakumari',
        image: { src: 'https://picsum.photos/seed/vivekananda-rock/1200/600', caption: 'vivekananda rock kanyakumari' },
        description: "A popular tourist monument in Vavathurai, Kanyakumari, India. It was built in 1970 in honour of Swami Vivekananda who is said to have attained enlightenment on the rock.",
        timing: "8:00 AM - 4:00 PM",
        fees: [ { type: "Entry", amount: "₹20" }, { type: "Ferry", amount: "₹50" } ],
        bestTimeToVisit: "October to March",
        distances: [ { from: "Kanyakumari Bus Stand", distance: "1 km" } ],
        nearbyHotels: []
    },
    {
        name: 'Ooty Lake',
        city: 'Ooty',
        cityId: 'ooty',
        image: { src: 'https://picsum.photos/seed/ooty-lake/1200/600', caption: 'ooty lake boating' },
        description: "An artificial lake built by John Sullivan in 1824. Boating is the major attraction at the lake. The lake is surrounded by groves of Eucalyptus trees.",
        timing: "9:00 AM - 6:00 PM",
        fees: [ { type: "Entry", amount: "₹13" }, { type: "Boating", amount: "Starting from ₹240" } ],
        bestTimeToVisit: "Throughout the year",
        distances: [ { from: "Ooty Bus Stand", distance: "2 km" } ],
        nearbyHotels: ["Sterling Ooty Fern Hill"]
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
    ...uttarakhandAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...jammuAndKashmirAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...sikkimAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...westBengalAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
    ...tamilNaduAttractionsData.map(attraction => ({
        ...attraction,
        attractionId: slugify(attraction.name),
    })),
];
