export type Store = {
  name: string;
  slug: string;
  category: string;
  excerpt: string;
  about: string;
  websiteUrl: string;
  image: string;
  imagePosition?: string;
  detailImageHeight?: string;
  partnerCopy?: string;
  onlineOnly?: boolean;
  order: number;
  moreInfoRoute: string;
};

export const stores: Store[] = [
  {
    name: "The Scoin Shop",
    slug: "scoin",
    category: "Jewellery & Collectibles",
    excerpt: "South Africa's leading gold-coin and bullion retailer, described as 'the world's only coin retail chain' and backed by over 50 years of numismatic expertise. Specialises in Krugerrands and rare collectible coins from global mints, with secure storage solutions for investors and collectors.",
    about: "South Africa's most established precious metals retailer, operating since the 1970s with 11 strategically located stores across the country. Specializes exclusively in Krugerrands, rare bullion coins, and collectible numismatic pieces from the world's most prestigious mints including Monnaie de Paris, Royal Canadian Mint, and The Royal Mint UK. Offers SafeGold secure storage vaults, expert authentication services, competitive trade-in programs for collectors, and free nationwide delivery on online orders.",
    websiteUrl: "https://scoinshop.com",
    image: "/scoin-store.webp",
    order: 1,
    moreInfoRoute: "/resources/stores/scoin"
  },
  {
    name: "iStore",
    slug: "istore",
    category: "Electronics",
    excerpt: "South Africa's largest Apple Premium Reseller network with 30+ stores nationwide since 2005. The home of everything Apple in South Africa, offering expert advice, trade-ins, certified repairs, in-store training, and an elevated retail experience.",
    about: "South Africa's exclusive Apple authorized premium reseller with 30+ stores nationwide since 2005. Offers the complete Apple ecosystem including the latest Mac, iPhone, iPad, Apple Watch, AirPods, and Apple TV devices. Delivers personalized consultation, certified device repairs and technical support, in-store training sessions, device trade-in programs, business solutions, and free delivery nationwide—positioning itself as \"the home of everything Apple in South Africa.\"",
    websiteUrl: "https://www.istore.co.za/",
    image: "/istore-store copy copy.webp",
    order: 2,
    moreInfoRoute: "/resources/stores/istore"
  },
  {
    name: "Diesel",
    slug: "diesel",
    category: "Fashion & Apparel",
    excerpt: "An Italian luxury fashion brand recognised worldwide for premium denim, edgy design and youth-driven attitude. Brings high-quality jeans, street-led styling and international fashion experience to South Africa.",
    about: "Iconic Italian luxury fashion brand bringing premium denim innovation, edgy design philosophy, and youth-driven attitude to South Africa. Renowned globally for distinctive style, cutting-edge fabrication, and rock-'n'-roll aesthetic—representing high-quality international fashion authority with contemporary edge and enduring cultural influence.",
    websiteUrl: "https://diesel.co.za/",
    image: "/diesel-store.webp",
    order: 3,
    moreInfoRoute: "/resources/stores/diesel"
  },
  {
    name: "Sunbet",
    slug: "sunbet",
    category: "Entertainment & Gaming",
    excerpt: "South Africa's leading sports betting and online casino platform, powered by Sun International. Deposit instantly using stablecoins and crypto via Ezeebit — one of the first online gaming platforms in South Africa to accept crypto deposits.",
    about: "Sunbet is South Africa's premier sports betting and online gaming platform, offering a comprehensive range of sports markets, live in-play betting, casino games, and slots — all backed by Sun International, one of South Africa's most trusted gaming groups. Ezeebit is integrated directly as a deposit method, enabling players to fund their accounts instantly using stablecoins and crypto assets. This makes Sunbet one of the first online gaming platforms in South Africa to offer a fully integrated crypto deposit experience.",
    websiteUrl: "https://www.sunbet.co.za",
    image: "/sunbet_banner_upscaled.png",
    imagePosition: "88%",
    detailImageHeight: "h-56",
    partnerCopy: "By partnering with Ezeebit, Sunbet offers users the convenience and security of stablecoin and cryptocurrency payments. This forward-thinking approach reflects their commitment to embracing new technologies that enhance the checkout experience.",
    onlineOnly: true,
    order: 4,
    moreInfoRoute: "/resources/stores/sunbet"
  },
  {
    name: "Al Capone Premium",
    slug: "al-capone-premium",
    category: "Fashion & Apparel",
    excerpt: "Founded in 2014, Al Capone Premium supplies a curated multi-brand luxury men's fashion collection in South Africa's top malls. Stocks worldwide designer brands rarely available locally, with an elevated in-store experience and exclusive product drops.",
    about: "Premium luxury menswear curator established in 2014, distinguished by exclusively imported designer brands including Givenchy, Moncler, Karl Lagerfeld, and Billionaire—collections rarely available elsewhere in South Africa. Multi-location presence in prestigious malls with expertly curated apparel for discerning gentlemen. Features regular exclusive product drops, personalized styling consultations, and access to rare seasonal collections from global fashion powerhouses.",
    websiteUrl: "https://alcaponepremium.co.za/",
    image: "/alcapone-store.webp",
    order: 5,
    moreInfoRoute: "/resources/stores/al-capone-premium"
  },
  {
    name: "Court Order",
    slug: "court-order",
    category: "Fashion & Apparel",
    excerpt: "A specialist platform in the South African sneaker and streetwear scene, linking discerning buyers and sellers of rare footwear and apparel via an authentication process. Provides access to limited-edition styles with confidence and curation.",
    about: "Cape Town's definitive streetwear and sneaker marketplace for enthusiasts and collectors, operating both online and at a concept store on Roeland Street. Connects global buyers and sellers through rigorous authentication processes, specializing in limited-edition footwear and apparel from coveted brands like Yeezy, Supreme, Air Jordan, Palace, and emerging underground designers—celebrating sneaker culture as art form and investment.",
    websiteUrl: "https://courtorder.co.za/",
    image: "/courtorder-store.webp",
    order: 6,
    moreInfoRoute: "/resources/stores/court-order"
  },
  {
    name: "Hydraulics Stores",
    slug: "hydraulics",
    category: "Fashion & Apparel",
    excerpt: "A high-end fashion retailer offering luxury clothing, footwear and accessories for both men and women. Its boutiques carry top international labels and cater to style-conscious shoppers seeking premium design and service.",
    about: "Pioneer in South Africa's luxury multi-label fashion retail with 8 strategically located concept stores. Exclusively curates avant-garde international brands including Moschino, D-Squared, CP Company, Represent, and Iceberg—with 100% exclusive collections not available elsewhere in the country. Features distinct store concepts (WEARETHEFUTURE for luxury streetwear, AVANTGARDE for pure luxury, and FEMME for women's luxury) with beautifully designed interiors, in-house label collaborations, and first-to-market product introductions.",
    websiteUrl: "https://www.hydraulicsstores.co.za/",
    image: "/hydraulics-store.webp",
    order: 7,
    moreInfoRoute: "/resources/stores/hydraulics"
  },
  {
    name: "Le Creuset",
    slug: "le-creuset",
    category: "Home & Kitchen",
    excerpt: "A globally renowned cookware brand, best known for its colourful enameled cast-iron casseroles and cooking tools. Offers premium kitchen-to-table solutions, appealing to serious home chefs and lifestyle-conscious buyers.",
    about: "Global leader in premium French cookware and kitchen lifestyle products, internationally recognized for signature colorful enameled cast-iron casseroles and innovative cooking tools. Offers quality kitchenware designed for serious home chefs and cooking enthusiasts, featuring exceptional durability, authentic craftsmanship, and vibrant aesthetic appeal that transforms everyday cooking into culinary artistry.",
    websiteUrl: "https://www.lecreuset.co.za/",
    image: "/lecreuset-store.webp",
    order: 8,
    moreInfoRoute: "/resources/stores/le-creuset"
  },
  {
    name: "Amiri",
    slug: "amiri",
    category: "Fashion & Apparel",
    excerpt: "A Los Angeles-based luxury streetwear label founded by Mike Amiri in 2013-14. The brand fuses rock-'n'-roll aesthetic with high-end craftsmanship and is globally recognised for its elevated, rebellious approach to modern luxury.",
    about: "Los Angeles-based luxury streetwear powerhouse founded 2013-14 by Mike Amiri, globally recognized for rock-inspired design fused with high-end tailoring and premium fabrication. Brings distinctive rebellious luxury aesthetic, contemporary streetwear authority, and music-influenced design philosophy to South Africa—celebrated for artistic vision and sophisticated rebelliousness.",
    websiteUrl: "https://amiri.com/en-bg",
    image: "/amiri-store.webp",
    order: 9,
    moreInfoRoute: "/resources/stores/amiri"
  },
  {
    name: "Yawa Africa",
    slug: "yawa-africa",
    category: "Fashion & Apparel",
    excerpt: "An experiential luxury retail concept in South Africa that fuses fashion, art and music under one roof. Showcases coveted international labels and immersive retail experiences, catering to trend-savvy consumers.",
    about: "Immersive luxury retail concept uniquely merging fashion, contemporary art, and live music programming into singular experiential destination. Curates coveted international designer labels alongside progressive South African artists and creators. Serves as cultural platform and lifestyle hub for trend-savvy consumers seeking multisensory shopping experiences beyond traditional retail.",
    websiteUrl: "https://yawa.africa/",
    image: "/yawa-store.webp",
    order: 10,
    moreInfoRoute: "/resources/stores/yawa-africa"
  },
  {
    name: "BHH Boutique",
    slug: "bhh",
    category: "Jewellery & Collectibles",
    excerpt: "Boutique Haute Horlogerie is South Africa's flagship luxury watch and jewellery destination, located in Cape Town's prestigious V&A Waterfront. Home to 11 of the world's most prestigious watch and jewellery houses, including a dedicated Chopard space and an adjacent multi-brand gallery.",
    about: "Operated by Architects of Time—a high-end watch distributor in South Africa since 1996—BHH Boutique is the group's flagship concept store, opened in 2020 across more than 150 square metres in Cape Town's V&A Waterfront. The boutique houses a dedicated Universe of Chopard space alongside a multi-brand gallery showcasing the world's most exclusive timepieces and jewellery, including Ulysse Nardin, Parmigiani, Zenith, Moser & Cie, Hermès, Dior, Bulgari, and Ebel watches, complemented by Messika diamond jewellery and Pomellato's playful Italian designs. A sumptuous private lounge offers clients the opportunity to view and try on exceptional pieces in an atmosphere of classical elegance and understated luxury.",
    websiteUrl: "https://bhhboutique.co.za",
    image: "/BHH store.webp",
    order: 11,
    moreInfoRoute: "/resources/stores/bhh"
  },
  {
    name: "Tintswalo Lodges",
    slug: "tintswalo-lodge",
    category: "Hospitality",
    excerpt: "A collection of five family-owned luxury lodges set in distinctive South African locations—from a boutique ocean-front lodge near Cape Town to safari stays near Kruger. Each offers a secluded, upscale experience rooted in local terrain and hospitality.",
    about: "Collection of five distinctive family-owned luxury lodges across South Africa's most stunning locations, from exclusive ocean-view properties near Cape Town to intimate game reserve experiences near Kruger National Park. Each lodge provides personalized upscale hospitality, dedicated concierge services, guided cultural experiences, and immersive connections to South Africa's diverse landscapes and local heritage.",
    websiteUrl: "https://www.tintswalo.com/",
    image: "/tintswalo-store.webp",
    order: 12,
    moreInfoRoute: "/resources/stores/tintswalo-lodge"
  },
  {
    name: "Swest Kicks",
    slug: "swest-kicks",
    category: "Fashion & Apparel",
    excerpt: "One of South Africa's leading retailers for exclusive sneakers and streetwear, both online and via a concept store in Cape Town. Emphasises authenticity, limited drops and culture-driven design—from night-outs to street fashion.",
    about: "Established leader in South Africa's exclusive sneaker and streetwear culture with both comprehensive online platform and physical Cape Town concept store. Focuses on authentic limited drops, underground designer collaborations, and cultural programming that bridges street fashion with high-end collectible sneaker investment—celebrating sneaker culture, music, and community.",
    websiteUrl: "https://swestkicks.co.za/",
    image: "/swestkicks-store.webp",
    order: 13,
    moreInfoRoute: "/resources/stores/swest-kicks"
  },
  {
    name: "Soul Gallery",
    slug: "soul-gallery",
    category: "Fashion & Apparel",
    excerpt: "Located in Sandton City, Soul Gallery brings together luxury designer fashion, sneaker-editions, and an immersive flagship atmosphere. The store blends global labels with African artistry, creating a destination shopping experience.",
    about: "Flagship Sandton City luxury destination merging international fashion powerhouses with African artistry and creative expression. Curates luxury designer collections, exclusive sneaker editions, and provides immersive retail experiences in a meticulously designed space. Serves as cultural destination for trend-conscious collectors and luxury enthusiasts seeking unique fashion narratives.",
    websiteUrl: "https://soulgallery.co.za/",
    image: "/soulgallery-store.webp",
    order: 14,
    moreInfoRoute: "/resources/stores/soul-gallery"
  },
  {
    name: "Subwear",
    slug: "subwear",
    category: "Fashion & Apparel",
    excerpt: "Since 1997, Subwear has specialised in premium multi-brand streetwear and denim, curating top labels such as Diesel, G-Star RAW and Replay. Serves fashion-forward shoppers looking for authentic global trends in South Africa.",
    about: "Premier multi-brand streetwear and denim specialist operating since 1997, serving fashion-forward South Africans with over two decades of expertise. Curates distinguished international labels including Diesel, G-Star RAW, and Replay alongside emerging designers. Known for deep product knowledge, personalized styling advice, and commitment to authentic global trend curation.",
    websiteUrl: "https://www.subwear.co.za/",
    image: "/subwear-store.webp",
    order: 15,
    moreInfoRoute: "/resources/stores/subwear"
  },
  {
    name: "Cultish",
    slug: "cultish",
    category: "Fashion & Apparel",
    excerpt: "A South African fashion brand and boutique (Cape Town and Johannesburg) known for bold, gender-neutral designs rooted in street culture. Pieces emphasise craftsmanship, statement silhouettes and a rebellious aesthetic merging luxury with attitude.",
    about: "Distinctly South African fashion brand and boutique (with locations in Cape Town and Johannesburg) celebrating bold, gender-neutral design rooted in street culture and creative rebellion. Each piece emphasizes artistic craftsmanship, striking silhouettes, and personal expression—merging rebellious aesthetics with accessible luxury for individuals who embrace fashion as identity statement.",
    websiteUrl: "https://cultish.com/",
    image: "/cultish-store.webp",
    order: 16,
    moreInfoRoute: "/resources/stores/cultish"
  },
  {
    name: "Goodman Gallery",
    slug: "goodman-gallery",
    category: "Art & Culture",
    excerpt: "Founded in 1966, Goodman Gallery is an influential contemporary art gallery with locations in Johannesburg, Cape Town and London. Represents visionary artists who challenge societal norms and fosters cultural discourse through art.",
    about: "Influential contemporary art gallery established 1966 with locations in Johannesburg, Cape Town, and London. Represents visionary artists who challenge societal conventions and advance critical cultural discourse. Fosters meaningful dialogues around contemporary art, supports emerging African voices, and maintains international influence in shaping contemporary art landscape.",
    websiteUrl: "https://goodman-gallery.com/",
    image: "/goodmangallery-store.webp",
    order: 17,
    moreInfoRoute: "/resources/stores/goodman-gallery"
  },
  {
    name: "Story",
    slug: "story",
    category: "Fashion & Apparel",
    excerpt: "A premium consignment retail concept launched in Cape Town in 2020, specialising in authentic sneakers, collectible apparel, and accessories. Founded by sneaker-enthusiasts, it provides a curated space for rare drops and high-end resale.",
    about: "Premium consignment retail concept launched Cape Town 2020, specializing in authenticated sneakers, collectible apparel, and designer accessories. Founded by sneaker enthusiasts and collectors, Story provides expertly curated rare limited drops and high-end resale marketplace with rigorous verification standards and community-focused programming around sneaker culture.",
    websiteUrl: "https://story.capetown",
    image: "/story-store.webp",
    order: 18,
    moreInfoRoute: "/resources/stores/story"
  },
  {
    name: "Thobela Cars",
    slug: "thobela-cars",
    category: "Automotive",
    excerpt: "A luxury-car dealership in South Africa, located in Sandton's landmark 'The Leonardo' building. Offers high-end vehicle sales, bespoke service and experiences for affluent buyers seeking premium automotive brands.",
    about: "Luxury automotive dealership located in Sandton's iconic Leonardo building, specializing in premium vehicle sales, bespoke concierge services, and exclusive driving experiences. Caters to high-net-worth clientele seeking top-tier automotive brands with personalized consultations, comprehensive after-sales support, and access to rare collector vehicles.",
    websiteUrl: "https://www.thobela-cars.co.za/",
    image: "/thobelacars-store.webp",
    order: 19,
    moreInfoRoute: "/resources/stores/thobela-cars"
  },
  {
    name: "Watch Channel",
    slug: "watch-channel",
    category: "Jewellery & Collectibles",
    excerpt: "Specialises in new and pre-owned luxury timepieces, offering diligent authentication and trade services. Serves collectors and enthusiasts looking to buy or sell pieces from top watchmakers with trust and expertise.",
    about: "Specialized luxury timepiece retailer offering new and pre-owned watches from prestigious manufacturers. Provides expert authentication, professional valuation services, trade-in programs, and personalized collector consultations. Serves discerning watch enthusiasts and collectors seeking trusted expertise, provenance verification, and access to investment-grade timepieces.",
    websiteUrl: "https://thewatchchannel.co.za/",
    image: "/watchchannel-store.webp",
    order: 20,
    moreInfoRoute: "/resources/stores/watch-channel"
  },
  {
    name: "SuperSpar Royal Ascot",
    slug: "superspar-royal-ascot",
    category: "Grocery & Retail",
    excerpt: "An upscale, full-service retailer in Milnerton offering groceries, fresh produce, deli, wine and premium household products. Adjacent Topps provides an extensive selection of wines and spirits—making the pair a lifestyle-focused retail hub.",
    about: "Upscale full-service retailer in Milnerton featuring premium groceries, fresh produce, artisanal deli selections, fine wines, and specialty household products. Adjacent Topps wine boutique provides extensive wine and spirits selection. Together they form comprehensive lifestyle shopping destination for discerning consumers seeking gourmet provisions and premium retail experience.",
    websiteUrl: "https://www.spar.co.za/home/store-view/superspar-royal-ascot-western-cape",
    image: "/spar-store.webp",
    order: 21,
    moreInfoRoute: "/resources/stores/superspar-royal-ascot"
  },
  {
    name: "Luxity",
    slug: "luxity",
    category: "Fashion & Apparel",
    excerpt: "South Africa's premier omnichannel boutique for authenticated pre-owned luxury goods. Buys and sells designer handbags, watches, shoes and accessories, offering access to high-end labels at more accessible prices.",
    about: "South Africa's leading omnichannel boutique for authenticated pre-owned luxury goods, democratizing access to premium designer fashion. Specializes in buying and selling authenticated pre-owned designer handbags, watches, shoes, and accessories from top fashion houses. Offers quality assurance, competitive pricing, and trusted marketplace for luxury consumers seeking value without compromise.",
    websiteUrl: "https://luxity.co.za",
    image: "/luxity-store copy.webp",
    order: 22,
    moreInfoRoute: "/resources/stores/luxity"
  },
  {
    name: "Ritual",
    slug: "ritual",
    category: "Fashion & Apparel",
    excerpt: "A limited-time pop-up concept store bringing British luxury fashion label REPRESENT to South Africa for the first time. Founded by Victor Barbosa and Byron Ryan, Ritual showcases REPRESENT's four core collections—mainline, INITIAL loungewear, OWNERS' CLUB, and 247 technical wear—plus progressive footwear.",
    about: "Limited-time pop-up concept store introducing British luxury fashion label REPRESENT to South Africa for the first time. Showcases REPRESENT's four core collections—mainline luxury apparel, INITIAL loungewear comfort line, OWNERS' CLUB exclusive pieces, and 247 technical wear—alongside progressive international footwear collaborations and limited-edition drops.",
    websiteUrl: "https://www.instagram.com/ritual_concept_store/?hl=en",
    image: "/ritual-store.webp",
    order: 23,
    moreInfoRoute: "/resources/stores/ritual"
  }
];

export const categories = [
  "All",
  "Art & Culture",
  "Automotive",
  "Electronics",
  "Entertainment & Gaming",
  "Fashion & Apparel",
  "Grocery & Retail",
  "Home & Kitchen",
  "Hospitality",
  "Jewellery & Collectibles"
];
