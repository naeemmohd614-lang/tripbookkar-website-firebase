
import type { Hotel } from '@/lib/types';

import marriottHotelsData from '@/data/marriott.json';
import tajHotelsData from '@/data/taj.json';
import oberoiHotelsData from '@/data/oberoi.json';
import leelaHotelsData from '@/data/the-leela.json';
import hyattHotelsData from '@/data/hyatt.json';
import otherHotelsData from '@/data/other-hotels.json';
import hiltonHotelsData from '@/data/hilton.json';
import accorHotelsData from '@/data/accor.json';
import ihgHotelsData from '@/data/ihg.json';
import radissonHotelsData from '@/data/radisson.json';


const allHotels: Hotel[] = [
  ...marriottHotelsData,
  ...tajHotelsData,
  ...oberoiHotelsData,
  ...leelaHotelsData,
  ...hyattHotelsData,
  ...otherHotelsData,
  ...hiltonHotelsData,
  ...accorHotelsData,
  ...ihgHotelsData,
  ...radissonHotelsData
];

interface MonthlyDestination {
  name: string;
  reason: string;
  hotels: (Hotel | string)[];
  image: {
    src: string;
    caption: string;
  };
}

export interface MonthData {
  id: string;
  name: string;
  slug: string;
  pageImage: {
    src: string;
    caption: string;
  };
  destinations: MonthlyDestination[];
}

