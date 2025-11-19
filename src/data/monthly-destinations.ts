
import type { Hotel } from '@/lib/types';
import { hotels } from '@/lib/data';

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
        hotels: (hotels as Hotel[]).filter(h => ["The Royal Village", "Himalayan High, Auli", "The Tattva Resort", "Cliff Top Club", "Blue Poppy Resorts"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/auli-january/1200/400", caption: "snowy mountains auli" }
      },
      {
        name: "Jaipur, Rajasthan",
        reason: "The weather in January is pleasantly cool and ideal for sightseeing. You can explore majestic forts, vibrant markets, and attend the Jaipur Literature Festival, which often takes place this month.",
        hotels: (hotels as Hotel[]).filter(h => h.cityId === 'jaipur'),
        image: { src: "https://picsum.photos/seed/jaipur-january/1200/400", caption: "amber fort jaipur" }
      },
      {
        name: "Goa",
        reason: "After the peak season rush of December, January in Goa is more relaxed but still vibrant. The weather is perfect for beach hopping, water sports, and enjoying the lively shacks and nightlife.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-january/1200/400", caption: "goa beach" }
      },
      {
        name: "Munnar, Kerala",
        reason: "The cool and comfortable climate of January is perfect for exploring Munnar's sprawling tea plantations. The post-monsoon greenery is at its peak, offering breathtaking landscapes.",
        hotels: (hotels as Hotel[]).filter(h => ["The Fog Munnar", "Chandys Windy Woods", "KTDC Tea County", "Parakkat Nature Resort", "Amber Dale Luxury Hotel"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/munnar-january/1200/400", caption: "tea plantation munnar" }
      },
      {
        name: "Andaman and Nicobar Islands",
        reason: "With clear skies and calm seas, January is the best time for water activities like scuba diving and snorkeling. The pristine beaches and turquoise waters create a picture-perfect tropical paradise.",
        hotels: (hotels as Hotel[]).filter(h => ["Taj Exotica Resort & Spa, Andamans", "Barefoot at Havelock", "SeaShell, Havelock", "Munjoh Ocean Resort", "Silver Sand Beach Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/andaman-january/1200/400", caption: "andaman beach" }
      },
      {
        name: "Delhi",
        reason: "The pleasant winter of January is ideal for exploring the historical monuments of Delhi. The month culminates with the grand Republic Day Parade on January 26th, a spectacular event to witness.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'New Delhi').slice(0, 10),
        image: { src: "https://picsum.photos/seed/delhi-january/1200/400", caption: "india gate delhi" }
      },
      {
        name: "Rann of Kutch, Gujarat",
        reason: "January is when the Rann Utsav is in full swing. Experience the vast white salt desert under the full moon, enjoy cultural performances, and witness the region's vibrant heritage.",
        hotels: (hotels as Hotel[]).filter(h => h.cityId === 'kutch' || h.cityId === 'bhuj'),
        image: { src: "https://picsum.photos/seed/kutch-january/1200/400", caption: "rann of kutch" }
      },
      {
        name: "Pondicherry",
        reason: "The weather is cool and perfect for exploring the charming French Quarter on foot or by bicycle. The spiritual vibes of Auroville and the serene beaches make it a unique winter getaway.",
        hotels: (hotels as Hotel[]).filter(h => ["Palais de Mahe - CGH Earth", "La Villa", "The Promenade", "Le Dupleix", "Villa Shanti"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/pondy-january/1200/400", caption: "pondicherry french colony" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "Known as the 'City of Lakes', Udaipur's beauty is enhanced by the pleasant January weather. Enjoy boat rides on Lake Pichola and explore the majestic City Palace without the scorching heat.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Udaipur').slice(0, 10),
        image: { src: "https://picsum.photos/seed/udaipur-january/1200/400", caption: "udaipur lake palace" }
      },
      {
        name: "Khajuraho, Madhya Pradesh",
        reason: "The pleasant daytime temperatures in January are perfect for exploring the intricate and world-famous temple sculptures. The annual Khajuraho Dance Festival often begins towards the end of the month.",
        hotels: (hotels as Hotel[]).filter(h => h.cityId === 'khajuraho'),
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
        hotels: (hotels as Hotel[]).filter(h => ["Suryagarh Jaisalmer", "Jaisalmer Marriott Resort & Spa", "Hotel Rang Mahal", "Fort Rajwada", "The Gulaal"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/jaisalmer-feb/1200/400", caption: "jaisalmer fort" }
      },
      {
        name: "Nashik, Maharashtra",
        reason: "February is the time for SulaFest, a popular gourmet world music festival. Enjoy wine tasting at various vineyards in India's wine capital with pleasant weather as your companion.",
        hotels: (hotels as Hotel[]).filter(h => ["The Source at Sula", "Radisson Blu Hotel & Spa, Nashik", "Ginger Nashik", "Ibis Nashik", "Courtyard by Marriott Nashik"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/nashik-feb/1200/400", caption: "vineyard nashik" }
      },
      {
        name: "Varanasi, Uttar Pradesh",
        reason: "Experience the spiritual fervor of Maha Shivaratri, which often falls in February. The city's ghats and temples come alive with prayers, rituals, and processions.",
        hotels: (hotels as Hotel[]).filter(h => ["BrijRama Palace", "Taj Ganges, Varanasi", "The Clarks, Varanasi", "Hotel Madin", "Ramada Plaza by Wyndham JHV Varanasi"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/varanasi-feb/1200/400", caption: "varanasi ghats" }
      },
      {
        name: "Kaziranga National Park, Assam",
        reason: "The dry season offers the best chances for wildlife sightings, especially the one-horned rhinoceros. The pleasant weather makes jeep safaris and elephant rides more enjoyable.",
        hotels: (hotels as Hotel[]).filter(h => ["Diphlu River Lodge", "IORA - The Retreat", "Borgos Resort", "Landmark Woods", "Infinity Resorts Kaziranga"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/kaziranga-feb/1200/400", caption: "one-horned rhinoceros" }
      },
      {
        name: "Agra, Uttar Pradesh",
        reason: "Visit during the Taj Mahotsav, a 10-day cultural festival celebrating arts, crafts, and cuisines of India, with the magnificent Taj Mahal as the backdrop.",
        hotels: (hotels as Hotel[]).filter(h => ["The Oberoi Amarvilas, Agra", "ITC Mughal, Agra", "Taj Hotel & Convention Centre, Agra", "Courtyard by Marriott Agra", "Trident, Agra"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/agra-feb/1200/400", caption: "taj mahal agra" }
      },
      {
        name: "Andaman and Nicobar Islands",
        reason: "The weather remains perfect for water sports and beach exploration. It's slightly less crowded than January, offering a more serene experience.",
        hotels: (hotels as Hotel[]).filter(h => ["Taj Exotica Resort & Spa, Andamans", "Barefoot at Havelock", "SeaShell, Havelock", "Munjoh Ocean Resort", "Silver Sand Beach Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/andaman-feb/1200/400", caption: "andaman scuba diving" }
      },
      {
        name: "Goa",
        reason: "The famous Goa Carnival usually takes place in February, filling the streets with colorful parades, music, and dancing. It's a unique cultural experience.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-carnival-feb/1200/400", caption: "goa carnival" }
      },
      {
        name: "Puri, Odisha",
        reason: "Attend the Konark Dance Festival held at the magnificent Konark Sun Temple, a short drive from Puri. The weather is pleasant for visiting the Jagannath Temple and beaches.",
        hotels: (hotels as Hotel[]).filter(h => ["Mayfair Heritage", "Pramod Convention & Beach Resort", "The Chariot Resort & Spa", "Sterling Puri", "Toshali Sands"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/puri-feb/1200/400", caption: "konark sun temple" }
      },
      {
        name: "Thekkady, Kerala",
        reason: "The weather is very pleasant for boating on Periyar Lake and spotting wildlife. It's a great time for trekking and exploring the spice plantations.",
        hotels: (hotels as Hotel[]).filter(h => ["Spice Village - CGH Earth", "The Elephant Court", "Cardamom County", "Poetree Sarovar Portico", "Amritara Shalimar Spice Garden"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/thekkady-feb/1200/400", caption: "periyar lake thekkady" }
      },
      {
        name: "Kolkata, West Bengal",
        reason: "The weather is cool and pleasant, ideal for sightseeing. It's also the time for the Kolkata International Book Fair, a paradise for literature lovers.",
        hotels: (hotels as Hotel[]).filter(h => ["The Oberoi Grand, Kolkata", "Taj Bengal", "ITC Sonar", "Hyatt Regency Kolkata", "The Park Kolkata"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/kolkata-feb/1200/400", caption: "victoria memorial kolkata" }
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
        hotels: (hotels as Hotel[]).filter(h => ["Nidhivan Sarovar Portico, Vrindavan", "The Radha Ashok", "Hotel Brijwasi Royal", "Krishna Residency", "Anandam Clarks Inn Suites"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/vrindavan-mar/1200/400", caption: "holi festival vrindavan" }
      },
      {
        name: "Rishikesh, Uttarakhand",
        reason: "The weather is perfect for yoga, meditation, and adventure sports like white-water rafting before the summer heat sets in. The International Yoga Festival is also held in March.",
        hotels: (hotels as Hotel[]).filter(h => ["The Westin Resort & Spa, Himalayas", "The Roseate Ganges", "Aloha on the Ganges", "Taj Rishikesh Resort & Spa, Uttarakhand", "EllBee Ganga View"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/rishikesh-mar/1200/400", caption: "rishikesh bridge" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "Explore the ancient ruins and stunning landscapes of this UNESCO World Heritage site in pleasant weather, before the scorching summer begins.",
        hotels: (hotels as Hotel[]).filter(h => ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort", "Heritage Resort Hampi", "Kishkinda Heritage Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/hampi-mar/1200/400", caption: "hampi ruins" }
      },
      {
        name: "Shillong, Meghalaya",
        reason: "The spring season brings pleasant weather, making it ideal to explore the 'Scotland of the East'. The hills are lush green, and waterfalls like Elephant Falls are beautiful.",
        hotels: (hotels as Hotel[]).filter(h => ["Ri Kynjai", "Hotel Polo Towers Shillong", "The Eee Cee Hotel", "Cafe Shillong Bed & Breakfast", "Aerodene Cottage"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/shillong-mar/1200/400", caption: "shillong landscape" }
      },
      {
        name: "Wayanad, Kerala",
        reason: "Enjoy the cool and pleasant climate to explore Wayanad's natural beauty, including Chembra Peak, Edakkal Caves, and serene waterfalls, before the onset of the summer heat.",
        hotels: (hotels as Hotel[]).filter(h => ["Vythiri Resort", "Banasura Hill Resort", "The Windflower Resort & Spa", "Pepper Trail", "Vythiri Village Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/wayanad-mar/1200/400", caption: "wayanad hills" }
      },
       {
        name: "Coorg, Karnataka",
        reason: "The weather is pleasant, perfect for coffee plantation tours and trekking. The air is fragrant with the scent of coffee blossoms.",
        hotels: (hotels as Hotel[]).filter(h => ["Evolve Back, Coorg", "The Tamara Coorg", "Taj Madikeri Resort & Spa", "Coorg Wilderness Resort", "Old Kent Estates"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/coorg-mar/1200/400", caption: "coorg coffee blossoms" }
      },
      {
        name: "Amritsar, Punjab",
        reason: "The weather is comfortable for visiting the Golden Temple and Jallianwala Bagh. The harvest festival of Baisakhi preparations begin, adding a cultural flavor.",
        hotels: (hotels as Hotel[]).filter(h => ["Hyatt Regency Amritsar", "Taj Swarna Amritsar", "Ramada by Wyndham Amritsar", "Fairfield by Marriott Amritsar", "Holiday Inn Amritsar"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/amritsar-mar/1200/400", caption: "golden temple morning" }
      },
      {
        name: "Tawang, Arunachal Pradesh",
        reason: "March offers clear skies and breathtaking views of the snow-capped Himalayas. It's a great time to visit the Tawang Monastery before the monsoon season.",
        hotels: (hotels as Hotel[]).filter(h => ["Hotel Tawang Heights", "Vivanta Tawang", "Dondrub Homestay", "Hotel Gakyi Khang Zhang", "Hotel Sambala"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/tawang-mar/1200/400", caption: "tawang monastery" }
      },
      {
        name: "Velneshwar, Maharashtra",
        reason: "A quiet beach destination ideal for a peaceful getaway. The Velneshwar Temple fair, celebrating Maha Shivaratri, often falls in early March.",
        hotels: (hotels as Hotel[]).filter(h => ["Kinara Beach Resort", "The Beach House", "Vatsalya Resort", "Regency Resort", "MTDC Resort, Velneshwar"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/velneshwar-mar/1200/400", caption: "velneshwar beach" }
      },
      {
        name: "Nagpur, Maharashtra",
        reason: "March is the time for Ram Navami celebrations, and Nagpur's Poddareshwar Ram Mandir has one of the grandest processions (Shobha Yatra) in India.",
        hotels: (hotels as Hotel[]).filter(h => ["Le Méridien Nagpur", "Radisson Blu Hotel Nagpur", "The Pride Hotel Nagpur", "Tuli Imperial", "Hotel Centre Point"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/nagpur-mar/1200/400", caption: "ram mandir nagpur" }
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
            hotels: (hotels as Hotel[]).filter(h => ["The Lalit Grand Palace Srinagar", "Vivanta Dal View, Srinagar", "Four Points by Sheraton Srinagar", "The Orchard Retreat & Spa", "Batra Hotel"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/srinagar-apr/1200/400", caption: "srinagar tulip garden" }
        },
        {
            name: "Darjeeling, West Bengal",
            reason: "The weather is clear, offering stunning views of Kanchenjunga. It's the 'first flush' season, perfect for tasting the world-renowned Darjeeling tea right from the estates.",
            hotels: (hotels as Hotel[]).filter(h => ["Mayfair Darjeeling", "Windamere Hotel", "Elgin Darjeeling", "Cedar Inn", "Viceroy Hotel"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/darjeeling-apr/1200/400", caption: "darjeeling tea plantation" }
        },
        {
            name: "Kodaikanal, Tamil Nadu",
            reason: "Escape the heat of the plains in this 'Princess of Hill Stations'. The weather is pleasant, ideal for boating in the star-shaped lake, cycling, and trekking.",
            hotels: (hotels as Hotel[]).filter(h => ["The Carlton Kodaikanal", "Sterling Kodai Lake", "Kodai Resort Hotel", "Le Poshe by Sparsa", "Zac's Valley Resort"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/kodaikanal-apr/1200/400", caption: "kodaikanal lake" }
        },
        {
            name: "Pachmarhi, Madhya Pradesh",
            reason: "Known as the 'Queen of Satpura', this hill station is a cool retreat. Explore its waterfalls, ancient caves, and dense forests in pleasant pre-summer weather.",
            hotels: (hotels as Hotel[]).filter(h => ["Welcomheritage Golf View", "MPT Amaltas, Pachmarhi", "Pachmarhi", "Hotel Highlands", "Rock End Manor"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/pachmarhi-apr/1200/400", caption: "pachmarhi waterfall" }
        },
        {
            name: "Ooty, Tamil Nadu",
            reason: "The 'Queen of Nilgiris' is in full bloom. Visit the Government Botanical Garden for its annual flower show and enjoy the pleasant climate and scenic toy train rides.",
            hotels: (hotels as Hotel[]).filter(h => ["Taj Savoy Hotel, Ooty", "Sterling Ooty Fern Hill", "Gem Park Ooty", "Fortune Resort Sullivan Court", "Sinclairs Retreat Ooty"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/ooty-apr/1200/400", caption: "ooty botanical garden" }
        },
        {
            name: "Kalimpong, West Bengal",
            reason: "A quieter alternative to Darjeeling, Kalimpong is beautiful in April with blooming orchids and gladioli. Enjoy stunning views of Kanchenjunga from Deolo Hill.",
            hotels: (hotels as Hotel[]).filter(h => ["Mayfair Himalayan Spa Resort", "The Elgin Silver Oaks, Kalimpong", "Sinclairs Retreat Kalimpong", "Holumba Haven", "Summit Barsana Resort & Spa"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/kalimpong-apr/1200/400", caption: "kalimpong town" }
        },
        {
            name: "Dalhousie, Himachal Pradesh",
            reason: "The snow starts to melt, revealing lush green landscapes. The colonial-era architecture and panoramic views make it a charming and peaceful retreat.",
            hotels: (hotels as Hotel[]).filter(h => ["Fortune Park Dalhousie", "Grand View Hotel", "Aamod at Dalhousie", "Indraprastha Resort", "JK Clarks Exotica"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/dalhousie-apr/1200/400", caption: "dalhousie st. johns church" }
        },
        {
            name: "Gangtok, Sikkim",
            reason: "Pleasant weather and clear skies make April a great month for visiting Gangtok. The International Flower Festival is held during this time, showcasing a variety of rhododendrons and orchids.",
            hotels: (hotels as Hotel[]).filter(h => ["Mayfair Spa Resort & Casino", "Tashiling Residency Hotel & Spa", "The Elgin Nor-Khill", "Summit Denzong Hotel", "Lemon Tree Hotel, Gangtok"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/gangtok-apr/1200/400", caption: "gangtok flower show" }
        },
        {
            name: "Kabini, Karnataka",
            reason: "As summer approaches, animals gather near the shrinking water bodies, making wildlife sightings on a boat safari or jeep safari more frequent. A paradise for photographers.",
            hotels: (hotels as Hotel[]).filter(h => ["Evolve Back, Kabini", "The Serai Kabini", "Kaav Safari Lodge", "Red Earth Kabini", "Jungle Lodges & Resorts"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/kabini-apr/1200/400", caption: "elephant in kabini river" }
        },
        {
            name: "Cherrapunji, Meghalaya",
            reason: "Visit just before the heavy monsoons begin. The landscape is green, waterfalls are starting to gain volume, and you can explore the living root bridges in pleasant weather.",
            hotels: (hotels as Hotel[]).filter(h => ["Polo Orchid Resort", "Jiva Resort", "Saimika Resort", "Cherrapunjee Holiday Resort", "Coniferous Resort"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/cherrapunji-apr/1200/400", caption: "living root bridge cherrapunji" }
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
            hotels: (hotels as Hotel[]).filter(h => ["The Oberoi Cecil, Shimla", "Wildflower Hall, An Oberoi Resort, Shimla", "Radisson Jass Shimla", "Clarkes Hotel", "Snow Valley Resorts"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/shimla-may/1200/400", caption: "shimla town view" }
        },
        {
            name: "Manali, Himachal Pradesh",
            reason: "A haven for adventure seekers. With pleasant weather, it's the perfect time for paragliding in Solang Valley, trekking, and visiting Rohtang Pass as it opens up.",
            hotels: (hotels as Hotel[]).filter(h => ["The Himalayan", "Manuallaya - The Resort Spa in the Himalayas", "Span Resort & Spa", "Baragarh Resort", "Solang Valley Resort"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/manali-may/1200/400", caption: "manali valley" }
        },
        {
            name: "Mount Abu, Rajasthan",
            reason: "The only hill station in Rajasthan, it provides a cool respite from the desert heat. Enjoy boating in Nakki Lake and visit the intricately carved Dilwara Temples.",
            hotels: (hotels as Hotel[]).filter(h => ["Hotel Hillock", "Cama Rajputana Club Resort", "Hotel Toppers Corner", "WelcomHeritage Connaught House", "Sterling Mount Abu"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/mountabu-may/1200/400", caption: "nakki lake mount abu" }
        },
        {
            name: "Spiti Valley, Himachal Pradesh",
            reason: "May marks the beginning of the tourist season as roads open. The stark, high-altitude desert landscape is breathtaking. Visit ancient monasteries and remote villages.",
            hotels: (hotels as Hotel[]).filter(h => ["Hotel Deyzor", "Sakya Abode", "Grand Dewachen", "Zostel Spiti", "Spiti Heritage Himalayan Brothers"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/spiti-may/1200/400", caption: "spiti valley monastery" }
        },
        {
            name: "Bir Billing, Himachal Pradesh",
            reason: "Recognized as one of the best paragliding sites in the world. The thermal currents are ideal in May, offering long and scenic flights over the Kangra Valley.",
            hotels: (hotels as Hotel[]).filter(h => ["Colonel's Resort", "The Sky Village", "Bir High", "Chokling Art House", "Tatva Bir Tents and Hotel"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/birbilling-may/1200/400", caption: "paragliding bir billing" }
        },
        {
            name: "Tirthan Valley, Himachal Pradesh",
            reason: "A serene getaway for nature lovers. May is perfect for trout fishing, trekking in the Great Himalayan National Park, and relaxing by the pristine Tirthan River.",
            hotels: (hotels as Hotel[]).filter(h => ["Raju Bharti's Guest House", "The Himalayan Trout House", "Jibhi Homestead", "Sharda Resort", "For A While"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/tirthan-may/1200/400", caption: "tirthan valley river" }
        },
        {
            name: "Munnar, Kerala",
            reason: "The weather is pleasant before the monsoons arrive. It's a great time to visit the tea gardens and Eravikulam National Park to see the Nilgiri Tahr.",
            hotels: (hotels as Hotel[]).filter(h => ["The Fog Munnar", "Chandys Windy Woods", "KTDC Tea County", "Parakkat Nature Resort", "Amber Dale Luxury Hotel"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/munnar-may/1200/400", caption: "munnar tea gardens summer" }
        },
        {
            name: "Lansdowne, Uttarakhand",
            reason: "A quiet and unspoiled hill station. The pleasant weather in May is perfect for nature walks, boating in Bhulla Lake, and enjoying the peaceful colonial ambiance.",
            hotels: (hotels as Hotel[]).filter(h => ["Fairydale Resort", "Vanvasa Resort", "The Alpine Resort", "Blue Pine Resort", "Samskara & Samsara"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/lansdowne-may/1200/400", caption: "lansdowne town" }
        },
        {
            name: "Horsley Hills, Andhra Pradesh",
            reason: "A lesser-known hill station in Andhra Pradesh, it provides a cool escape from the summer heat. Enjoy the scenic beauty and activities like zorbing and rappelling.",
            hotels: (hotels as Hotel[]).filter(h => ["Haritha Hill Resort", "Horsley Hills Holiday Homes", "SS Grand", "Sri Krishna Residency", "AP Tourism Guesthouse"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/horsley-hills-may/1200/400", caption: "horsley hills viewpoint" }
        },
        {
            name: "Sandakphu, West Bengal",
            reason: "For serious trekkers, May is one of the best months for the Sandakphu trek. The rhododendrons are in full bloom, and you get clear views of the 'Sleeping Buddha' range of peaks.",
            hotels: (hotels as Hotel[]).filter(h => ["Hotel Sherpa Chalet", "Goparma Hotel", "Hotel Shovraj", "Teesta Valley Resort", "Local Trekkers' Huts"].includes(h.name)),
            image: { src: "https://picsum.photos/seed/sandakphu-may/1200/400", caption: "sandakphu trekking view" }
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
        hotels: (hotels as Hotel[]).filter(h => ["The Grand Dragon Ladakh", "Stok Palace Heritage", "Ladakh Sarai Resort", "The Zen Ladakh", "Hotel Shambhala"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/ladakh-june/1200/400", caption: "pangong lake ladakh" }
      },
      {
        name: "Coorg, Karnataka",
        reason: "The onset of monsoon transforms Coorg into a lush green paradise. Enjoy the mist-laden coffee plantations, gushing waterfalls like Abbey Falls, and the aroma of fresh coffee.",
        hotels: (hotels as Hotel[]).filter(h => ["Evolve Back, Coorg", "The Tamara Coorg", "Taj Madikeri Resort & Spa", "Coorg Wilderness Resort", "Old Kent Estates"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/coorg-june/1200/400", caption: "coorg coffee plantation" }
      },
      {
        name: "Malshej Ghat, Maharashtra",
        reason: "A mountain pass that comes alive during the monsoon. It's a paradise for nature lovers, with numerous waterfalls, lush green hillsides, and misty clouds covering the landscape.",
        hotels: (hotels as Hotel[]).filter(h => ["Saj By The Lake", "MTDC Malshej Ghat", "The Regenta MPS", "Jivdani Resort", "Hotel Girija"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/malshej-june/1200/400", caption: "malshej ghat waterfall" }
      },
      {
        name: "Sikkim",
        reason: "Visit before the heavy monsoon sets in. The weather is pleasant, and the rhododendrons are still in bloom at higher altitudes. It's great for sightseeing in Gangtok and Pelling.",
        hotels: (hotels as Hotel[]).filter(h => ["Mayfair Spa Resort & Casino", "The Elgin Mount Pandim, Pelling", "Tashiling Residency Hotel & Spa", "Summit Denzong Hotel", "Lemon Tree Hotel, Gangtok"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/sikkim-june/1200/400", caption: "sikkim mountains" }
      },
      {
        name: "Valley of Flowers, Uttarakhand",
        reason: "The Valley of Flowers National Park, a UNESCO World Heritage Site, opens in June. The valley starts to get carpeted with a vibrant array of alpine flowers.",
        hotels: (hotels as Hotel[]).filter(h => ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode", "Blue Poppy Swiss Cottage Camps", "Hotel Bhagat"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/valley-flowers-june/1200/400", caption: "valley of flowers" }
      },
      {
        name: "Dharamshala, Himachal Pradesh",
        reason: "The pre-monsoon weather is pleasant, making it ideal for exploring McLeod Ganj, visiting monasteries, and trekking to Triund. The Dalai Lama Temple is a serene experience.",
        hotels: (hotels as Hotel[]).filter(h => ["Hyatt Regency Dharamshala Resort", "Fortune Park Moksha", "Radisson Blu Resort Dharamshala", "Chonor House", "Udechee Huts"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/dharamshala-june/1200/400", caption: "dharamshala cricket stadium" }
      },
      {
        name: "Goa",
        reason: "Experience the unique Sao Joao festival, where locals jump into wells and streams. The monsoon begins, turning Goa lush and green, with fewer crowds.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-june/1200/400", caption: "goa monsoon" }
      },
      {
        name: "Kudremukh, Karnataka",
        reason: "For trekkers, Kudremukh is a paradise in June. The monsoon brings the grasslands to life, offering stunning green vistas. It's a challenging but rewarding trek.",
        hotels: (hotels as Hotel[]).filter(h => ["Bhagavathi Nature Camp", "Upasana Retreat", "The Gateway Chikmagalur", "Jungle Lodges & Resorts", "Local Homestays"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/kudremukh-june/1200/400", caption: "kudremukh trek" }
      },
      {
        name: "Meghamalai, Tamil Nadu",
        reason: "A lesser-known hill station, Meghamalai is stunning in June with the onset of rains. It's an untouched paradise of tea estates and cloud-covered mountains.",
        hotels: (hotels as Hotel[]).filter(h => ["Highwavys Travellers Bungalow", "Cloud Mountain Bungalow", "Manalar Estate Bungalow", "Limited Homestays", "Nearby hotels in Theni"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/meghamalai-june/1200/400", caption: "meghamalai tea estates" }
      },
      {
        name: "Aizawl, Mizoram",
        reason: "The pleasant weather of early June is perfect for exploring this vibrant city built on ridges. Visit the local markets and enjoy the panoramic views before heavy rains start.",
        hotels: (hotels as Hotel[]).filter(h => ["Hotel Regency", "The Grand Hotel", "Hotel Floria", "David's Hotel", "Aizawl Guest House"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/aizawl-june/1200/400", caption: "aizawl city view" }
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
        hotels: (hotels as Hotel[]).filter(h => ["The Fog Munnar", "Chandys Windy Woods", "KTDC Tea County", "Parakkat Nature Resort", "Amber Dale Luxury Hotel"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/munnar-july/1200/400", caption: "monsoon in munnar" }
      },
      {
        name: "Goa",
        reason: "Experience the 'other side' of Goa. The monsoon season means fewer crowds, lush green scenery, and overflowing waterfalls like Dudhsagar. It's ideal for a peaceful, romantic getaway.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-july/1200/400", caption: "dudhsagar falls goa" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "The city of lakes becomes even more enchanting with the arrival of monsoons. The lakes fill up, the temperature drops, and the Aravalli hills turn green. Enjoy the romantic boat rides.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Udaipur').slice(0, 10),
        image: { src: "https://picsum.photos/seed/udaipur-july/1200/400", caption: "monsoon palace udaipur" }
      },
      {
        name: "Lonavala, Maharashtra",
        reason: "A popular monsoon destination near Mumbai and Pune. The hills are covered in a green blanket, and attractions like Bhushi Dam and Tiger Point are at their scenic best.",
        hotels: (hotels as Hotel[]).filter(h => ["Fariyas Resort Lonavala", "The Machan", "Della Resorts", "Radisson Resort & Spa Lonavala", "Rhythm Lonavala"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/lonavala-july/1200/400", caption: "lonavala misty hills" }
      },
      {
        name: "Orchha, Madhya Pradesh",
        reason: "The historical town of Orchha, with its magnificent palaces and temples, looks stunning against the grey monsoon sky. The Betwa river flows in full force, adding to the beauty.",
        hotels: (hotels as Hotel[]).filter(h => ["Amar Mahal Orchha", "Sheesh Mahal Orchha", "Bundelkhand Riverside", "Hotel Raj Mahal", "The Orchha Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/orchha-july/1200/400", caption: "orchha cenotaphs" }
      },
       {
        name: "Valley of Flowers, Uttarakhand",
        reason: "The valley is in full bloom. The monsoon showers make the flowers vibrant and the landscape exceptionally green. It's a breathtaking sight for trekkers.",
        hotels: (hotels as Hotel[]).filter(h => ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode", "Blue Poppy Swiss Cottage Camps", "Hotel Bhagat"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/valley-flowers-july/1200/400", caption: "valley of flowers monsoon" }
      },
      {
        name: "Spiti Valley, Himachal Pradesh",
        reason: "Spiti is in a rain-shadow region, meaning it receives very little rainfall, making it a perfect monsoon escape. The weather is ideal for road trips and monastery visits.",
        hotels: (hotels as Hotel[]).filter(h => ["Hotel Deyzor", "Sakya Abode", "Grand Dewachen", "Zostel Spiti", "Spiti Heritage Himalayan Brothers"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/spiti-july/1200/400", caption: "key monastery spiti" }
      },
      {
        name: "Kodaikanal, Tamil Nadu",
        reason: "The 'Princess of Hill Stations' gets a romantic, misty makeover in July. Enjoy the beauty of the rain-washed landscapes, gushing waterfalls, and the serene Kodai Lake.",
        hotels: (hotels as Hotel[]).filter(h => ["The Carlton Kodaikanal", "Sterling Kodai Lake", "Kodai Resort Hotel", "Le Poshe by Sparsa", "Zac's Valley Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/kodaikanal-july/1200/400", caption: "kodaikanal misty lake" }
      },
      {
        name: "Agumbe, Karnataka",
        reason: "Known as the 'Cherrapunji of the South', Agumbe is a paradise for rain lovers and nature enthusiasts. It's famous for its rainforests, waterfalls, and stunning sunset views.",
        hotels: (hotels as Hotel[]).filter(h => ["Dodda Mane", "Seethanadi Nature Camp", "Kalinga Centre for Rainforest Ecology", "Limited Homestays", "Nearby hotels in Thirthahalli"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/agumbe-july/1200/400", caption: "agumbe rainforest" }
      },
      {
        name: "Shillong, Meghalaya",
        reason: "The monsoon enhances the beauty of Shillong. The waterfalls are at their peak, the lakes are full, and the entire city is covered in a romantic mist.",
        hotels: (hotels as Hotel[]).filter(h => ["Ri Kynjai", "Hotel Polo Towers Shillong", "The Eee Cee Hotel", "Cafe Shillong Bed & Breakfast", "Aerodene Cottage"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/shillong-july/1200/400", caption: "elephant falls shillong monsoon" }
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
        hotels: (hotels as Hotel[]).filter(h => ["The Tattva Resort", "Hotel Kuber", "Himalayan Abode", "Blue Poppy Swiss Cottage Camps", "Hotel Bhagat"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/valley-flowers-aug/1200/400", caption: "flowers in bloom" }
      },
      {
        name: "Alleppey (Alappuzha), Kerala",
        reason: "Witness the spectacular Nehru Trophy Snake Boat Race, held on the second Saturday of August. The backwaters are lush and rejuvenated after the rains.",
        hotels: (hotels as Hotel[]).filter(h => ["Punnamada Resort", "Lake Palace Resort", "Marari Beach Resort - CGH Earth", "Xandari Pearl", "The World Backwaters"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/alleppey-aug/1200/400", caption: "kerala snake boat race" }
      },
      {
        name: "Cherrapunji, Meghalaya",
        reason: "Experience the monsoons in one of the wettest places on earth. The waterfalls are thunderous, and the landscape is an intense, vivid green. A must for rain lovers.",
        hotels: (hotels as Hotel[]).filter(h => ["Polo Orchid Resort", "Jiva Resort", "Saimika Resort", "Cherrapunjee Holiday Resort", "Coniferous Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/cherrapunji-aug/1200/400", caption: "cherrapunji living root bridge" }
      },
      {
        name: "Kanyakumari, Tamil Nadu",
        reason: "The monsoons provide a dramatic backdrop to the confluence of the three seas. The sky is often painted with beautiful colors during sunrise and sunset.",
        hotels: (hotels as Hotel[]).filter(h => ["The Gopinivas Grand", "Hotel Seaface", "Sparsa Kanyakumari", "Hotel Tri Sea", "Annai Resorts & Spa"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/kanyakumari-aug/1200/400", caption: "kanyakumari vivekananda rock" }
      },
      {
        name: "Delhi",
        reason: "Experience the patriotic fervor of Independence Day on August 15th at the Red Fort. The weather is relatively cooler after the monsoon showers, making it good for sightseeing.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'New Delhi').slice(0, 10),
        image: { src: "https://picsum.photos/seed/delhi-aug/1200/400", caption: "red fort delhi" }
      },
      {
        name: "Athirapally, Kerala",
        reason: "The Athirapally Falls, often called the 'Niagara of India', is at its majestic best during the monsoons of August. The sheer volume and power of the water is a sight to behold.",
        hotels: (hotels as Hotel[]).filter(h => ["Rainforest Resort", "Niraamaya Retreats Samroha", "Casa Rio Resorts", "Willow Heights", "Magic Land Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/athirapally-aug/1200/400", caption: "athirapally falls" }
      },
      {
        name: "Madurai, Tamil Nadu",
        reason: "August is the time for the grand Avanimoolam festival at the Meenakshi Temple, a major cultural event. The weather is also pleasant post-showers.",
        hotels: (hotels as Hotel[]).filter(h => ["The Gateway Hotel Pasumalai", "Heritage Madurai", "Courtyard by Marriott Madurai", "JC Residency", "Fortune Pandiyan Hotel"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/madurai-aug/1200/400", caption: "meenakshi temple madurai" }
      },
      {
        name: "Coorg, Karnataka",
        reason: "Coorg is a lush green heaven in August. The coffee plantations are vibrant, waterfalls are in full flow, and the misty landscape is perfect for a romantic monsoon getaway.",
        hotels: (hotels as Hotel[]).filter(h => ["Evolve Back, Coorg", "The Tamara Coorg", "Taj Madikeri Resort & Spa", "Coorg Wilderness Resort", "Old Kent Estates"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/coorg-aug/1200/400", caption: "coorg waterfall monsoon" }
      },
      {
        name: "Mount Abu, Rajasthan",
        reason: "The Aravalli hills surrounding Mount Abu are at their greenest. The monsoon clouds and mist add a mystical charm to this hill station.",
        hotels: (hotels as Hotel[]).filter(h => ["Hotel Hillock", "Cama Rajputana Club Resort", "WelcomHeritage Connaught House", "Sterling Mount Abu", "Hotel Toppers Corner"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/mountabu-aug/1200/400", caption: "mount abu monsoon" }
      },
      {
        name: "Igatpuri, Maharashtra",
        reason: "Home to the world's largest meditation center, the Vipassana International Academy, Igatpuri is a serene monsoon destination with lush valleys and ancient forts.",
        hotels: (hotels as Hotel[]).filter(h => ["Manas Resort with Petting Zoo", "The Herb Farm", "Rainforest Resort and Spa", "Mystic Valley Spa Resort", "Dew Drops Boutique Retreat"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/igatpuri-aug/1200/400", caption: "igatpuri valley monsoon" }
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
        hotels: (hotels as Hotel[]).filter(h => ["Ziro Valley Resort", "Siiro Resort", "Kite-A-Naki", "Abasa Homestay", "Michi Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/ziro-sep/1200/400", caption: "ziro valley rice fields" }
      },
      {
        name: "Lachen, Sikkim",
        reason: "As the monsoon recedes, the skies clear up, offering breathtaking views of the Himalayas. Gurudongmar Lake is accessible and looks stunning in this season.",
        hotels: (hotels as Hotel[]).filter(h => ["The Apple Orchard Resort", "Jain Group Hotel Sonam Palgey", "Yarlam, Lachung", "Himalayan Residency", "Magpie Nest"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/lachen-sep/1200/400", caption: "gurudongmar lake sikkim" }
      },
      {
        name: "Mahabaleshwar, Maharashtra",
        reason: "The landscape is vibrant and green after the rains. Waterfalls are still full, and it's the perfect time for boating in Venna Lake and enjoying the panoramic views.",
        hotels: (hotels as Hotel[]).filter(h => ["Le Meridien Mahabaleshwar", "Evershine Keys Prima Resort", "Brightland Resort & Spa", "Citrus Chambers Mahabaleshwar", "Saj Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/mahabaleshwar-sep/1200/400", caption: "venna lake mahabaleshwar" }
      },
      {
        name: "Amritsar, Punjab",
        reason: "The weather becomes pleasant after the monsoon. It's a great time to visit the Golden Temple and witness the patriotic Beating Retreat ceremony at the Wagah Border.",
        hotels: (hotels as Hotel[]).filter(h => ["Hyatt Regency Amritsar", "Taj Swarna Amritsar", "Ramada by Wyndham Amritsar", "Fairfield by Marriott Amritsar", "Holiday Inn Amritsar"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/amritsar-sep/1200/400", caption: "golden temple amritsar" }
      },
      {
        name: "Mumbai, Maharashtra",
        reason: "Experience the grand celebrations of Ganesh Chaturthi which often continues into early September. The city is filled with artistic pandals and massive idols, culminating in an energetic immersion procession.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Mumbai').slice(0, 10),
        image: { src: "https://picsum.photos/seed/mumbai-sep/1200/400", caption: "ganesh chaturthi mumbai" }
      },
       {
        name: "Bundi, Rajasthan",
        reason: "The post-monsoon weather is perfect for exploring this hidden gem of Rajasthan. The town's lakes and stepwells are full, and the palaces and forts look magnificent.",
        hotels: (hotels as Hotel[]).filter(h => ["Hadora Haveli", "Bundi Inn", "Dev Niwas", "Kasera Paradise", "The Ummaid Bagh Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/bundi-sep/1200/400", caption: "bundi palace" }
      },
      {
        name: "Dooars, West Bengal",
        reason: "The forests of the Dooars region reopen after the monsoon. The landscape is incredibly lush, and it's a great time for wildlife safaris in Gorumara and Jaldapara National Parks.",
        hotels: (hotels as Hotel[]).filter(h => ["Sinclairs Siliguri", "The Riverwood Forest Retreat", "Aranya Jungle Resort", "Resort Murti", "Gorumara Jungle Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/dooars-sep/1200/400", caption: "dooars tea garden" }
      },
      {
        name: "Saputara, Gujarat",
        reason: "The monsoon leaves Gujarat's only hill station fresh and green. Enjoy boating on the lake and visit the Gira waterfalls, which are at their best this time of year.",
        hotels: (hotels as Hotel[]).filter(h => ["Aakar Lords Inn", "Patang Residency", "Hotel Anando", "Shilpi Hill Resort", "Toran Hill Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/saputara-sep/1200/400", caption: "saputara lake" }
      },
      {
        name: "Pune, Maharashtra",
        reason: "The city hosts grand Ganesh Chaturthi celebrations. The weather is also very pleasant for exploring the city's forts, cafes, and Osho Ashram.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Pune').slice(0, 10),
        image: { src: "https://picsum.photos/seed/pune-sep/1200/400", caption: "shaniwar wada pune" }
      },
      {
        name: "Thimphu, Bhutan",
        reason: "Just across the border, September hosts the vibrant Thimphu Tshechu festival. The post-monsoon skies are clear, offering stunning Himalayan views.",
        hotels: (hotels as Hotel[]).filter(h => ["Le Méridien Thimphu", "Taj Tashi", "Terma Linca Resort & Spa", "Druk Hotel", "Hotel Osel"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/thimphu-sep/1200/400", caption: "thimphu dzong festival" }
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
        hotels: (hotels as Hotel[]).filter(h => ["The Oberoi Grand, Kolkata", "Taj Bengal", "ITC Sonar, Kolkata", "Hyatt Regency Kolkata", "The Park Kolkata"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/kolkata-oct/1200/400", caption: "durga puja kolkata" }
      },
      {
        name: "Mysore, Karnataka",
        reason: "Witness the royal splendor of Dasara celebrations. The Mysore Palace is magnificently illuminated, and the Jumboo Savari (elephant procession) is a grand spectacle.",
        hotels: (hotels as Hotel[]).filter(h => ["Radisson Blu Plaza Hotel Mysore", "Grand Mercure Mysore", "Fortune JP Palace", "The Windflower Resort & Spa", "Royal Orchid Metropole"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/mysore-oct/1200/400", caption: "mysore palace dasara" }
      },
      {
        name: "Bandhavgarh National Park, Madhya Pradesh",
        reason: "The park reopens after the monsoon. The forest is lush, and the chances of spotting tigers and other wildlife are high as they come out to the waterholes.",
        hotels: (hotels as Hotel[]).filter(h => ["Syna Tiger Resort", "Mahua Kothi, A Taj Safari", "Samode Safari Lodge", "Lemon Tree Wildlife Resort", "Nature Heritage Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/bandhavgarh-oct/1200/400", caption: "tiger in bandhavgarh" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "The weather is dry and pleasant, perfect for exploring the vast UNESCO World Heritage site on foot or by bicycle. The post-monsoon landscape is still green.",
        hotels: (hotels as Hotel[]).filter(h => ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort", "Heritage Resort Hampi", "Kishkinda Heritage Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/hampi-oct/1200/400", caption: "hampi stone chariot" }
      },
      {
        name: "Pachmarhi, Madhya Pradesh",
        reason: "The 'Queen of Satpura' is at its scenic best with lush greenery and active waterfalls after the rains. The pleasant weather is ideal for trekking and sightseeing.",
        hotels: (hotels as Hotel[]).filter(h => ["Welcomheritage Golf View", "MPT Amaltas, Pachmarhi", "Pachmarhi", "Hotel Highlands", "Rock End Manor"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/pachmarhi-oct/1200/400", caption: "pachmarhi landscape" }
      },
       {
        name: "Jodhpur, Rajasthan",
        reason: "The weather is perfect for exploring the Blue City. The world-renowned Rajasthan International Folk Festival (RIFF) takes place at Mehrangarh Fort in October.",
        hotels: (hotels as Hotel[]).filter(h => ["Umaid Bhawan Palace, Jodhpur", "RAAS Jodhpur", "Taj Hari Mahal Jodhpur", "Ajit Bhawan", "The Ummed Jodhpur Palace"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/jodhpur-oct/1200/400", caption: "mehrangarh fort jodhpur night" }
      },
      {
        name: "Rishikesh, Uttarakhand",
        reason: "The post-monsoon river has a great flow for white-water rafting, and the weather is ideal for yoga, meditation, and camping by the Ganges.",
        hotels: (hotels as Hotel[]).filter(h => ["The Westin Resort & Spa, Himalayas", "The Roseate Ganges", "Aloha on the Ganges", "Taj Rishikesh Resort & Spa, Uttarakhand", "EllBee Ganga View"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/rishikesh-oct/1200/400", caption: "rafting in rishikesh" }
      },
      {
        name: "Darjeeling, West Bengal",
        reason: "Post-monsoon clear skies offer the best views of the Kanchenjunga range. It's also the time for the 'second flush' tea, considered one of the finest.",
        hotels: (hotels as Hotel[]).filter(h => ["Mayfair Darjeeling", "Windamere Hotel", "Elgin Darjeeling", "Cedar Inn", "Viceroy Hotel"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/darjeeling-oct/1200/400", caption: "kanchenjunga view darjeeling" }
      },
      {
        name: "Diu",
        reason: "The weather is dry and pleasant, perfect for enjoying the pristine beaches and Portuguese architecture without the crowds of Goa.",
        hotels: (hotels as Hotel[]).filter(h => ["The Azzaro Resorts & Spa", "Radhika Beach Resort", "Sugati Beach Resort", "Hotel Apaar", "Krishna Park Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/diu-oct/1200/400", caption: "diu fort" }
      },
      {
        name: "Nainital, Uttarakhand",
        reason: "The autumn season brings a crispness to the air and clear skies. Enjoy boating on Naini Lake and get panoramic Himalayan views from Snow View Point.",
        hotels: (hotels as Hotel[]).filter(h => ["The Naini Retreat, by Leisure Hotels", "Shervani Hilltop", "The Manu Maharani", "Vikram Vintage Inn", "The Pavilion"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/nainital-oct/1200/400", caption: "nainital lake" }
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
        hotels: (hotels as Hotel[]).filter(h => ["BrijRama Palace, Varanasi", "Taj Ganges, Varanasi", "The Clarks, Varanasi", "Hotel Madin", "Ramada Plaza by Wyndham JHV Varanasi"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/varanasi-nov/1200/400", caption: "dev deepawali varanasi" }
      },
      {
        name: "Pushkar, Rajasthan",
        reason: "Experience the world's largest camel fair, the Pushkar Mela. It's a vibrant spectacle of culture, trade, and traditions, with competitions, folk performances, and hot air ballooning.",
        hotels: (hotels as Hotel[]).filter(h => ["The Westin Pushkar Resort & Spa", "Ananta Spa & Resorts", "Pratap Mahal, Ajmer", "The Greenhouse Resort", "Bhanwar Singh Palace"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/pushkar-nov/1200/400", caption: "pushkar camel fair" }
      },
      {
        name: "Sundarbans, West Bengal",
        reason: "The pleasant weather is ideal for exploring the world's largest mangrove forest. It's the best time for boat safaris to spot the elusive Royal Bengal Tiger and other wildlife.",
        hotels: (hotels as Hotel[]).filter(h => ["Sundarban Tiger Camp", "Sunderban Jungle Mahal", "Royal Bengal Resort", "Solitary Nook", "WBTD Sajnekhali Tourist Lodge"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/sundarbans-nov/1200/400", caption: "sundarbans mangrove forest" }
      },
      {
        name: "Goa",
        reason: "November marks the beginning of the tourist season. The weather is perfect, the shacks are open, and the vibe is energetic, but it's less crowded than December.",
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-nov/1200/400", caption: "goa beach shack" }
      },
      {
        name: "Hampi, Karnataka",
        reason: "The weather is perfect for exploring the ruins. The Hampi Utsav, a grand cultural festival, is sometimes held in November, bringing the ancient city to life with music and dance.",
        hotels: (hotels as Hotel[]).filter(h => ["Evolve Back, Hampi", "Hyatt Place Hampi", "Hampi's Boulders Resort", "Heritage Resort Hampi", "Kishkinda Heritage Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/hampi-nov/1200/400", caption: "hampi festival" }
      },
      {
        name: "Udaipur, Rajasthan",
        reason: "The cool and pleasant weather is ideal for sightseeing and boat rides on Lake Pichola. The city is beautifully lit up for Diwali if it falls in November.",
        hotels: (hotels as Hotel[]).filter(h => h.city === 'Udaipur').slice(0, 10),
        image: { src: "https://picsum.photos/seed/udaipur-nov/1200/400", caption: "udaipur city palace" }
      },
      {
        name: "Bodh Gaya, Bihar",
        reason: "The weather is cool and pleasant, making it the perfect time for pilgrims and tourists to visit the Mahabodhi Temple and other Buddhist monasteries.",
        hotels: (hotels as Hotel[]).filter(h => ["The Royal Residency", "Maha Bodhi Hotel Resort", "Oaks Bodhgaya", "Hotel Bodh Vilas", "Hotel Sujata"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/bodhgaya-nov/1200/400", caption: "mahabodhi temple bodh gaya" }
      },
      {
        name: "Gir National Park, Gujarat",
        reason: "This is the best time to spot the majestic Asiatic Lions as the weather is pleasant and the vegetation is not too dense. The park is fully open for safaris.",
        hotels: (hotels as Hotel[]).filter(h => ["The Fern Gir Forest Resort", "Woods at Sasan", "The Gateway Hotel Gir Forest", "Amidhara Resort", "Gir Serai - IHCL SeleQtions"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/gir-nov/1200/400", caption: "asiatic lion gir" }
      },
      {
        name: "Almora, Uttarakhand",
        reason: "Enjoy crisp mountain air and clear panoramic views of the Himalayas. The town's unique horseshoe shape and cultural heritage make it a charming winter destination.",
        hotels: (hotels as Hotel[]).filter(h => ["The Kumaon", "Gohil's Homestay", "Imperial Heights", "Kasar Rainbow Resort", "Mohan's Binsar Retreat"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/almora-nov/1200/400", caption: "himalayan view from almora" }
      },
      {
        name: "Shillong, Meghalaya",
        reason: "The post-monsoon Cherry Blossom Festival is a spectacular event, painting the city in shades of pink. The weather is cool and perfect for exploring.",
        hotels: (hotels as Hotel[]).filter(h => ["Ri Kynjai", "Hotel Polo Towers Shillong", "The Eee Cee Hotel", "Cafe Shillong Bed & Breakfast", "Aerodene Cottage"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/shillong-nov/1200/400", caption: "shillong cherry blossom" }
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
        hotels: (hotels as Hotel[]).filter(h => h.state === 'Goa').slice(0, 10),
        image: { src: "https://picsum.photos/seed/goa-dec/1200/400", caption: "goa new year party" }
      },
      {
        name: "Rann of Kutch, Gujarat",
        reason: "The Rann Utsav is in full swing under the cool winter sky. Experience the magical white desert under the full moon, enjoy cultural programs, and shop for local handicrafts.",
        hotels: (hotels as Hotel[]).filter(h => h.cityId === 'kutch' || h.cityId === 'bhuj'),
        image: { src: "https://picsum.photos/seed/kutch-dec/1200/400", caption: "rann utsav kutch" }
      },
      {
        name: "Manali, Himachal Pradesh",
        reason: "For those who love snow, December is the time to visit Manali. The town is covered in a blanket of snow, perfect for skiing, snowboarding, and enjoying a white Christmas.",
        hotels: (hotels as Hotel[]).filter(h => ["The Himalayan", "Manuallaya - The Resort Spa in the Himalayas", "Span Resort & Spa", "Baragarh Resort", "Solang Valley Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/manali-dec/1200/400", caption: "snowfall in manali" }
      },
      {
        name: "Alleppey (Alappuzha), Kerala",
        reason: "The weather is cool and pleasant, ideal for a relaxing houseboat cruise in the backwaters. Christmas celebrations in the region also have a unique local charm.",
        hotels: (hotels as Hotel[]).filter(h => ["Punnamada Resort", "Lake Palace Resort", "Marari Beach Resort - CGH Earth", "Xandari Pearl", "The World Backwaters"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/alleppey-dec/1200/400", caption: "kerala houseboat winter" }
      },
      {
        name: "Jodhpur, Rajasthan",
        reason: "The pleasant winter sun is perfect for exploring the majestic Mehrangarh Fort and the blue city. The cool evenings are great for enjoying Rajasthani cuisine.",
        hotels: (hotels as Hotel[]).filter(h => ["Umaid Bhawan Palace, Jodhpur", "RAAS Jodhpur", "Taj Hari Mahal Jodhpur", "Ajit Bhawan", "The Ummed Jodhpur Palace"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/jodhpur-dec/1200/400", caption: "mehrangarh fort jodhpur" }
      },
      {
        name: "Auli, Uttarakhand",
        reason: "The skiing season begins in late December. It's a winter wonderland with fresh snowfall, perfect for adventure sports and enjoying the Himalayan chill.",
        hotels: (hotels as Hotel[]).filter(h => ["The Royal Village", "Himalayan High, Auli", "The Tattva Resort", "Cliff Top Club", "Blue Poppy Resorts"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/auli-dec/1200/400", caption: "auli skiing" }
      },
      {
        name: "Gokarna, Karnataka",
        reason: "A more laid-back alternative to Goa for a beach holiday. The weather is perfect for beach hopping, trekking between beaches, and enjoying a tranquil New Year's.",
        hotels: (hotels as Hotel[]).filter(h => ["SwaSwara - CGH Earth", "Kahani Paradise", "Kudle Beach View Resort", "Namaste Yoga Farm", "Zostel Gokarna"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/gokarna-dec/1200/400", caption: "gokarna om beach" }
      },
      {
        name: "Konark, Odisha",
        reason: "The Konark Dance Festival often takes place in early December. The weather is ideal for exploring the magnificent Sun Temple and nearby Chandrabhaga beach.",
        hotels: (hotels as Hotel[]).filter(h => ["Lotus Eco Resort", "Toshali Sands", "The Chariot Resort & Spa", "Mayfair Heritage", "Pramod Convention & Beach Resort"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/konark-dec/1200/400", caption: "konark sun temple festival" }
      },
      {
        name: "Pondicherry",
        reason: "The weather is cool and pleasant, ideal for exploring the French Quarter. The serene atmosphere of Auroville and the Christmas celebrations offer a unique experience.",
        hotels: (hotels as Hotel[]).filter(h => ["Palais de Mahe - CGH Earth", "La Villa", "The Promenade", "Le Dupleix", "Villa Shanti"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/pondy-dec/1200/400", caption: "pondicherry christmas" }
      },
      {
        name: "Tawang, Arunachal Pradesh",
        reason: "Experience a magical winter in the mountains. The landscape is covered in snow, and the Torgya festival is sometimes celebrated at the Tawang Monastery in late December or January.",
        hotels: (hotels as Hotel[]).filter(h => ["Hotel Tawang Heights", "Vivanta Tawang", "Dondrub Homestay", "Hotel Gakyi Khang Zhang", "Hotel Sambala"].includes(h.name)),
        image: { src: "https://picsum.photos/seed/tawang-dec/1200/400", caption: "tawang in snow" }
      }
    ]
  }
};
