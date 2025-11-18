
import type { Hotel } from '@/lib/types';
import { hotels } from '@/lib/data';

interface MonthlyDestination {
  name: string;
  reason: string;
  hotels: string[];
  image: {
    src: string;
    caption: string;
  };
}

export interface MonthData {
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
        src: 'https://picsum.photos/seed/jan-hero/1080/200',
        caption: 'winter travel india',
    },
    destinations: [
      {
        name: "Auli, Uttarakhand",
        reason: "January transforms Auli into a premier skiing destination. The snow-covered meadows, panoramic views of the Himalayas, and the crisp mountain air make it perfect for winter sports enthusiasts and nature lovers.",
        hotels: ["The Royal Village", "Himalayan High, Auli", "The Tattva Resort"],
        image: { src: "https://picsum.photos/seed/auli-january/1200/400", caption: "snowy mountains auli" }
      },
      {
        name: "Jaipur, Rajasthan",
        reason: "The weather in January is pleasantly cool and ideal for sightseeing. You can explore majestic forts, vibrant markets, and attend the Jaipur Literature Festival, which often takes place this month.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Jaipur').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/jaipur-january/1200/400", caption: "amber fort jaipur" }
      },
      {
        name: "Goa",
        reason: "After the peak season rush of December, January in Goa is more relaxed but still vibrant. The weather is perfect for beach hopping, water sports, and enjoying the lively shacks and nightlife.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-january/1200/400", caption: "goa beach" }
      },
      {
        name: "Munnar, Kerala",
        reason: "The cool and comfortable climate of January is perfect for exploring Munnar's sprawling tea plantations. The post-monsoon greenery is at its peak, offering breathtaking landscapes.",
        hotels: ["The Fog Munnar", "Chandys Windy Woods", "KTDC Tea County"],
        image: { src: "https://picsum.photos/seed/munnar-january/1200/400", caption: "tea plantation munnar" }
      },
      {
        name: "Andaman and Nicobar Islands",
        reason: "With clear skies and calm seas, January is the best time for water activities like scuba diving and snorkeling. The pristine beaches and turquoise waters create a picture-perfect tropical paradise.",
        hotels: ["Taj Exotica Resort & Spa, Andamans", "Barefoot at Havelock", "SeaShell, Havelock"],
        image: { src: "https://picsum.photos/seed/andaman-january/1200/400", caption: "andaman beach" }
      },
      {
        name: "Delhi",
        reason: "The pleasant winter of January is ideal for exploring the historical monuments of Delhi. The month culminates with the grand Republic Day Parade on January 26th, a spectacular event to witness.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'New Delhi').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/delhi-january/1200/400", caption: "india gate delhi" }
      },
      {
        name: "Rann of Kutch, Gujarat",
        reason: "January is when the Rann Utsav is in full swing. Experience the vast white salt desert under the full moon, enjoy cultural performances, and witness the region's vibrant heritage.",
        hotels: ["The Fern Residency, Bhuj", "Regenta Resort Bhuj", "Rann Riders, Dasada"],
        image: { src: "https://picsum.photos/seed/kutch-january/1200/400", caption: "rann of kutch" }
      },
      {
        name: "Pondicherry",
        reason: "The weather is cool and perfect for exploring the charming French Quarter on foot or bicycle. The spiritual vibes of Auroville and the serene beaches make it a unique winter getaway.",
        hotels: ["Palais de Mahe - CGH Earth", "La Villa", "The Promenade"],
        image: { src: "https://picsum.photos/seed/pondy-january/1200/400", caption: "pondicherry french colony" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "Known as the 'City of Lakes', Udaipur's beauty is enhanced by the pleasant January weather. Enjoy boat rides on Lake Pichola and explore the majestic City Palace without the scorching heat.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Udaipur').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/udaipur-january/1200/400", caption: "udaipur lake palace" }
      },
      {
        name: "Khajuraho, Madhya Pradesh",
        reason: "The pleasant daytime temperatures in January are perfect for exploring the intricate and world-famous temple sculptures. The annual Khajuraho Dance Festival often begins towards the end of the month.",
        hotels: ["The Lalit Temple View Khajuraho", "Radisson Jass Khajuraho", "Ramada by Wyndham Khajuraho"],
        image: { src: "https://picsum.photos/seed/khajuraho-january/1200/400", caption: "khajuraho temple" }
      }
    ]
  },
  february: {
    name: 'February',
    slug: 'february',
    pageImage: { src: 'https://picsum.photos/seed/feb-hero/1080/200', caption: 'spring flowers festival' },
    destinations: [
      {
        name: "Jaisalmer, Rajasthan",
        reason: "Attend the vibrant Desert Festival, showcasing Rajasthani culture with folk dances, music, and camel races. The weather is perfect for desert safaris and exploring the golden fort.",
        hotels: ["Suryagarh Jaisalmer", "Jaisalmer Marriott Resort & Spa", "Hotel Rang Mahal"],
        image: { src: "https://picsum.photos/seed/jaisalmer-feb/1200/400", caption: "jaisalmer fort" }
      },
      {
        name: "Nashik, Maharashtra",
        reason: "February is the time for SulaFest, a popular gourmet world music festival. Enjoy wine tasting at various vineyards in India's wine capital with pleasant weather as your companion.",
        hotels: ["The Source at Sula", "Radisson Blu Hotel & Spa, Nashik", "Ginger Nashik"],
        image: { src: "https://picsum.photos/seed/nashik-feb/1200/400", caption: "vineyard nashik" }
      },
      {
        name: "Varanasi, Uttar Pradesh",
        reason: "Experience the spiritual fervor of Maha Shivaratri, which often falls in February. The city's ghats and temples come alive with prayers, rituals, and processions.",
        hotels: ["BrijRama Palace", "Taj Ganges, Varanasi", "The Clarks, Varanasi"],
        image: { src: "https://picsum.photos/seed/varanasi-feb/1200/400", caption: "varanasi ghats" }
      },
      {
        name: "Kaziranga National Park, Assam",
        reason: "The dry season offers the best chances for wildlife sightings, especially the one-horned rhinoceros. The pleasant weather makes jeep safaris and elephant rides more enjoyable.",
        hotels: ["Diphlu River Lodge", "IORA - The Retreat", "Borgos Resort"],
        image: { src: "https://picsum.photos/seed/kaziranga-feb/1200/400", caption: "one-horned rhinoceros" }
      },
      {
        name: "Agra, Uttar Pradesh",
        reason: "Visit during the Taj Mahotsav, a 10-day cultural festival celebrating arts, crafts, and cuisines of India, with the magnificent Taj Mahal as the backdrop.",
        hotels: ["The Oberoi Amarvilas", "ITC Mughal", "Taj Hotel & Convention Centre Agra"],
        image: { src: "https://picsum.photos/seed/agra-feb/1200/400", caption: "taj mahal agra" }
      }
    ]
  },
  march: {
    name: 'March',
    slug: 'march',
    pageImage: { src: 'https://picsum.photos/seed/mar-hero/1080/200', caption: 'holi festival colors' },
    destinations: [
      {
        name: "Vrindavan & Mathura, Uttar Pradesh",
        reason: "Experience the unique and vibrant celebrations of Holi. From Lathmar Holi in Barsana to the flower-filled Phoolon ki Holi in Vrindavan, it's a spectacle of colors and traditions.",
        hotels: ["Nidhivan Sarovar Portico", "The Radha Ashok", "Hotel Brijwasi Royal"],
        image: { src: "https://picsum.photos/seed/vrindavan-mar/1200/400", caption: "holi festival vrindavan" }
      },
      {
        name: "Rishikesh, Uttarakhand",
        reason: "The weather is perfect for yoga, meditation, and adventure sports like white-water rafting before the summer heat sets in. The International Yoga Festival is also held in March.",
        hotels: ["Ananda in the Himalayas", "The Roseate Ganges", "Aloha on the Ganges"],
        image: { src: "https://picsum.photos/seed/rishikesh-mar/1200/400", caption: "rishikesh bridge" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "Explore the ancient ruins and stunning landscapes of this UNESCO World Heritage site in pleasant weather, before the scorching summer begins.",
        hotels: ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort"],
        image: { src: "https://picsum.photos/seed/hampi-mar/1200/400", caption: "hampi ruins" }
      },
      {
        name: "Shillong, Meghalaya",
        reason: "The spring season brings pleasant weather, making it ideal to explore the 'Scotland of the East'. The hills are lush green, and waterfalls like Elephant Falls are beautiful.",
        hotels: ["Ri Kynjai", "Hotel Polo Towers Shillong", "The Eee Cee Hotel"],
        image: { src: "https://picsum.photos/seed/shillong-mar/1200/400", caption: "shillong landscape" }
      },
      {
        name: "Wayanad, Kerala",
        reason: "Enjoy the cool and pleasant climate to explore Wayanad's natural beauty, including Chembra Peak, Edakkal Caves, and serene waterfalls, before the onset of the summer heat.",
        hotels: ["Vythiri Resort", "Banasura Hill Resort", "The Windflower Resort & Spa"],
        image: { src: "https://picsum.photos/seed/wayanad-mar/1200/400", caption: "wayanad hills" }
      }
    ]
  },
  april: {
      name: 'April',
      slug: 'april',
      pageImage: { src: 'https://picsum.photos/seed/apr-hero/1080/200', caption: 'himalayan mountains spring' },
      destinations: [
        {
            name: "Srinagar, Kashmir",
            reason: "Visit during the Tulip Festival at Asia's largest tulip garden. The valley is in full bloom, with pleasant weather perfect for shikara rides on Dal Lake and exploring Mughal gardens.",
            hotels: ["The Lalit Grand Palace", "Vivanta Dal View", "Four Points by Sheraton Srinagar"],
            image: { src: "https://picsum.photos/seed/srinagar-apr/1200/400", caption: "srinagar tulip garden" }
        },
        {
            name: "Darjeeling, West Bengal",
            reason: "The weather is clear, offering stunning views of Kanchenjunga. It's the 'first flush' season, perfect for tasting the world-renowned Darjeeling tea right from the estates.",
            hotels: ["Mayfair Darjeeling", "Windamere Hotel", "Elgin Darjeeling"],
            image: { src: "https://picsum.photos/seed/darjeeling-apr/1200/400", caption: "darjeeling tea plantation" }
        },
        {
            name: "Kodaikanal, Tamil Nadu",
            reason: "Escape the heat of the plains in this 'Princess of Hill Stations'. The weather is pleasant, ideal for boating in the star-shaped lake, cycling, and trekking.",
            hotels: ["The Carlton Kodaikanal", "Sterling Kodai Lake", "Kodai Resort Hotel"],
            image: { src: "https://picsum.photos/seed/kodaikanal-apr/1200/400", caption: "kodaikanal lake" }
        },
        {
            name: "Pachmarhi, Madhya Pradesh",
            reason: "Known as the 'Queen of Satpura', this hill station is a cool retreat. Explore its waterfalls, ancient caves, and dense forests in pleasant pre-summer weather.",
            hotels: ["Welcomheritage Golf View", "MPT Amaltas", "Pachmarhi"],
            image: { src: "https://picsum.photos/seed/pachmarhi-apr/1200/400", caption: "pachmarhi waterfall" }
        },
        {
            name: "Ooty, Tamil Nadu",
            reason: "The 'Queen of Nilgiris' is in full bloom. Visit the Government Botanical Garden for its annual flower show and enjoy the pleasant climate and scenic toy train rides.",
            hotels: ["Taj Savoy Hotel", "Sterling Ooty Fern Hill", "Gem Park Ooty"],
            image: { src: "https://picsum.photos/seed/ooty-apr/1200/400", caption: "ooty botanical garden" }
        }
      ]
  },
  may: {
      name: 'May',
      slug: 'may',
      pageImage: { src: 'https://picsum.photos/seed/may-hero/1080/200', caption: 'cool mountain valley' },
      destinations: [
        {
            name: "Shimla, Himachal Pradesh",
            reason: "Escape the scorching summer heat of the plains. Shimla offers a cool climate, colonial architecture, and stunning Himalayan views. The Mall Road is perfect for evening strolls.",
            hotels: ["The Oberoi Cecil", "Wildflower Hall, An Oberoi Resort", "Radisson Jass Shimla"],
            image: { src: "https://picsum.photos/seed/shimla-may/1200/400", caption: "shimla town view" }
        },
        {
            name: "Manali, Himachal Pradesh",
            reason: "A haven for adventure seekers. With pleasant weather, it's the perfect time for paragliding in Solang Valley, trekking, and visiting Rohtang Pass as it opens up.",
            hotels: ["The Himalayan", "Manuallaya - The Resort Spa", "Span Resort & Spa"],
            image: { src: "https://picsum.photos/seed/manali-may/1200/400", caption: "manali valley" }
        },
        {
            name: "Mount Abu, Rajasthan",
            reason: "The only hill station in Rajasthan, it provides a cool respite from the desert heat. Enjoy boating in Nakki Lake and visit the intricately carved Dilwara Temples.",
            hotels: ["Hotel Hillock", "Cama Rajputana Club Resort", "Hotel Toppers Corner"],
            image: { src: "https://picsum.photos/seed/mountabu-may/1200/400", caption: "nakki lake mount abu" }
        },
        {
            name: "Spiti Valley, Himachal Pradesh",
            reason: "May marks the beginning of the tourist season as roads open. The stark, high-altitude desert landscape is breathtaking. Visit ancient monasteries and remote villages.",
            hotels: ["Hotel Deyzor", "Sakya Abode", "Grand Dewachen"],
            image: { src: "https://picsum.photos/seed/spiti-may/1200/400", caption: "spiti valley monastery" }
        },
        {
            name: "Bir Billing, Himachal Pradesh",
            reason: "Recognized as one of the best paragliding sites in the world. The thermal currents are ideal in May, offering long and scenic flights over the Kangra Valley.",
            hotels: ["Colonel's Resort", "The Sky Village", "Bir High"],
            image: { src: "https://picsum.photos/seed/birbilling-may/1200/400", caption: "paragliding bir billing" }
        }
      ]
  },
  june: {
    name: 'June',
    slug: 'june',
    pageImage: { src: 'https://picsum.photos/seed/jun-hero/1080/200', caption: 'ladakh mountain pass' },
    destinations: [
      {
        name: "Ladakh, Jammu & Kashmir",
        reason: "June is the best time to visit Ladakh. The snow has melted, all passes and roads are open, and the weather is perfect for exploring monasteries, high-altitude lakes like Pangong Tso, and dramatic landscapes.",
        hotels: ["The Grand Dragon Ladakh", "Stok Palace Heritage", "Ladakh Sarai Resort"],
        image: { src: "https://picsum.photos/seed/ladakh-june/1200/400", caption: "pangong lake ladakh" }
      },
      {
        name: "Coorg, Karnataka",
        reason: "The onset of monsoon transforms Coorg into a lush green paradise. Enjoy the mist-laden coffee plantations, gushing waterfalls like Abbey Falls, and the aroma of fresh coffee.",
        hotels: ["Evolve Back, Coorg", "The Tamara Coorg", "Taj Madikeri Resort & Spa"],
        image: { src: "https://picsum.photos/seed/coorg-june/1200/400", caption: "coorg coffee plantation" }
      },
      {
        name: "Malshej Ghat, Maharashtra",
        reason: "A mountain pass that comes alive during the monsoon. It's a paradise for nature lovers, with numerous waterfalls, lush green hillsides, and misty clouds covering the landscape.",
        hotels: ["Saj By The Lake", "MTDC Malshej Ghat", "The Regenta MPS"],
        image: { src: "https://picsum.photos/seed/malshej-june/1200/400", caption: "malshej ghat waterfall" }
      },
      {
        name: "Sikkim",
        reason: "Visit before the heavy monsoon sets in. The weather is pleasant, and the rhododendrons are still in bloom at higher altitudes. It's great for sightseeing in Gangtok and Pelling.",
        hotels: ["Mayfair Spa Resort & Casino", "The Elgin Mount Pandim", "Tashiling Residency Hotel & Spa"],
        image: { src: "https://picsum.photos/seed/sikkim-june/1200/400", caption: "sikkim mountains" }
      },
      {
        name: "Valley of Flowers, Uttarakhand",
        reason: "The Valley of Flowers National Park, a UNESCO World Heritage Site, opens in June. The valley starts to get carpeted with a vibrant array of alpine flowers.",
        hotels: ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode"],
        image: { src: "https://picsum.photos/seed/valley-flowers-june/1200/400", caption: "valley of flowers" }
      }
    ]
  },
  july: {
    name: 'July',
    slug: 'july',
    pageImage: { src: 'https://picsum.photos/seed/jul-hero/1080/200', caption: 'monsoon kerala backwaters' },
    destinations: [
      {
        name: "Munnar, Kerala",
        reason: "The monsoons bring a magical charm to Munnar. The tea gardens are washed clean and look vibrant green. It's a perfect time for those who enjoy rain and lush landscapes.",
        hotels: ["The Fog Munnar", "Chandys Windy Woods", "KTDC Tea County"],
        image: { src: "https://picsum.photos/seed/munnar-july/1200/400", caption: "monsoon in munnar" }
      },
      {
        name: "Goa",
        reason: "Experience the 'other side' of Goa. The monsoon season means fewer crowds, lush green scenery, and overflowing waterfalls like Dudhsagar. It's ideal for a peaceful, romantic getaway.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-july/1200/400", caption: "dudhsagar falls goa" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "The city of lakes becomes even more enchanting with the arrival of monsoons. The lakes fill up, the temperature drops, and the Aravalli hills turn green. Enjoy the romantic boat rides.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Udaipur').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/udaipur-july/1200/400", caption: "monsoon palace udaipur" }
      },
      {
        name: "Lonavala, Maharashtra",
        reason: "A popular monsoon destination near Mumbai and Pune. The hills are covered in a green blanket, and attractions like Bhushi Dam and Tiger Point are at their scenic best.",
        hotels: ["Fariyas Resort Lonavala", "The Machan", "Della Resorts"],
        image: { src: "https://picsum.photos/seed/lonavala-july/1200/400", caption: "lonavala misty hills" }
      },
      {
        name: "Orchha, Madhya Pradesh",
        reason: "The historical town of Orchha, with its magnificent palaces and temples, looks stunning against the grey monsoon sky. The Betwa river flows in full force, adding to the beauty.",
        hotels: ["Amar Mahal Orchha", "Sheesh Mahal Orchha", "Bundelkhand Riverside"],
        image: { src: "https://picsum.photos/seed/orchha-july/1200/400", caption: "orchha cenotaphs" }
      }
    ]
  },
  august: {
    name: 'August',
    slug: 'august',
    pageImage: { src: 'https://picsum.photos/seed/aug-hero/1080/200', caption: 'flower valley monsoon' },
    destinations: [
      {
        name: "Valley of Flowers, Uttarakhand",
        reason: "August is the peak blooming season. The entire valley is a riot of colors with over 300 species of alpine flowers in full bloom. A trekker's paradise.",
        hotels: ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode"],
        image: { src: "https://picsum.photos/seed/valley-flowers-aug/1200/400", caption: "flowers in bloom" }
      },
      {
        name: "Alleppey (Alappuzha), Kerala",
        reason: "Witness the spectacular Nehru Trophy Snake Boat Race, held on the second Saturday of August. The backwaters are lush and rejuvenated after the rains.",
        hotels: ["Punnamada Resort", "Lake Palace Resort", "Marari Beach Resort"],
        image: { src: "https://picsum.photos/seed/alleppey-aug/1200/400", caption: "kerala snake boat race" }
      },
      {
        name: "Cherrapunji, Meghalaya",
        reason: "Experience the monsoons in one of the wettest places on earth. The waterfalls are thunderous, and the landscape is an intense, vivid green. A must for rain lovers.",
        hotels: ["Polo Orchid Resort", "Jiva Resort", "Saimika Resort"],
        image: { src: "https://picsum.photos/seed/cherrapunji-aug/1200/400", caption: "cherrapunji living root bridge" }
      },
      {
        name: "Kanyakumari, Tamil Nadu",
        reason: "The monsoons provide a dramatic backdrop to the confluence of the three seas. The sky is often painted with beautiful colors during sunrise and sunset.",
        hotels: ["The Gopinivas Grand", "Hotel Seaface", "Sparsa Kanyakumari"],
        image: { src: "https://picsum.photos/seed/kanyakumari-aug/1200/400", caption: "kanyakumari vivekananda rock" }
      },
      {
        name: "Delhi",
        reason: "Experience the patriotic fervor of Independence Day on August 15th at the Red Fort. The weather is relatively cooler after the monsoon showers, making it good for sightseeing.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'New Delhi').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/delhi-aug/1200/400", caption: "red fort delhi" }
      }
    ]
  },
  september: {
    name: 'September',
    slug: 'september',
    pageImage: { src: 'https://picsum.photos/seed/sep-hero/1080/200', caption: 'post-monsoon green hills' },
    destinations: [
      {
        name: "Ziro Valley, Arunachal Pradesh",
        reason: "Attend the Ziro Festival of Music, a unique outdoor music festival set against the stunning backdrop of rice fields. The post-monsoon weather is pleasant and the valley is lush green.",
        hotels: ["Ziro Valley Resort", "Siiro Resort", "Kite-A-Naki"],
        image: { src: "https://picsum.photos/seed/ziro-sep/1200/400", caption: "ziro valley rice fields" }
      },
      {
        name: "Lachen, Sikkim",
        reason: "As the monsoon recedes, the skies clear up, offering breathtaking views of the Himalayas. Gurudongmar Lake is accessible and looks stunning in this season.",
        hotels: ["The Apple Orchard Resort", "Jain Group Hotel Sonam Palgey", "Yarlam"],
        image: { src: "https://picsum.photos/seed/lachen-sep/1200/400", caption: "gurudongmar lake sikkim" }
      },
      {
        name: "Mahabaleshwar, Maharashtra",
        reason: "The landscape is vibrant and green after the rains. Waterfalls are still full, and it's the perfect time for boating in Venna Lake and enjoying the panoramic views.",
        hotels: ["Le Meridien Mahabaleshwar", "Evershine Keys Prima Resort", "Brightland Resort & Spa"],
        image: { src: "https://picsum.photos/seed/mahabaleshwar-sep/1200/400", caption: "venna lake mahabaleshwar" }
      },
      {
        name: "Amritsar, Punjab",
        reason: "The weather becomes pleasant after the monsoon. It's a great time to visit the Golden Temple and witness the patriotic Beating Retreat ceremony at the Wagah Border.",
        hotels: ["Hyatt Regency Amritsar", "Taj Swarna Amritsar", "Ramada by Wyndham Amritsar"],
        image: { src: "https://picsum.photos/seed/amritsar-sep/1200/400", caption: "golden temple amritsar" }
      },
      {
        name: "Mumbai, Maharashtra",
        reason: "Experience the grand celebrations of Ganesh Chaturthi. The city is filled with artistic pandals and massive idols, culminating in an energetic immersion procession.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Mumbai').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/mumbai-sep/1200/400", caption: "ganesh chaturthi mumbai" }
      }
    ]
  },
  october: {
    name: 'October',
    slug: 'october',
    pageImage: { src: 'https://picsum.photos/seed/oct-hero/1080/200', caption: 'dussehra festival celebration' },
    destinations: [
      {
        name: "Kolkata, West Bengal",
        reason: "Immerse yourself in the grand festivities of Durga Puja. The city turns into a massive art gallery with beautifully crafted pandals and idols, accompanied by delicious food.",
        hotels: ["The Oberoi Grand", "Taj Bengal", "ITC Sonar"],
        image: { src: "https://picsum.photos/seed/kolkata-oct/1200/400", caption: "durga puja kolkata" }
      },
      {
        name: "Mysore, Karnataka",
        reason: "Witness the royal splendor of Dasara celebrations. The Mysore Palace is magnificently illuminated, and the Jumboo Savari (elephant procession) is a grand spectacle.",
        hotels: ["Radisson Blu Plaza Hotel Mysore", "Grand Mercure Mysore", "Fortune JP Palace"],
        image: { src: "https://picsum.photos/seed/mysore-oct/1200/400", caption: "mysore palace dasara" }
      },
      {
        name: "Bandhavgarh National Park, Madhya Pradesh",
        reason: "The park reopens after the monsoon. The forest is lush, and the chances of spotting tigers and other wildlife are high as they come out to the waterholes.",
        hotels: ["Syna Tiger Resort", "Mahua Kothi, A Taj Safari", "Samode Safari Lodge"],
        image: { src: "https://picsum.photos/seed/bandhavgarh-oct/1200/400", caption: "tiger in bandhavgarh" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "The weather is dry and pleasant, perfect for exploring the vast UNESCO World Heritage site on foot or by bicycle. The post-monsoon landscape is still green.",
        hotels: ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort"],
        image: { src: "https://picsum.photos/seed/hampi-oct/1200/400", caption: "hampi stone chariot" }
      },
      {
        name: "Pachmarhi, Madhya Pradesh",
        reason: "The 'Queen of Satpura' is at its scenic best with lush greenery and active waterfalls after the rains. The pleasant weather is ideal for trekking and sightseeing.",
        hotels: ["Welcomheritage Golf View", "MPT Amaltas", "Pachmarhi"],
        image: { src: "https://picsum.photos/seed/pachmarhi-oct/1200/400", caption: "pachmarhi landscape" }
      }
    ]
  },
  november: {
    name: 'November',
    slug: 'november',
    pageImage: { src: 'https://picsum.photos/seed/nov-hero/1080/200', caption: 'diwali lights festival' },
    destinations: [
      {
        name: "Varanasi, Uttar Pradesh",
        reason: "Witness the ethereal beauty of Dev Deepawali, when thousands of diyas (earthen lamps) are lit on the ghats of the Ganges. It's a truly magical and spiritual experience.",
        hotels: ["BrijRama Palace", "Taj Ganges, Varanasi", "The Clarks, Varanasi"],
        image: { src: "https://picsum.photos/seed/varanasi-nov/1200/400", caption: "dev deepawali varanasi" }
      },
      {
        name: "Pushkar, Rajasthan",
        reason: "Experience the world's largest camel fair, the Pushkar Mela. It's a vibrant spectacle of culture, trade, and traditions, with competitions, folk performances, and hot air ballooning.",
        hotels: ["The Westin Pushkar Resort & Spa", "Ananta Spa & Resorts", "Pratap Mahal, Ajmer"],
        image: { src: "https://picsum.photos/seed/pushkar-nov/1200/400", caption: "pushkar camel fair" }
      },
      {
        name: "Sundarbans, West Bengal",
        reason: "The pleasant weather is ideal for exploring the world's largest mangrove forest. It's the best time for boat safaris to spot the elusive Royal Bengal Tiger and other wildlife.",
        hotels: ["Sundarban Tiger Camp", "Sunderban Jungle Mahal", "Royal Bengal Resort"],
        image: { src: "https://picsum.photos/seed/sundarbans-nov/1200/400", caption: "sundarbans mangrove forest" }
      },
      {
        name: "Goa",
        reason: "November marks the beginning of the tourist season. The weather is perfect, the shacks are open, and the vibe is energetic, but it's less crowded than December.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-nov/1200/400", caption: "goa beach shack" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "The weather is perfect for exploring the ruins. The Hampi Utsav, a grand cultural festival, is sometimes held in November, bringing the ancient city to life with music and dance.",
        hotels: ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort"],
        image: { src: "https://picsum.photos/seed/hampi-nov/1200/400", caption: "hampi festival" }
      }
    ]
  },
  december: {
    name: 'December',
    slug: 'december',
    pageImage: { src: 'https://picsum.photos/seed/dec-hero/1080/200', caption: 'beach party new year' },
    destinations: [
      {
        name: "Goa",
        reason: "December is the peak party season. From Christmas celebrations to New Year's Eve bashes, the atmosphere is electric. Enjoy the beaches, nightlife, and music festivals.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').map(h => h.name).slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-dec/1200/400", caption: "goa new year party" }
      },
      {
        name: "Rann of Kutch, Gujarat",
        reason: "The Rann Utsav is in full swing under the cool winter sky. Experience the magical white desert under the full moon, enjoy cultural programs, and shop for local handicrafts.",
        hotels: ["The Fern Residency, Bhuj", "Regenta Resort Bhuj", "Rann Riders, Dasada"],
        image: { src: "https://picsum.photos/seed/kutch-dec/1200/400", caption: "rann utsav kutch" }
      },
      {
        name: "Manali, Himachal Pradesh",
        reason: "For those who love snow, December is the time to visit Manali. The town is covered in a blanket of snow, perfect for skiing, snowboarding, and enjoying a white Christmas.",
        hotels: ["The Himalayan", "Manuallaya - The Resort Spa", "Span Resort & Spa"],
        image: { src: "https://picsum.photos/seed/manali-dec/1200/400", caption: "snowfall in manali" }
      },
      {
        name: "Alleppey (Alappuzha), Kerala",
        reason: "The weather is cool and pleasant, ideal for a relaxing houseboat cruise in the backwaters. Christmas celebrations in the region also have a unique local charm.",
        hotels: ["Punnamada Resort", "Lake Palace Resort", "Marari Beach Resort"],
        image: { src: "https://picsum.photos/seed/alleppey-dec/1200/400", caption: "kerala houseboat winter" }
      },
      {
        name: "Jodhpur, Rajasthan",
        reason: "The pleasant winter sun is perfect for exploring the majestic Mehrangarh Fort and the blue city. The Rajasthan International Folk Festival (RIFF) sometimes extends into December.",
        hotels: ["Umaid Bhawan Palace", "RAAS Jodhpur", "Taj Hari Mahal Jodhpur"],
        image: { src: "https://picsum.photos/seed/jodhpur-dec/1200/400", caption: "mehrangarh fort jodhpur" }
      }
    ]
  }
};