export const monthlyDestinationsData: { [key: string]: MonthData } = {
  january: {
    name: 'January',
    slug: 'january',
    pageImage: {
        src: 'https://images.unsplash.com/photo-1597755472102-15fb225feee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3aW50ZXIlMjB0cmF2ZWwlMjBpbmRpYXxlbnwwfHx8fDE3NjM5OTYwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'winter travel india',
    },
    destinations: [
      {
        name: "Auli, Uttarakhand",
        reason: "January transforms Auli into a premier skiing destination. The snow-covered meadows, panoramic views of the Himalayas, and the crisp mountain air make it perfect for winter sports enthusiasts and nature lovers.",
        hotels: ["The Royal Village, Auli", "Himalayan High, Auli", "The Tattva, Auli", "Cliff Top Club, Auli", "Blue Poppy Resort, Auli"],
        image: { src: "https://images.unsplash.com/photo-1708622359632-56294a8d327e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c25vd3klMjBtb3VudGFpbnMlMjBhdWxpfGVufDB8fHx8MTc2MzcxNjgzM3ww&ixlib=rb-4.1.0&q=80&w=1080", caption: "snowy mountains auli" }
      },
      {
        name: "Jaipur, Rajasthan",
        reason: "The weather in January is pleasantly cool and ideal for sightseeing. You can explore majestic forts, vibrant markets, and attend the Jaipur Literature Festival, which often takes place this month.",
        hotels: ["Rambagh Palace, Jaipur", "Taj Jai Mahal Palace, Jaipur", "ITC Rajputana, a Luxury Collection Hotel", "Jaipur Marriott Hotel", "Fairmont Jaipur"],
        image: { src: "https://images.unsplash.com/photo-1599661046289-e31897846e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhbWJlciUyMGZvcnQlMjBqYWlwdXJ8ZW58MHx8fHwxNzYzNzE2ODMzfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "amber fort jaipur" }
      },
      {
        name: "Goa",
        reason: "After the peak season rush of December, January in Goa is more relaxed but still vibrant. The weather is perfect for beach hopping, water sports, and enjoying the lively shacks and nightlife.",
        hotels: allHotels.filter(h => h.state === 'Goa').slice(0, 5),
        image: { src: "https://images.unsplash.com/photo-1532517891316-72a08e5c03a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxnb2ElMjBiZWFjaHxlbnwwfHx8fDE3NjM3MTY4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "goa beach" }
      },
      {
        name: "Munnar, Kerala",
        reason: "The cool and comfortable climate of January is perfect for exploring Munnar's sprawling tea plantations. The post-monsoon greenery is at its peak, offering breathtaking landscapes.",
        hotels: ["The Fog Munnar", "Chandys Windy Woods", "KTDC Tea County", "Parakkat Nature Resort", "Amber Dale Luxury Hotel"],
        image: { src: "https://images.unsplash.com/photo-1673118857471-34bedcb90ee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8dGVhJTIwcGxhbnRhdGlvbiUyMG11bm5hcnxlbnwwfHx8fDE3NjM3MTY4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "tea plantation munnar" }
      },
      {
        name: "Andaman and Nicobar Islands",
        reason: "With clear skies and calm seas, January is the best time for water activities like scuba diving and snorkeling. The pristine beaches and turquoise waters create a picture-perfect tropical paradise.",
        hotels: ["Taj Exotica Resort & Spa, Andamans", "Barefoot at Havelock", "SeaShell, Havelock", "Munjoh Ocean Resort", "Silver Sand Beach Resort"],
        image: { src: "https://images.unsplash.com/photo-1710790980336-8dea6a8d432d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxhbmRhbWFuJTIwYmVhY2h8ZW58MHx8fHwxNzYzNzE2ODMzfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "andaman beach" }
      },
      {
        name: "Delhi",
        reason: "The pleasant winter of January is ideal for exploring the historical monuments of Delhi. The month culminates with the grand Republic Day Parade on January 26th, a spectacular event to witness.",
        hotels: allHotels.filter(h => h.city === 'New Delhi').slice(0, 5),
        image: { src: "https://images.unsplash.com/photo-1688781298681-ae1f2d470b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdhdGUlMjBkZWxoaXxlbnwwfHx8fDE3NjM3MDU3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "india gate delhi" }
      },
      {
        name: "Rann of Kutch, Gujarat",
        reason: "January is when the Rann Utsav is in full swing. Experience the vast white salt desert under the full moon, enjoy cultural performances, and witness the region's vibrant heritage.",
        hotels: allHotels.filter(h => h.cityId === 'kutch' || h.cityId === 'bhuj'),
        image: { src: "https://images.unsplash.com/photo-1670406312373-6d4d1776e4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyYW5uJTIwb2YlMjBrdXRjaHxlbnwwfHx8fDE3NjM3MTY4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "rann of kutch" }
      },
      {
        name: "Pondicherry",
        reason: "The weather is cool and perfect for exploring the charming French Quarter on foot or by bicycle. The spiritual vibes of Auroville and the serene beaches make it a unique winter getaway.",
        hotels: ["Palais de Mahe - CGH Earth", "La Villa", "The Promenade", "Le Dupleix", "Villa Shanti"],
        image: { src: "https://images.unsplash.com/photo-1647624366438-5b57986d7c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb25kaWNoZXJyeSUyMGZyZW5jaCUyMGNvbG9ueXxlbnwwfHx8fDE3NjM3MTY4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "pondicherry french colony" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "Known as the 'City of Lakes', Udaipur's beauty is enhanced by the pleasant January weather. Enjoy boat rides on Lake Pichola and explore the majestic City Palace without the scorching heat.",
        hotels: allHotels.filter(h => h.city === 'Udaipur').slice(0, 5),
        image: { src: "https://images.unsplash.com/photo-1718812771168-3b3dc283cc78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx1ZGFpcHVyJTIwbGFrZSUyMHBhbGFjZXxlbnwwfHx8fDE3NjM3MTY4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "udaipur lake palace" }
      },
      {
        name: "Khajuraho, Madhya Pradesh",
        reason: "The pleasant daytime temperatures in January are perfect for exploring the intricate and world-famous temple sculptures. The annual Khajuraho Dance Festival often begins towards the end of the month.",
        hotels: allHotels.filter(h => h.cityId === 'khajuraho'),
        image: { src: "https://images.unsplash.com/photo-1672215051407-6e05138da3a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxraGFqdXJhaG8lMjB0ZW1wbGV8ZW58MHx8fHwxNzYzNzE2ODMzfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "khajuraho temple" }
      }
    ]
  },
  february: {
    name: 'February',
    slug: 'february',
    pageImage: { src: 'https://images.unsplash.com/photo-1707829248856-8ec3d1ff05e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzcHJpbmclMjBmbG93ZXJzJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzYzOTk2MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'spring flowers festival' },
    destinations: [
      {
        name: "Jaisalmer, Rajasthan",
        reason: "Attend the vibrant Desert Festival, showcasing Rajasthani culture with folk dances, music, and camel races. The weather is perfect for desert safaris and exploring the golden fort.",
        hotels: allHotels.filter(h => h.city === 'Jaisalmer'),
        image: { src: "https://images.unsplash.com/photo-1598104216839-a9134a6d713c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxyYWphc3RoYW5pJTIwZGVzZXJ0JTIwZmVzdGl2YWx8ZW58MHx8fHwxNzYzOTk2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "rajasthani desert festival" }
      },
      {
        name: "Nashik, Maharashtra",
        reason: "February is the time for SulaFest, a popular gourmet world music festival. Enjoy wine tasting at various vineyards in India's wine capital with pleasant weather as your companion.",
        hotels: allHotels.filter(h => h.city === 'Nashik'),
        image: { src: "https://images.unsplash.com/photo-1598522333806-f1873af9e7a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx3aW5lJTIwdGFzdGluZyUyMHZpbmV5YXJkfGVufDB8fHx8MTc2Mzk5NjE5N3ww&ixlib=rb-4.1.0&q=80&w=1080", caption: "wine tasting vineyard" }
      },
      {
        name: "Varanasi, Uttar Pradesh",
        reason: "Experience the spiritual fervor of Maha Shivaratri, which often falls in February. The city's ghats and temples come alive with prayers, rituals, and processions.",
        hotels: allHotels.filter(h => h.city === 'Varanasi'),
        image: { src: "https://images.unsplash.com/photo-1621370213854-e9185a539f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2YXJhbmFzaSUyMGdoYXRzJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzYzNzk1OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "varanasi spiritual festival" }
      },
      {
        name: "Kaziranga National Park, Assam",
        reason: "The dry season offers the best chances for wildlife sightings, especially the one-horned rhinoceros. The pleasant weather makes jeep safaris and elephant rides more enjoyable.",
        hotels: ["Diphlu River Lodge", "IORA - The Retreat", "Borgos Resort", "Landmark Woods", "Infinity Resorts Kaziranga"],
        image: { src: "https://images.unsplash.com/photo-1649987820138-bff3a105f242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHJoaW5vY2Vyb3MlMjBrYXppcmFuZ2F8ZW58MHx8fHwxNzYzOTk2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "rhinoceros kaziranga" }
      },
      {
        name: "Agra, Uttar Pradesh",
        reason: "Visit during the Taj Mahotsav, a 10-day cultural festival celebrating arts, crafts, and cuisines of India, with the magnificent Taj Mahal as the backdrop.",
        hotels: allHotels.filter(h => h.city === 'Agra'),
        image: { src: "https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGFncmF8ZW58MHx8fHwxNzYzOTk2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "taj mahal agra" }
      },
      {
        name: "Andaman and Nicobar Islands",
        reason: "The weather remains perfect for water sports and beach exploration. It's slightly less crowded than January, offering a more serene experience.",
        hotels: ["Taj Exotica Resort & Spa, Andamans", "Barefoot at Havelock", "SeaShell, Havelock", "Munjoh Ocean Resort", "Silver Sand Beach Resort"],
        image: { src: "https://images.unsplash.com/photo-1579089309486-51f67f0a8235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhbmRhbWFuJTIwc2N1YmElMjBkaXZpbmd8ZW58MHx8fHwxNzYzNzk1OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "andaman scuba diving" }
      },
      {
        name: "Goa",
        reason: "The famous Goa Carnival usually takes place in February, filling the streets with colorful parades, music, and dancing. It's a unique cultural experience.",
        hotels: allHotels.filter(h => h.state === 'Goa').slice(0, 5),
        image: { src: "https://images.unsplash.com/photo-1631587053594-58a439294921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxnb2ElMjBjYXJuaXZhbHxlbnwwfHx8fDE3NjM5OTYxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "goa carnival parade" }
      },
      {
        name: "Puri, Odisha",
        reason: "Attend the Konark Dance Festival held at the magnificent Konark Sun Temple, a short drive from Puri. The weather is pleasant for visiting the Jagannath Temple and beaches.",
        hotels: ["Mayfair Heritage", "Pramod Convention & Beach Resort", "The Chariot Resort & Spa", "Sterling Puri", "Toshali Sands"],
        image: { src: "https://images.unsplash.com/photo-1626444923306-039c32303c2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYWduaWZpY2VudCUyMGtvbmFyayUyMHRlbXBsZXxlbnwwfHx8fDE3NjM5OTYxOTh8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "magnificent konark temple" }
      },
      {
        name: "Thekkady, Kerala",
        reason: "The weather is very pleasant for boating on Periyar Lake and spotting wildlife. It's a great time for trekking and exploring the spice plantations.",
        hotels: allHotels.filter(h => h.city === 'Thekkady'),
        image: { src: "https://images.unsplash.com/photo-1613861810056-512c14041e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBzcGljZSUyMHBsYW50YXRpb258ZW58MHx8fHwxNzYzOTk2MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "kerala spice plantation" }
      },
      {
        name: "Kolkata, West Bengal",
        reason: "The weather is cool and pleasant, ideal for sightseeing. It's also the time for the Kolkata International Book Fair, a paradise for literature lovers.",
        hotels: allHotels.filter(h => h.city === 'Kolkata'),
        image: { src: "https://images.unsplash.com/photo-1598337589143-346c1071295c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxrb2xrYXRhJTIwYm9vayUyMGZhaXJ8ZW58MHx8fHwxNzYzOTk2MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "kolkata book fair" }
      }
    ]
  },
  march: {
    name: 'March',
    slug: 'march',
    pageImage: { src: 'https://images.unsplash.com/photo-1635792367882-a78caead9b4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxob2xpJTIwZmVzdGl2YWwlMjBjb2xvcnN8ZW58MHx8fHwxNzYzOTk2MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'holi festival colors' },
    destinations: [
      {
        name: "Vrindavan & Mathura, Uttar Pradesh",
        reason: "Experience the unique and vibrant celebrations of Holi. From Lathmar Holi in Barsana to the flower-filled Phoolon ki Holi in Vrindavan, it's a spectacle of colors and traditions.",
        hotels: ["Nidhivan Sarovar Portico, Vrindavan", "The Radha Ashok", "Hotel Brijwasi Royal", "Krishna Residency", "Anandam Clarks Inn Suites"],
        image: { src: "https://images.unsplash.com/photo-1616421295988-185d1c24e6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxob2xpJTIwZmVzdGl2YWwlMjBjb2xvcnN8ZW58MHx8fHwxNzYzNzk2MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "holi festival colors" }
      },
      {
        name: "Rishikesh, Uttarakhand",
        reason: "The weather is perfect for yoga, meditation, and adventure sports like white-water rafting before the summer heat sets in. The International Yoga Festival is also held in March.",
        hotels: ["The Westin Resort & Spa, Himalayas", "The Roseate Ganges", "Aloha on the Ganges", "Taj Rishikesh Resort & Spa, Uttarakhand", "EllBee Ganga View"],
        image: { src: "https://images.unsplash.com/photo-1596706917414-b2b513364654?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxSaXNoaWtlc2glMjBicmlkZ2V8ZW58MHx8fHwxNzYzNzk2MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "rishikesh bridge" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "Explore the ancient ruins and stunning landscapes of this UNESCO World Heritage site in pleasant weather, before the scorching summer begins.",
        hotels: ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort", "Heritage Resort Hampi", "Kishkinda Heritage Resort"],
        image: { src: "https://images.unsplash.com/photo-1599307746149-8a2927283621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYW1waSUyMHJ1aW5zfGVufDB8fHx8MTc2Mzc5NjM5Mnww&ixlib=rb-4.1.0&q=80&w=1080", caption: "hampi ruins" }
      },
      {
        name: "Shillong, Meghalaya",
        reason: "The spring season brings pleasant weather, making it ideal to explore the 'Scotland of the East'. The hills are lush green, and waterfalls like Elephant Falls are beautiful.",
        hotels: ["Ri Kynjai", "Hotel Polo Towers Shillong", "The Eee Cee Hotel", "Cafe Shillong Bed & Breakfast", "Aerodene Cottage"],
        image: { src: "https://images.unsplash.com/photo-1596548233981-807a3939922c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzaGlsbG9uZyUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3NjM3OTYzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "shillong landscape" }
      },
      {
        name: "Wayanad, Kerala",
        reason: "Enjoy the cool and pleasant climate to explore Wayanad's natural beauty, including Chembra Peak, Edakkal Caves, and serene waterfalls, before the onset of the summer heat.",
        hotels: ["Vythiri Resort", "Banasura Hill Resort", "The Windflower Resort & Spa", "Pepper Trail", "Vythiri Village Resort"],
        image: { src: "https://images.unsplash.com/photo-1623862419448-897457c156f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3YXlhbmFkJTIwaGlsbHN8ZW58MHx8fHwxNzYzNzk2MzkyfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "wayanad hills" }
      },
       {
        name: "Coorg, Karnataka",
        reason: "The weather is pleasant, perfect for coffee plantation tours and trekking. The air is fragrant with the scent of coffee blossoms.",
        hotels: ["Evolve Back, Coorg", "The Tamara Coorg", "Taj Madikeri Resort & Spa", "Coorg Wilderness Resort", "Old Kent Estates"],
        image: { src: "https://images.unsplash.com/photo-1592751509314-72b363a15234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb29yZyUyMGNvZmZlZSUyMGJsb3Nzb21zfGVufDB8fHx8MTc2Mzc5NjM5Mnww&ixlib=rb-4.1.0&q=80&w=1080", caption: "coorg coffee blossoms" }
      },
      {
        name: "Amritsar, Punjab",
        reason: "The weather is comfortable for visiting the Golden Temple and Jallianwala Bagh. The harvest festival of Baisakhi preparations begin, adding a cultural flavor.",
        hotels: allHotels.filter(h => h.city === 'Amritsar'),
        image: { src: "https://images.unsplash.com/photo-1611333834498-25b7a4a90184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxnYm9sZGVuJTIwdGVtcGxlJTIwbW9ybmluZ3xlbnwwfHx8fDE3NjM3OTYzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "golden temple morning" }
      },
      {
        name: "Tawang, Arunachal Pradesh",
        reason: "March offers clear skies and breathtaking views of the snow-capped Himalayas. It's a great time to visit the Tawang Monastery before the monsoon season.",
        hotels: ["Hotel Tawang Heights", "Vivanta Tawang", "Dondrub Homestay", "Hotel Gakyi Khang Zhang", "Hotel Sambala"],
        image: { src: "https://images.unsplash.com/photo-1642839958741-f7a97753e8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0YXdhbmclMjBtb25hc3Rlcnl8ZW58MHx8fHwxNzYzNzk2MzkzfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "tawang monastery" }
      },
      {
        name: "Velneshwar, Maharashtra",
        reason: "A quiet beach destination ideal for a peaceful getaway. The Velneshwar Temple fair, celebrating Maha Shivaratri, often falls in early March.",
        hotels: ["Kinara Beach Resort", "The Beach House", "Vatsalya Resort", "Regency Resort", "MTDC Resort, Velneshwar"],
        image: { src: "https://picsum.photos/seed/velneshwar-mar/1200/400", caption: "velneshwar beach" }
      },
      {
        name: "Nagpur, Maharashtra",
        reason: "March is the time for Ram Navami celebrations, and Nagpur's Poddareshwar Ram Mandir has one of the grandest processions (Shobha Yatra) in India.",
        hotels: ["Le Méridien Nagpur", "Radisson Blu Hotel Nagpur", "The Pride Hotel Nagpur", "Tuli Imperial", "Hotel Centre Point"],
        image: { src: "https://picsum.photos/seed/nagpur-mar/1200/400", caption: "ram mandir nagpur" }
      }
    ]
  },
  april: {
      name: 'April',
      slug: 'april',
      pageImage: { src: 'https://images.unsplash.com/photo-1746036677197-139291de40ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBzcHJpbmd8ZW58MHx8fHwxNzYzOTk2MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'himalayan mountains spring' },
      destinations: [
        {
            name: "Srinagar, Kashmir",
            reason: "Visit during the Tulip Festival at Asia's largest tulip garden. The valley is in full bloom, with pleasant weather perfect for shikara rides on Dal Lake and exploring Mughal gardens.",
            hotels: allHotels.filter(h => h.cityId === 'srinagar').slice(0, 5),
            image: { src: "https://picsum.photos/seed/srinagar-apr/1200/400", caption: "srinagar tulip garden" }
        },
        {
            name: "Darjeeling, West Bengal",
            reason: "The weather is clear, offering stunning views of Kanchenjunga. It's the 'first flush' season, perfect for tasting the world-renowned Darjeeling tea right from the estates.",
            hotels: allHotels.filter(h => h.city === 'Darjeeling'),
            image: { src: "https://picsum.photos/seed/darjeeling-apr/1200/400", caption: "darjeeling tea plantation" }
        },
        {
            name: "Kodaikanal, Tamil Nadu",
            reason: "Escape the heat of the plains in this 'Princess of Hill Stations'. The weather is pleasant, ideal for boating in the star-shaped lake, cycling, and trekking.",
            hotels: allHotels.filter(h => h.city === 'Kodaikanal'),
            image: { src: "https://picsum.photos/seed/kodaikanal-apr/1200/400", caption: "kodaikanal lake" }
        },
        {
            name: "Pachmarhi, Madhya Pradesh",
            reason: "Known as the 'Queen of Satpura', this hill station is a cool retreat. Explore its waterfalls, ancient caves, and dense forests in pleasant pre-summer weather.",
            hotels: allHotels.filter(h => h.city === 'Pachmarhi'),
            image: { src: "https://picsum.photos/seed/pachmarhi-apr/1200/400", caption: "pachmarhi waterfall" }
        },
        {
            name: "Ooty, Tamil Nadu",
            reason: "The 'Queen of Nilgiris' is in full bloom. Visit the Government Botanical Garden for its annual flower show and enjoy the pleasant climate and scenic toy train rides.",
            hotels: allHotels.filter(h => h.city === 'Ooty'),
            image: { src: "https://picsum.photos/seed/ooty-apr/1200/400", caption: "ooty botanical garden" }
        },
        {
            name: "Kalimpong, West Bengal",
            reason: "A quieter alternative to Darjeeling, Kalimpong is beautiful in April with blooming orchids and gladioli. Enjoy stunning views of Kanchenjunga from Deolo Hill.",
            hotels: allHotels.filter(h => h.city === 'Kalimpong'),
            image: { src: "https://picsum.photos/seed/kalimpong-apr/1200/400", caption: "kalimpong town" }
        },
        {
            name: "Dalhousie, Himachal Pradesh",
            reason: "The snow starts to melt, revealing lush green landscapes. The colonial-era architecture and panoramic views make it a charming and peaceful retreat.",
            hotels: allHotels.filter(h => h.city === 'Dalhousie'),
            image: { src: "https://picsum.photos/seed/dalhousie-apr/1200/400", caption: "dalhousie st. johns church" }
        },
        {
            name: "Gangtok, Sikkim",
            reason: "Pleasant weather and clear skies make April a great month for visiting Gangtok. The International Flower Festival is held during this time, showcasing a variety of rhododendrons and orchids.",
            hotels: allHotels.filter(h => h.city === 'Gangtok'),
            image: { src: "https://picsum.photos/seed/gangtok-apr/1200/400", caption: "gangtok flower show" }
        },
        {
            name: "Kabini, Karnataka",
            reason: "As summer approaches, animals gather near the shrinking water bodies, making wildlife sightings on a boat safari or jeep safari more frequent. A paradise for photographers.",
            hotels: ["Evolve Back, Kabini", "The Serai Kabini", "Kaav Safari Lodge", "Red Earth Kabini", "Jungle Lodges & Resorts"],
            image: { src: "https://picsum.photos/seed/kabini-apr/1200/400", caption: "elephant in kabini river" }
        },
        {
            name: "Cherrapunji, Meghalaya",
            reason: "Visit just before the heavy monsoons begin. The landscape is green, waterfalls are starting to gain volume, and you can explore the living root bridges in pleasant weather.",
            hotels: ["Polo Orchid Resort", "Jiva Resort", "Saimika Resort", "Cherrapunjee Holiday Resort", "Coniferous Resort"],
            image: { src: "https://picsum.photos/seed/cherrapunji-apr/1200/400", caption: "living root bridge cherrapunji" }
        }
      ]
  },
  may: {
      name: 'May',
      slug: 'may',
      pageImage: { src: 'https://images.unsplash.com/photo-1727882931998-23f80d182553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb29sJTIwbW91bnRhaW4lMjB2YWxsZXl8ZW58MHx8fHwxNzYzOTk2MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'cool mountain valley' },
      destinations: [
        {
            name: "Shimla, Himachal Pradesh",
            reason: "Escape the scorching summer heat of the plains. Shimla offers a cool climate, colonial architecture, and stunning Himalayan views. The Mall Road is perfect for evening strolls.",
            hotels: allHotels.filter(h => h.city === 'Shimla'),
            image: { src: "https://picsum.photos/seed/shimla-may/1200/400", caption: "shimla town view" }
        },
        {
            name: "Manali, Himachal Pradesh",
            reason: "A haven for adventure seekers. With pleasant weather, it's the perfect time for paragliding in Solang Valley, trekking, and visiting Rohtang Pass as it opens up.",
            hotels: allHotels.filter(h => h.city === 'Manali'),
            image: { src: "https://picsum.photos/seed/manali-may/1200/400", caption: "manali valley" }
        },
        {
            name: "Mount Abu, Rajasthan",
            reason: "The only hill station in Rajasthan, it provides a cool respite from the desert heat. Enjoy boating in Nakki Lake and visit the intricately carved Dilwara Temples.",
            hotels: ["Hotel Hillock", "Cama Rajputana Club Resort", "Hotel Toppers Corner", "WelcomHeritage Connaught House", "Sterling Mount Abu"],
            image: { src: "https://picsum.photos/seed/mountabu-may/1200/400", caption: "nakki lake mount abu" }
        },
        {
            name: "Spiti Valley, Himachal Pradesh",
            reason: "May marks the beginning of the tourist season as roads open. The stark, high-altitude desert landscape is breathtaking. Visit ancient monasteries and remote villages.",
            hotels: ["Hotel Deyzor", "Sakya Abode", "Grand Dewachen", "Zostel Spiti", "Spiti Heritage Himalayan Brothers"],
            image: { src: "https://picsum.photos/seed/spiti-may/1200/400", caption: "spiti valley monastery" }
        },
        {
            name: "Bir Billing, Himachal Pradesh",
            reason: "Recognized as one of the best paragliding sites in the world. The thermal currents are ideal in May, offering long and scenic flights over the Kangra Valley.",
            hotels: ["Colonel's Resort", "The Sky Village", "Bir High", "Chokling Art House", "Tatva Bir Tents and Hotel"],
            image: { src: "https://picsum.photos/seed/birbilling-may/1200/400", caption: "paragliding bir billing" }
        },
        {
            name: "Tirthan Valley, Himachal Pradesh",
            reason: "A serene getaway for nature lovers. May is perfect for trout fishing, trekking in the Great Himalayan National Park, and relaxing by the pristine Tirthan River.",
            hotels: ["Raju Bharti's Guest House", "The Himalayan Trout House", "Jibhi Homestead", "Sharda Resort", "For A While"],
            image: { src: "https://picsum.photos/seed/tirthan-may/1200/400", caption: "tirthan valley river" }
        },
        {
            name: "Munnar, Kerala",
            reason: "The weather is pleasant before the monsoons arrive. It's a great time to visit the tea gardens and Eravikulam National Park to see the Nilgiri Tahr.",
            hotels: allHotels.filter(h => h.city === 'Munnar'),
            image: { src: "https://picsum.photos/seed/munnar-may/1200/400", caption: "munnar tea gardens summer" }
        },
        {
            name: "Lansdowne, Uttarakhand",
            reason: "A quiet and unspoiled hill station. The pleasant weather in May is perfect for nature walks, boating in Bhulla Lake, and enjoying the peaceful colonial ambiance.",
            hotels: ["Fairydale Resort", "Vanvasa Resort", "The Alpine Resort", "Blue Pine Resort", "Samskara & Samsara"],
            image: { src: "https://picsum.photos/seed/lansdowne-may/1200/400", caption: "lansdowne town" }
        },
        {
            name: "Horsley Hills, Andhra Pradesh",
            reason: "A lesser-known hill station in Andhra Pradesh, it provides a cool escape from the summer heat. Enjoy the scenic beauty and activities like zorbing and rappelling.",
            hotels: ["Haritha Hill Resort", "Horsley Hills Holiday Homes", "SS Grand", "Sri Krishna Residency", "AP Tourism Guesthouse"],
            image: { src: "https://picsum.photos/seed/horsley-hills-may/1200/400", caption: "horsley hills viewpoint" }
        },
        {
            name: "Sandakphu, West Bengal",
            reason: "For serious trekkers, May is one of the best months for the Sandakphu trek. The rhododendrons are in full bloom, and you get clear views of the 'Sleeping Buddha' range of peaks.",
            hotels: ["Hotel Sherpa Chalet", "Goparma Hotel", "Hotel Shovraj", "Teesta Valley Resort", "Local Trekkers' Huts"],
            image: { src: "https://picsum.photos/seed/sandakphu-may/1200/400", caption: "sandakphu trekking view" }
        }
      ]
  },
  june: {
    name: 'June',
    slug: 'june',
    pageImage: { src: 'https://images.unsplash.com/photo-1758468205216-ca17e22848bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxsYWRha2glMjBtb3VudGFpbiUyMHBhc3N8ZW58MHx8fHwxNzYzOTk2MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'ladakh mountain pass' },
    destinations: [
      {
        name: "Ladakh, Jammu & Kashmir",
        reason: "June is the best time to visit Ladakh. The snow has melted, all passes and roads are open, and the weather is perfect for exploring monasteries, high-altitude lakes like Pangong Tso, and dramatic landscapes.",
        hotels: ["The Grand Dragon Ladakh", "Stok Palace Heritage", "Ladakh Sarai Resort", "The Zen Ladakh", "Hotel Shambhala"],
        image: { src: "https://picsum.photos/seed/ladakh-june/1200/400", caption: "pangong lake ladakh" }
      },
      {
        name: "Coorg, Karnataka",
        reason: "The onset of monsoon transforms Coorg into a lush green paradise. Enjoy the mist-laden coffee plantations, gushing waterfalls like Abbey Falls, and the aroma of fresh coffee.",
        hotels: allHotels.filter(h => h.city === 'Madikeri'),
        image: { src: "https://picsum.photos/seed/coorg-june/1200/400", caption: "coorg coffee plantation" }
      },
      {
        name: "Malshej Ghat, Maharashtra",
        reason: "A mountain pass that comes alive during the monsoon. It's a paradise for nature lovers, with numerous waterfalls, lush green hillsides, and misty clouds covering the landscape.",
        hotels: ["Saj By The Lake", "MTDC Malshej Ghat", "The Regenta MPS", "Jivdani Resort", "Hotel Girija"],
        image: { src: "https://picsum.photos/seed/malshej-june/1200/400", caption: "malshej ghat waterfall" }
      },
      {
        name: "Sikkim",
        reason: "Visit before the heavy monsoon sets in. The weather is pleasant, and the rhododendrons are still in bloom at higher altitudes. It's great for sightseeing in Gangtok and Pelling.",
        hotels: allHotels.filter(h => h.state === 'Sikkim').slice(0, 5),
        image: { src: "https://picsum.photos/seed/sikkim-june/1200/400", caption: "sikkim mountains" }
      },
      {
        name: "Valley of Flowers, Uttarakhand",
        reason: "The Valley of Flowers National Park, a UNESCO World Heritage Site, opens in June. The valley starts to get carpeted with a vibrant array of alpine flowers.",
        hotels: ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode", "Blue Poppy Swiss Cottage Camps", "Hotel Bhagat"],
        image: { src: "https://picsum.photos/seed/valley-flowers-june/1200/400", caption: "valley of flowers" }
      },
      {
        name: "Dharamshala, Himachal Pradesh",
        reason: "The pre-monsoon weather is pleasant, making it ideal for exploring McLeod Ganj, visiting monasteries, and trekking to Triund. The Dalai Lama Temple is a serene experience.",
        hotels: allHotels.filter(h => h.city === 'Dharamshala'),
        image: { src: "https://picsum.photos/seed/dharamshala-june/1200/400", caption: "dharamshala cricket stadium" }
      },
      {
        name: "Goa",
        reason: "Experience the unique Sao Joao festival, where locals jump into wells and streams. The monsoon begins, turning Goa lush and green, with fewer crowds.",
        hotels: allHotels.filter(h => h.state === 'Goa').slice(0, 5),
        image: { src: "https://picsum.photos/seed/goa-june/1200/400", caption: "goa monsoon" }
      },
      {
        name: "Kudremukh, Karnataka",
        reason: "For trekkers, Kudremukh is a paradise in June. The monsoon brings the grasslands to life, offering stunning green vistas. It's a challenging but rewarding trek.",
        hotels: ["Bhagavathi Nature Camp", "Upasana Retreat", "The Gateway Chikmagalur", "Jungle Lodges & Resorts", "Local Homestays"],
        image: { src: "https://picsum.photos/seed/kudremukh-june/1200/400", caption: "kudremukh trek" }
      },
      {
        name: "Meghamalai, Tamil Nadu",
        reason: "A lesser-known hill station, Meghamalai is stunning in June with the onset of rains. It's an untouched paradise of tea estates and cloud-covered mountains.",
        hotels: ["Highwavys Travellers Bungalow", "Cloud Mountain Bungalow", "Manalar Estate Bungalow", "Limited Homestays", "Nearby hotels in Theni"],
        image: { src: "https://picsum.photos/seed/meghamalai-june/1200/400", caption: "meghamalai tea estates" }
      },
      {
        name: "Aizawl, Mizoram",
        reason: "The pleasant weather of early June is perfect for exploring this vibrant city built on ridges. Visit the local markets and enjoy the panoramic views before heavy rains start.",
        hotels: ["Hotel Regency", "The Grand Hotel", "Hotel Floria", "David's Hotel", "Aizawl Guest House"],
        image: { src: "https://picsum.photos/seed/aizawl-june/1200/400", caption: "aizawl city view" }
      }
    ]
  },
  july: {
    name: 'July',
    slug: 'july',
    pageImage: { src: 'https://images.unsplash.com/photo-1693276206327-6f67168dc3bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzb29uJTIwa2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHx8fDE3NjM5OTYwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'monsoon kerala backwaters' },
    destinations: [
      {
        name: "Munnar, Kerala",
        reason: "The monsoons bring a magical charm to Munnar. The tea gardens are washed clean and look vibrant green. It's a perfect time for those who enjoy rain and lush landscapes.",
        hotels: allHotels.filter(h => h.city === 'Munnar'),
        image: { src: "https://picsum.photos/seed/munnar-july/1200/400", caption: "monsoon in munnar" }
      },
      {
        name: "Goa",
        reason: "Experience the 'other side' of Goa. The monsoon season means fewer crowds, lush green scenery, and overflowing waterfalls like Dudhsagar. It's ideal for a peaceful, romantic getaway.",
        hotels: allHotels.filter(h => h.state === 'Goa').slice(0, 5),
        image: { src: "https://picsum.photos/seed/goa-july/1200/400", caption: "dudhsagar falls goa" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "The city of lakes becomes even more enchanting with the arrival of monsoons. The lakes fill up, the temperature drops, and the Aravalli hills turn green. Enjoy the romantic boat rides.",
        hotels: allHotels.filter(h => h.city === 'Udaipur').slice(0, 5),
        image: { src: "https://picsum.photos/seed/udaipur-july/1200/400", caption: "monsoon palace udaipur" }
      },
      {
        name: "Lonavala, Maharashtra",
        reason: "A popular monsoon destination near Mumbai and Pune. The hills are covered in a green blanket, and attractions like Bhushi Dam and Tiger Point are at their scenic best.",
        hotels: ["Fariyas Resort Lonavala", "The Machan", "Della Resorts", "Radisson Resort & Spa Lonavala", "Rhythm Lonavala"],
        image: { src: "https://picsum.photos/seed/lonavala-july/1200/400", caption: "lonavala misty hills" }
      },
      {
        name: "Orchha, Madhya Pradesh",
        reason: "The historical town of Orchha, with its magnificent palaces and temples, looks stunning against the grey monsoon sky. The Betwa river flows in full force, adding to the beauty.",
        hotels: ["Amar Mahal Orchha", "Sheesh Mahal Orchha", "Bundelkhand Riverside", "Hotel Raj Mahal", "The Orchha Resort"],
        image: { src: "https://picsum.photos/seed/orchha-july/1200/400", caption: "orchha cenotaphs" }
      },
       {
        name: "Valley of Flowers, Uttarakhand",
        reason: "The valley is in full bloom. The monsoon showers make the flowers vibrant and the landscape exceptionally green. It's a breathtaking sight for trekkers.",
        hotels: ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode", "Blue Poppy Swiss Cottage Camps", "Hotel Bhagat"],
        image: { src: "https://picsum.photos/seed/valley-flowers-july/1200/400", caption: "valley of flowers monsoon" }
      },
      {
        name: "Spiti Valley, Himachal Pradesh",
        reason: "Spiti is in a rain-shadow region, meaning it receives very little rainfall, making it a perfect monsoon escape. The weather is ideal for road trips and monastery visits.",
        hotels: ["Hotel Deyzor", "Sakya Abode", "Grand Dewachen", "Zostel Spiti", "Spiti Heritage Himalayan Brothers"],
        image: { src: "https://picsum.photos/seed/spiti-july/1200/400", caption: "key monastery spiti" }
      },
      {
        name: "Kodaikanal, Tamil Nadu",
        reason: "The 'Princess of Hill Stations' gets a romantic, misty makeover in July. Enjoy the beauty of the rain-washed landscapes, gushing waterfalls, and the serene Kodai Lake.",
        hotels: allHotels.filter(h => h.city === 'Kodaikanal'),
        image: { src: "https://picsum.photos/seed/kodaikanal-july/1200/400", caption: "kodaikanal misty lake" }
      },
      {
        name: "Agumbe, Karnataka",
        reason: "Known as the 'Cherrapunji of the South', Agumbe is a paradise for rain lovers and nature enthusiasts. It's famous for its rainforests, waterfalls, and stunning sunset views.",
        hotels: ["Dodda Mane", "Seethanadi Nature Camp", "Kalinga Centre for Rainforest Ecology", "Limited Homestays", "Nearby hotels in Thirthahalli"],
        image: { src: "https://picsum.photos/seed/agumbe-july/1200/400", caption: "agumbe rainforest" }
      },
      {
        name: "Shillong, Meghalaya",
        reason: "The monsoon enhances the beauty of Shillong. The waterfalls are at their peak, the lakes are full, and the entire city is covered in a romantic mist.",
        hotels: allHotels.filter(h => h.city === 'Shillong'),
        image: { src: "https://picsum.photos/seed/shillong-july/1200/400", caption: "elephant falls shillong monsoon" }
      }
    ]
  },
  august: {
    name: 'August',
    slug: 'august',
    pageImage: { src: 'https://images.unsplash.com/photo-1676655781178-7a049793fa7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxmbG93ZXIlMjB2YWxsZXklMjBtb25zb29ufGVufDB8fHx8MTc2Mzk5NjAwN3ww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'flower valley monsoon' },
    destinations: [
      {
        name: "Valley of Flowers, Uttarakhand",
        reason: "August is the peak blooming season. The entire valley is a riot of colors with over 300 species of alpine flowers in full bloom. A trekker's paradise.",
        hotels: ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode", "Blue Poppy Swiss Cottage Camps", "Hotel Bhagat"],
        image: { src: "https://picsum.photos/seed/valley-flowers-aug/1200/400", caption: "flowers in bloom" }
      },
      {
        name: "Alleppey (Alappuzha), Kerala",
        reason: "Witness the spectacular Nehru Trophy Snake Boat Race, held on the second Saturday of August. The backwaters are lush and rejuvenated after the rains.",
        hotels: allHotels.filter(h => h.city === 'Alleppey'),
        image: { src: "https://picsum.photos/seed/alleppey-aug/1200/400", caption: "kerala snake boat race" }
      },
      {
        name: "Cherrapunji, Meghalaya",
        reason: "Experience the monsoons in one of the wettest places on earth. The waterfalls are thunderous, and the landscape is an intense, vivid green. A must for rain lovers.",
        hotels: ["Polo Orchid Resort", "Jiva Resort", "Saimika Resort", "Cherrapunjee Holiday Resort", "Coniferous Resort"],
        image: { src: "https://picsum.photos/seed/cherrapunji-aug/1200/400", caption: "cherrapunji living root bridge" }
      },
      {
        name: "Kanyakumari, Tamil Nadu",
        reason: "The monsoons provide a dramatic backdrop to the confluence of the three seas. The sky is often painted with beautiful colors during sunrise and sunset.",
        hotels: ["The Gopinivas Grand", "Hotel Seaface", "Sparsa Kanyakumari", "Hotel Tri Sea", "Annai Resorts & Spa"],
        image: { src: "https://picsum.photos/seed/kanyakumari-aug/1200/400", caption: "kanyakumari vivekananda rock" }
      },
      {
        name: "Delhi",
        reason: "Experience the patriotic fervor of Independence Day on August 15th at the Red Fort. The weather is relatively cooler after the monsoon showers, making it good for sightseeing.",
        hotels: allHotels.filter(h => h.city === 'New Delhi').slice(0, 5),
        image: { src: "https://picsum.photos/seed/delhi-aug/1200/400", caption: "red fort delhi" }
      },
       {
        name: "Athirapally, Kerala",
        reason: "The Athirapally Falls, often called the 'Niagara of India', is at its majestic best during the monsoons of August. The sheer volume and power of the water is a sight to behold.",
        hotels: ["Rainforest Resort", "Niraamaya Retreats Samroha", "Casa Rio Resorts", "Willow Heights", "Magic Land Resort"],
        image: { src: "https://picsum.photos/seed/athirapally-aug/1200/400", caption: "athirapally falls" }
      },
      {
        name: "Madurai, Tamil Nadu",
        reason: "August is the time for the grand Avanimoolam festival at the Meenakshi Temple, a major cultural event. The weather is also pleasant post-showers.",
        hotels: allHotels.filter(h => h.city === 'Madurai'),
        image: { src: "https://picsum.photos/seed/madurai-aug/1200/400", caption: "meenakshi temple madurai" }
      },
      {
        name: "Coorg, Karnataka",
        reason: "Coorg is a lush green heaven in August. The coffee plantations are vibrant, waterfalls are in full flow, and the misty landscape is perfect for a romantic monsoon getaway.",
        hotels: allHotels.filter(h => h.city === 'Madikeri'),
        image: { src: "https://picsum.photos/seed/coorg-aug/1200/400", caption: "coorg waterfall monsoon" }
      },
      {
        name: "Mount Abu, Rajasthan",
        reason: "The Aravalli hills surrounding Mount Abu are at their greenest. The monsoon clouds and mist add a mystical charm to this hill station.",
        hotels: ["Hotel Hillock", "Cama Rajputana Club Resort", "WelcomHeritage Connaught House", "Sterling Mount Abu", "Hotel Toppers Corner"],
        image: { src: "https://picsum.photos/seed/mountabu-aug/1200/400", caption: "mount abu monsoon" }
      },
      {
        name: "Igatpuri, Maharashtra",
        reason: "Home to the world's largest meditation center, the Vipassana International Academy, Igatpuri is a serene monsoon destination with lush valleys and ancient forts.",
        hotels: ["Manas Resort with Petting Zoo", "The Herb Farm", "Rainforest Resort and Spa", "Mystic Valley Spa Resort", "Dew Drops Boutique Retreat"],
        image: { src: "https://picsum.photos/seed/igatpuri-aug/1200/400", caption: "igatpuri valley monsoon" }
      }
    ]
  },
  september: {
    name: 'September',
    slug: 'september',
    pageImage: { src: 'https://images.unsplash.com/photo-1652120712347-6e7b037325fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwb3N0LW1vbnNvb24lMjBncmVlbiUyMGhpbGxzfGVufDB8fHx8MTc2Mzk5NjAwOHww&ixlib=rb-4.1.0&q=80&w=1080', caption: 'post-monsoon green hills' },
    destinations: [
      {
        name: "Ziro Valley, Arunachal Pradesh",
        reason: "Attend the Ziro Festival of Music, a unique outdoor music festival set against the stunning backdrop of rice fields. The post-monsoon weather is pleasant and the valley is lush green.",
        hotels: ["Ziro Valley Resort", "Siiro Resort", "Kite-A-Naki", "Abasa Homestay", "Michi Resort"],
        image: { src: "https://picsum.photos/seed/ziro-sep/1200/400", caption: "ziro valley rice fields" }
      },
      {
        name: "Lachen, Sikkim",
        reason: "As the monsoon recedes, the skies clear up, offering breathtaking views of the Himalayas. Gurudongmar Lake is accessible and looks stunning in this season.",
        hotels: ["The Apple Orchard Resort", "Jain Group Hotel Sonam Palgey", "Yarlam, Lachung", "Himalayan Residency", "Magpie Nest"],
        image: { src: "https://picsum.photos/seed/lachen-sep/1200/400", caption: "gurudongmar lake sikkim" }
      },
      {
        name: "Mahabaleshwar, Maharashtra",
        reason: "The landscape is vibrant and green after the rains. Waterfalls are still full, and it's the perfect time for boating in Venna Lake and enjoying the panoramic views.",
        hotels: allHotels.filter(h => h.city === 'Mahabaleshwar'),
        image: { src: "https://picsum.photos/seed/mahabaleshwar-sep/1200/400", caption: "venna lake mahabaleshwar" }
      },
      {
        name: "Amritsar, Punjab",
        reason: "The weather becomes pleasant after the monsoon. It's a great time to visit the Golden Temple and witness the patriotic Beating Retreat ceremony at the Wagah Border.",
        hotels: allHotels.filter(h => h.city === 'Amritsar'),
        image: { src: "https://picsum.photos/seed/amritsar-sep/1200/400", caption: "golden temple amritsar" }
      },
      {
        name: "Mumbai, Maharashtra",
        reason: "Experience the grand celebrations of Ganesh Chaturthi which often continues into early September. The city is filled with artistic pandals and massive idols, culminating in an energetic immersion procession.",
        hotels: allHotels.filter(h => h.city === 'Mumbai').slice(0, 5),
        image: { src: "https://picsum.photos/seed/mumbai-sep/1200/400", caption: "ganesh chaturthi mumbai" }
      },
       {
        name: "Bundi, Rajasthan",
        reason: "The post-monsoon weather is perfect for exploring this hidden gem of Rajasthan. The town's lakes and stepwells are full, and the palaces and forts look magnificent.",
        hotels: ["Hadora Haveli", "Bundi Inn", "Dev Niwas", "Kasera Paradise", "The Ummaid Bagh Resort"],
        image: { src: "https://picsum.photos/seed/bundi-sep/1200/400", caption: "bundi palace" }
      },
      {
        name: "Dooars, West Bengal",
        reason: "The forests of the Dooars region reopen after the monsoon. The landscape is incredibly lush, and it's a great time for wildlife safaris in Gorumara and Jaldapara National Parks.",
        hotels: ["Sinclairs Siliguri", "The Riverwood Forest Retreat", "Aranya Jungle Resort", "Resort Murti", "Gorumara Jungle Resort"],
        image: { src: "https://picsum.photos/seed/dooars-sep/1200/400", caption: "dooars tea garden" }
      },
      {
        name: "Saputara, Gujarat",
        reason: "The monsoon leaves Gujarat's only hill station fresh and green. Enjoy boating on the lake and visit the Gira waterfalls, which are at their best this time of year.",
        hotels: ["Aakar Lords Inn", "Patang Residency", "Hotel Anando", "Shilpi Hill Resort", "Toran Hill Resort"],
        image: { src: "https://picsum.photos/seed/saputara-sep/1200/400", caption: "saputara lake" }
      },
      {
        name: "Pune, Maharashtra",
        reason: "The city hosts grand Ganesh Chaturthi celebrations. The weather is also very pleasant for exploring the city's forts, cafes, and Osho Ashram.",
        hotels: allHotels.filter(h => h.city === 'Pune').slice(0, 5),
        image: { src: "https://picsum.photos/seed/pune-sep/1200/400", caption: "shaniwar wada pune" }
      },
      {
        name: "Thimphu, Bhutan",
        reason: "Just across the border, September hosts the vibrant Thimphu Tshechu festival. The post-monsoon skies are clear, offering stunning Himalayan views.",
        hotels: ["Le Méridien Thimphu", "Taj Tashi", "Terma Linca Resort & Spa", "Druk Hotel", "Hotel Osel"],
        image: { src: "https://picsum.photos/seed/thimphu-sep/1200/400", caption: "thimphu dzong festival" }
      }
    ]
  },
  october: {
    name: 'October',
    slug: 'october',
    pageImage: { src: 'https://images.unsplash.com/photo-1606293927179-df3472a42720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxkdXNzZWhyYSUyMGZlc3RpdmFsJTIwY2VsZWJyYXRpb258ZW58MHx8fHwxNzYzOTk2MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'dussehra festival celebration' },
    destinations: [
      {
        name: "Kolkata, West Bengal",
        reason: "Immerse yourself in the grand festivities of Durga Puja. The city turns into a massive art gallery with beautifully crafted pandals and idols, accompanied by delicious food.",
        hotels: allHotels.filter(h => h.city === 'Kolkata'),
        image: { src: "https://images.unsplash.com/photo-1728750752779-84c51771d3bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxkdXJnYSUyMHB1amElMjBrb2xrYXRhfGVufDB8fHx8MTc2NDA5MDYwOXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "durga puja kolkata" }
      },
      {
        name: "Mysore, Karnataka",
        reason: "Witness the royal splendor of Dasara celebrations. The Mysore Palace is magnificently illuminated, and the Jumboo Savari (elephant procession) is a grand spectacle.",
        hotels: allHotels.filter(h => h.city === 'Mysuru'),
        image: { src: "https://images.unsplash.com/photo-1719973123178-6d5cf170f4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxteXNvcmUlMjBwYWxhY2UlMjBkYXNhcmF8ZW58MHx8fHwxNzY0MDkwNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "mysore palace dasara" }
      },
      {
        name: "Bandhavgarh National Park, Madhya Pradesh",
        reason: "The park reopens after the monsoon. The forest is lush, and the chances of spotting tigers and other wildlife are high as they come out to the waterholes.",
        hotels: ["Syna Tiger Resort", "Mahua Kothi, A Taj Safari", "Samode Safari Lodge", "Lemon Tree Wildlife Resort", "Nature Heritage Resort"],
        image: { src: "https://images.unsplash.com/photo-1718546254763-d99e07ec06a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0aWdlciUyMGluJTIwYmFuZGhhdmdhcmh8ZW58MHx8fHwxNzY0MDkwNjA5fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "tiger in bandhavgarh" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "The weather is dry and pleasant, perfect for exploring the vast UNESCO World Heritage site on foot or by bicycle. The post-monsoon landscape is still green.",
        hotels: ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort", "Heritage Resort Hampi", "Kishkinda Heritage Resort"],
        image: { src: "https://images.unsplash.com/photo-1651073231492-169afcf84f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYW1waSUyMHN0b25lJTIwY2hhcmlvdHxlbnwwfHx8fDE3NjQwOTA2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "hampi stone chariot" }
      },
      {
        name: "Pachmarhi, Madhya Pradesh",
        reason: "The 'Queen of Satpura' is at its scenic best with lush greenery and active waterfalls after the rains. The pleasant weather is ideal for trekking and sightseeing.",
        hotels: allHotels.filter(h => h.city === 'Pachmarhi'),
        image: { src: "https://images.unsplash.com/photo-1674500547677-6a779a7faefe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwYWNobWFyaGklMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzY0MDkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "pachmarhi landscape" }
      },
       {
        name: "Jodhpur, Rajasthan",
        reason: "The weather is perfect for exploring the Blue City. The world-renowned Rajasthan International Folk Festival (RIFF) takes place at Mehrangarh Fort in October.",
        hotels: allHotels.filter(h => h.city === 'Jodhpur'),
        image: { src: "https://images.unsplash.com/photo-1711209199183-fbdfd859d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZWhyYW5nYXJoJTIwZm9ydCUyMGpvZGhwdXIlMjBuaWdodHxlbnwwfHx8fDE3NjQwOTA2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "mehrangarh fort jodhpur night" }
      },
      {
        name: "Rishikesh, Uttarakhand",
        reason: "The post-monsoon river has a great flow for white-water rafting, and the weather is ideal for yoga, meditation, and camping by the Ganges.",
        hotels: allHotels.filter(h => h.city === 'Rishikesh'),
        image: { src: "https://images.unsplash.com/photo-1715230656262-9410dfbead2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyYWZ0aW5nJTIwaW4lMjByaXNoaWtlc2h8ZW58MHx8fHwxNzY0MDkwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "rafting in rishikesh" }
      },
      {
        name: "Darjeeling, West Bengal",
        reason: "Post-monsoon clear skies offer the best views of the Kanchenjunga range. It's also the time for the 'second flush' tea, considered one of the finest.",
        hotels: allHotels.filter(h => h.city === 'Darjeeling'),
        image: { src: "https://images.unsplash.com/photo-1637737118663-f1a53ee1d5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxrYW5jaGVuanVuZ2ElMjB2aWV3JTIwZGFyamVlbGluZ3xlbnwwfHx8fDE3NjQwOTA2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "kanchenjunga view darjeeling" }
      },
      {
        name: "Diu",
        reason: "The weather is dry and pleasant, perfect for enjoying the pristine beaches and Portuguese architecture without the crowds of Goa.",
        hotels: [],
        image: { src: "https://images.unsplash.com/photo-1569776186059-f26b84be14b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkaXUlMjBmb3J0fGVufDB8fHx8MTc2NDA5MDYwOXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "diu fort" }
      },
      {
        name: "Nainital, Uttarakhand",
        reason: "The autumn season brings a crispness to the air and clear panoramic views of the Himalayas. Enjoy boating on Naini Lake and get panoramic Himalayan views from Snow View Point.",
        hotels: allHotels.filter(h => h.city === 'Nainital'),
        image: { src: "https://images.unsplash.com/photo-1616605586215-199845790f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bmFpbml0YWwlMjBsYWtlfGVufDB8fHx8MTc2NDA5MDYxMHww&ixlib=rb-4.1.0&q=80&w=1080", caption: "nainital lake" }
      }
    ]
  },
  november: {
    name: 'November',
    slug: 'november',
    pageImage: { src: 'https://images.unsplash.com/photo-1666244454829-7f0889ec5783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxkaXdhbGklMjBsaWdodHMlMjBmZXN0aXZhbHxlbnwwfHx8fDE3NjM5OTYwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'diwali lights festival' },
    destinations: [
      {
        name: "Varanasi, Uttar Pradesh",
        reason: "Witness the ethereal beauty of Dev Deepawali, when thousands of diyas (earthen lamps) are lit on the ghats of the Ganges. It's a truly magical and spiritual experience.",
        hotels: ["BrijRama Palace, Varanasi", "Taj Ganges, Varanasi", "The Clarks, Varanasi", "Hotel Madin", "Ramada Plaza by Wyndham JHV Varanasi"],
        image: { src: "https://images.unsplash.com/photo-1635742390926-64e2c3f01ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxkZXYlMjBkZWVwYXdhbGklMjB2YXJhbmFzaXxlbnwwfHx8fDE3NjM3NjI4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "dev deepawali varanasi" }
      },
      {
        name: "Pushkar, Rajasthan",
        reason: "Experience the world's largest camel fair, the Pushkar Mela. It's a vibrant spectacle of culture, trade, and traditions, with competitions, folk performances, and hot air ballooning.",
        hotels: ["The Westin Pushkar Resort & Spa", "Ananta Spa & Resorts", "Pratap Mahal, Ajmer", "The Greenhouse Resort", "Bhanwar Singh Palace"],
        image: { src: "https://images.unsplash.com/photo-1717131553948-13c2c59c7293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwdXNoa2FyJTIwY2FtZWwlMjBmYWlyfGVufDB8fHx8MTc2Mzc2Mjg1Mnww&ixlib=rb-4.1.0&q=80&w=1080", caption: "pushkar camel fair" }
      },
      {
        name: "Sundarbans, West Bengal",
        reason: "The pleasant weather is ideal for exploring the world's largest mangrove forest. It's the best time for boat safaris to spot the elusive Royal Bengal Tiger and other wildlife.",
        hotels: ["Sundarban Tiger Camp", "Sunderban Jungle Mahal", "Royal Bengal Resort", "Solitary Nook", "WBTD Sajnekhali Tourist Lodge"],
        image: { src: "https://images.unsplash.com/photo-1712852828865-bb920a0876b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzdW5kYXJiYW5zJTIwbWFuZ3JvdmUlMjBmb3Jlc3R8ZW58MHx8fHwxNzYzNzYyODUyfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "sundarbans mangrove forest" }
      },
      {
        name: "Goa",
        reason: "November marks the beginning of the tourist season. The weather is perfect, the shacks are open, and the vibe is energetic, but it's less crowded than December.",
        hotels: allHotels.filter(h => h.state === 'Goa').slice(0, 5),
        image: { src: "https://images.unsplash.com/photo-1597820334272-af87b2d917c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z29hJTIwYmVhY2glMjBzaGFja3xlbnwwfHx8fDE3NjM3NjI4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "goa beach shack" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "The weather is perfect for exploring the ruins. The Hampi Utsav, a grand cultural festival, is sometimes held in November, bringing the ancient city to life with music and dance.",
        hotels: ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort", "Heritage Resort Hampi", "Kishkinda Heritage Resort"],
        image: { src: "https://images.unsplash.com/photo-1718293753538-976041c4f2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aGFtcGklMjBmZXN0aXZhbHxlbnwwfHx8fDE3NjM3NjI4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "hampi festival" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "The cool and pleasant weather is ideal for sightseeing and boat rides on Lake Pichola. The city is beautifully lit up for Diwali if it falls in November.",
        hotels: allHotels.filter(h => h.city === 'Udaipur').slice(0, 5),
        image: { src: "https://images.unsplash.com/photo-1696861524777-978d87c7cff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHx1ZGFpcHVyJTIwY2l0eSUyMHBhbGFjZXxlbnwwfHx8fDE3NjM3NjI4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "udaipur city palace" }
      },
      {
        name: "Bodh Gaya, Bihar",
        reason: "The weather is cool and pleasant, making it the perfect time for pilgrims and tourists to visit the Mahabodhi Temple and other Buddhist monasteries.",
        hotels: ["The Royal Residency", "Maha Bodhi Hotel Resort", "Oaks Bodhgaya", "Hotel Bodh Vilas", "Hotel Sujata"],
        image: { src: "https://images.unsplash.com/photo-1744979324655-520e1be34f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtYWhhYm9kaGklMjB0ZW1wbGUlMjBib2RoJTIwZ2F5YXxlbnwwfHx8fDE3NjM3NjI4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "mahabodhi temple bodh gaya" }
      },
      {
        name: "Gir National Park, Gujarat",
        reason: "This is the best time to spot the majestic Asiatic Lions as the weather is pleasant and the vegetation is not too dense. The park is fully open for safaris.",
        hotels: ["The Fern Gir Forest Resort", "Woods at Sasan", "The Gateway Hotel Gir Forest", "Amidhara Resort", "Gir Serai - IHCL SeleQtions"],
        image: { src: "https://images.unsplash.com/photo-1653038803592-642bcd3910da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhc2lhdGljJTIwbGlvbiUyMGdpcnxlbnwwfHx8fDE3NjM3NjI4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "asiatic lion gir" }
      },
      {
        name: "Almora, Uttarakhand",
        reason: "Enjoy crisp mountain air and clear panoramic views of the Himalayas. The town's unique horseshoe shape and cultural heritage make it a charming winter destination.",
        hotels: ["The Kumaon", "Gohil's Homestay", "Imperial Heights", "Kasar Rainbow Resort", "Mohan's Binsar Retreat"],
        image: { src: "https://images.unsplash.com/photo-1707818131609-f34f7316c5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aGltYWxheWFuJTIwdmlldyUyMGZyb20lMjBhbG1vcmF8ZW58MHx8fHwxNzYzNzYyODUyfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "himalayan view from almora" }
      },
      {
        name: "Shillong, Meghalaya",
        reason: "The post-monsoon Cherry Blossom Festival is a spectacular event, painting the city in shades of pink. The weather is cool and perfect for exploring.",
        hotels: ["Ri Kynjai", "Hotel Polo Towers Shillong", "The Eee Cee Hotel", "Cafe Shillong Bed & Breakfast", "Aerodene Cottage"],
        image: { src: "https://images.unsplash.com/photo-1679840892951-8bd6562214f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzaGlsbG9uZyUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MHx8fHwxNzYzNzYyODUyfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "shillong cherry blossom" }
      }
    ]
  },
  december: {
    name: 'December',
    slug: 'december',
    pageImage: { src: 'https://images.unsplash.com/photo-1704703335952-10b90cd0312a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxiZWFjaCUyMHBhcnR5JTIwbmV3JTIweWVhcnxlbnwwfHx8fDE3NjM5OTYwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080', caption: 'beach party new year' },
    destinations: [
      {
        name: "Goa",
        reason: "December is the peak party season. From Christmas celebrations to New Year's Eve bashes, the atmosphere is electric. Enjoy the beaches, nightlife, and music festivals.",
        hotels: allHotels.filter(h => h.state === 'Goa').slice(0, 5),
        image: { src: "https://images.unsplash.com/photo-1747144368673-78dd0354765a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxnb2ElMjBuZXclMjB5ZWFyJTIwcGFydHl8ZW58MHx8fHwxNzYzNzIyNTYyfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "goa new year party" }
      },
      {
        name: "Rann of Kutch, Gujarat",
        reason: "The Rann Utsav is in full swing under the cool winter sky. Experience the magical white desert under the full moon, enjoy cultural programs, and shop for local handicrafts.",
        hotels: allHotels.filter(h => h.cityId === 'kutch' || h.cityId === 'bhuj'),
        image: { src: "https://images.unsplash.com/photo-1709917524188-3f442929bacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxyYW5uJTIwdXRzYXYlMjBrdXRjaHxlbnwwfHx8fDE3NjM3MjI1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "rann utsav kutch" }
      },
      {
        name: "Manali, Himachal Pradesh",
        reason: "For those who love snow, December is the time to visit Manali. The town is covered in a blanket of snow, perfect for skiing, snowboarding, and enjoying a white Christmas.",
        hotels: allHotels.filter(h => h.city === 'Manali'),
        image: { src: "https://images.unsplash.com/photo-1748745167545-89684aa5df86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzbm93ZmFsbCUyMGluJTIwbWFuYWxpfGVufDB8fHx8MTc2MzcyMjU2Mnww&ixlib=rb-4.1.0&q=80&w=1080", caption: "snowfall in manali" }
      },
      {
        name: "Alleppey (Alappuzha), Kerala",
        reason: "The weather is cool and pleasant, ideal for a relaxing houseboat cruise in the backwaters. Christmas celebrations in the region also have a unique local charm.",
        hotels: allHotels.filter(h => h.city === 'Alleppey'),
        image: { src: "https://images.unsplash.com/photo-1523130923377-84727cf0c825?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxrZXJhbGElMjBob3VzZWJvYXQlMjB3aW50ZXJ8ZW58MHx8fHwxNzYzNzIyNTYyfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "kerala houseboat winter" }
      },
      {
        name: "Jodhpur, Rajasthan",
        reason: "The pleasant winter sun is perfect for exploring the majestic Mehrangarh Fort and the blue city. The cool evenings are great for enjoying Rajasthani cuisine.",
        hotels: allHotels.filter(h => h.city === 'Jodhpur'),
        image: { src: "https://images.unsplash.com/photo-1677251486218-96798abb85a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZWhyYW5nYXJoJTIwZm9ydCUyMGpvZGhwdXJ8ZW58MHx8fHwxNzYzNjk2NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "mehrangarh fort jodhpur" }
      },
      {
        name: "Auli, Uttarakhand",
        reason: "The skiing season begins in late December. It's a winter wonderland with fresh snowfall, perfect for adventure sports and enjoying the Himalayan chill.",
        hotels: ["The Royal Village, Auli", "Himalayan High, Auli", "The Tattva, Auli", "Cliff Top Club, Auli", "Blue Poppy Resort, Auli"],
        image: { src: "https://images.unsplash.com/photo-1709882370846-7d9247dc08ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhdWxpJTIwc2tpaW5nfGVufDB8fHx8MTc2MzcyMjU2NXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "auli skiing" }
      },
      {
        name: "Gokarna, Karnataka",
        reason: "A more laid-back alternative to Goa for a beach holiday. The weather is perfect for beach hopping, trekking between beaches, and enjoying a tranquil New Year's.",
        hotels: ["SwaSwara - CGH Earth", "Kahani Paradise", "Kudle Beach View Resort", "Namaste Yoga Farm", "Zostel Gokarna"],
        image: { src: "https://images.unsplash.com/photo-1656849416642-37caee8843d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxnb2thcm5hJTIwb20lMjBiZWFjaHxlbnwwfHx8fDE3NjM3MjI1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "gokarna om beach" }
      },
      {
        name: "Konark, Odisha",
        reason: "The Konark Dance Festival often takes place in early December. The weather is ideal for exploring the magnificent Sun Temple and nearby Chandrabhaga beach.",
        hotels: ["Lotus Eco Resort", "Toshali Sands", "The Chariot Resort & Spa", "Mayfair Heritage", "Pramod Convention & Beach Resort"],
        image: { src: "https://images.unsplash.com/photo-1668587629217-7567ae4f7b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxrb25hcmssJTIwc3VuJTIwdGVtcGxlJTIwZmVzdGl2YWx8ZW58MHx8fHwxNzYzNzIyNTYyfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "konark sun temple festival" }
      },
      {
        name: "Pondicherry",
        reason: "The weather is cool and pleasant, ideal for exploring the French Quarter. The serene atmosphere of Auroville and the Christmas celebrations offer a unique experience.",
        hotels: ["Palais de Mahe - CGH Earth", "La Villa", "The Promenade", "Le Dupleix", "Villa Shanti"],
        image: { src: "https://images.unsplash.com/photo-1724161179561-e9b991c83ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwb25kaWNoZXJyeSUyMGNocmlzdG1hc3xlbnwwfHx8fDE3NjM3MjI1NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "pondicherry christmas" }
      },
      {
        name: "Tawang, Arunachal Pradesh",
        reason: "Experience a magical winter in the mountains. The landscape is covered in snow, and the Torgya festival is sometimes celebrated at the Tawang Monastery in late December or January.",
        hotels: ["Hotel Tawang Heights", "Vivanta Tawang", "Dondrub Homestay", "Hotel Gakyi Khang Zhang", "Hotel Sambala"],
        image: { src: "https://images.unsplash.com/photo-1671733437670-6af00d5afcea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0YXdhbmclMjBpbiUyMHNub3d8ZW58MHx8fHwxNzYzNzIyNTYzfDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "tawang in snow" }
      }
    ]
  }
};
