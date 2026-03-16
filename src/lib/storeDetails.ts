export interface StoreLocation {
  name: string;
  address: string;
  city: string;
  phone?: string;
}

export interface StoreDetailData {
  locations: StoreLocation[];
}

export const storeDetailsMap: Record<string, StoreDetailData> = {
  'scoin': {
    locations: [
      {
        name: 'Sandton City, Johannesburg',
        address: 'Level 6, Sandton City Shopping Centre, 83 Rivonia Road',
        city: 'Sandton 2196',
        phone: '011 784 8525'
      },
      {
        name: 'Eastgate, Bedfordview',
        address: 'Eastgate Shopping Centre, 43 Bradford Road',
        city: 'Bedfordview',
        phone: '011 615 8407'
      },
      {
        name: 'Brooklyn Mall, Pretoria',
        address: 'Brooklyn Mall, c/o Fehrsen & Bronkhorst streets',
        city: 'Nieuw Muckleneuk, Pretoria',
        phone: ''
      },
      {
        name: 'The MARC (Head Office), Sandton',
        address: 'Corner Rivonia & Maude Streets',
        city: 'Sandton',
        phone: ''
      },
      {
        name: 'Somerset Mall, Somerset West',
        address: 'Shop 77, Ground Floor (Entrance 1), Somerset Mall',
        city: 'Somerset West',
        phone: '011 784 8551'
      },
      {
        name: 'Canal Walk, Century City',
        address: 'Shop 211, Canal Walk Shopping Centre, Century Place Boulevard',
        city: 'Cape Town',
        phone: ''
      },
      {
        name: 'V&A Waterfront, Cape Town',
        address: 'Shop No 101, Lower Level, Victoria Wharf Shopping Centre',
        city: 'V&A Waterfront',
        phone: ''
      },
      {
        name: 'Athlone Circle, Pietermaritzburg',
        address: 'Athlone Circle (KZN office)',
        city: 'Pietermaritzburg',
        phone: ''
      },
      {
        name: 'Pavilion Mall, Westville',
        address: '5 Jack Martens Drive, The Pavilion Mall',
        city: 'Westville',
        phone: ''
      },
      {
        name: 'Gateway Theatre of Shopping, Umhlanga',
        address: '1 Palm Boulevard, Gateway Theatre of Shopping',
        city: 'Umhlanga Ridge',
        phone: ''
      },
      {
        name: 'Walmer Park, Gqeberha',
        address: 'Walmer Park Shopping Centre, 14th Avenue & Main Road',
        city: 'Port Elizabeth (Gqeberha)',
        phone: '+27 41 367 4257'
      }
    ]
  },
  'istore': {
    locations: [
      {
        name: 'Sandton City, Johannesburg',
        address: 'Shop BC37A, Sandton City Mall',
        city: 'Sandton 2196',
        phone: ''
      },
      {
        name: 'Canal Walk, Cape Town',
        address: 'Shop 428, Canal Walk Shopping Centre, Century Place Blvd 7446',
        city: 'Cape Town',
        phone: ''
      },
      {
        name: 'Sandton Drive, Johannesburg',
        address: 'Corner Sandton Drive & Alice Lane',
        city: 'Sandton 2146',
        phone: ''
      },
      {
        name: 'Queens Hotel',
        address: 'Dock Road Junction (corner of Stanley & Dock Roads)',
        city: 'V&A Waterfront',
        phone: ''
      },
      {
        name: 'V&A Waterfront, Cape Town',
        address: 'Victoria Wharf Shopping Centre',
        city: 'V&A Waterfront, Cape Town',
        phone: ''
      }
    ]
  },
  'al-capone-premium': {
    locations: [
      {
        name: 'Sandton City',
        address: 'Shop U32, 83 Rivonia Road, Sandton City Mall',
        city: 'Johannesburg',
        phone: ''
      },
      {
        name: 'Mall of Africa, Midrand',
        address: 'Shop 2231, Magwa Crescent',
        city: 'Midrand 1686',
        phone: '066 372 0698'
      },
      {
        name: 'V&A Waterfront, Cape Town',
        address: 'Victoria Wharf',
        city: 'V&A Waterfront',
        phone: '061 016 7494'
      }
    ]
  },
  'court-order': {
    locations: [
      {
        name: 'Rosebank, Johannesburg',
        address: 'Shop 106 Upper Level, The Zone@Rosebank, 177 Oxford Rd',
        city: 'Rosebank 2196',
        phone: '011 268 1604'
      },
      {
        name: 'Roeland Street, Cape Town',
        address: 'Ground Floor, Hip Hop Plaza, 39 Roeland Street',
        city: 'Cape Town 8000',
        phone: '021 461 0710'
      },
      {
        name: 'Gateway, Umhlanga',
        address: 'Shop F136, Gateway Theatre of Shopping, 1 Palm Boulevard',
        city: 'Umhlanga Ridge 4139',
        phone: '067 994 9105'
      },
      {
        name: 'V&A Waterfront, Cape Town',
        address: 'Shop 7216B, Victoria Wharf, 19 Dock Road',
        city: 'Cape Town 8001',
        phone: '021 879 1174'
      }
    ]
  },
  'hydraulics': {
    locations: [
      {
        name: 'Hydraulics Avantgarde Sandton',
        address: 'Shop U08, Sandton City Mall, 83 Rivonia Road',
        city: 'Sandton 2196',
        phone: '087 149 1304'
      },
      {
        name: 'Hydraulics Mall of Africa, Midrand',
        address: 'Shop 2230, Mall of Africa, Magwa Crescent',
        city: 'Midrand 1686',
        phone: '011 517 2435'
      },
      {
        name: 'Hydraulics Cape Town, V&A Waterfront',
        address: 'Shop 7216A, 19 Dock Road',
        city: 'V&A Waterfront, Cape Town 8001',
        phone: '021 569 7083 / 064 760 8134'
      }
    ]
  },
  'le-creuset': {
    locations: [
      {
        name: 'Sandton City',
        address: 'Sandton City Mall',
        city: 'Sandton',
        phone: '011 784 0301'
      },
      {
        name: 'Mall of Africa, Midrand',
        address: 'Shop 2040, Entrance 22, Upper Level 5',
        city: 'Midrand',
        phone: '011 568 2097'
      },
      {
        name: 'V&A Waterfront, Cape Town',
        address: 'Shop 6197, Ground Level, Victoria Wharf Shopping Centre',
        city: 'Cape Town',
        phone: '+27 21 421 8521'
      },
      {
        name: 'Gateway, Durban',
        address: 'Shop G158, Ground Floor, Entrance 7, Gateway Theatre of Shopping',
        city: 'Durban',
        phone: '031 100 1239'
      }
    ]
  },
  'tintswalo-lodge': {
    locations: [
      {
        name: 'Tintswalo Atlantic',
        address: "Chapman's Peak Drive (overlooking Atlantic Ocean)",
        city: 'Hout Bay, Cape Town',
        phone: 'Reservations: +27 21 773 0900 / Reception: +27 21 201 0025'
      },
      {
        name: 'Tintswalo Boulders',
        address: 'Boulders Beach',
        city: "Simon's Town",
        phone: '+27 21 612 1113'
      },
      {
        name: 'Tintswalo Safari Lodge',
        address: 'Manyeleti Game Reserve (bordering Kruger National Park)',
        city: 'Kruger National Park',
        phone: '+27 15 793 9013'
      }
    ]
  },
  'swest-kicks': {
    locations: [
      {
        name: 'Cape Town City Centre',
        address: '111 Loop Street',
        city: 'Cape Town',
        phone: ''
      }
    ]
  },
  'soul-gallery': {
    locations: [
      {
        name: 'Sandton City, Johannesburg',
        address: 'Shop BC22, Sandton City Mall',
        city: 'Johannesburg',
        phone: ''
      }
    ]
  },
  'subwear': {
    locations: [
      {
        name: 'Rosebank, Johannesburg',
        address: 'Shop FF13A, The Zone @ Rosebank',
        city: 'Johannesburg',
        phone: '011 327 6261'
      }
    ]
  },
  'cultish': {
    locations: [
      {
        name: 'Rosebank Mall, Johannesburg',
        address: 'Shop 281, Level 2 (Entrance Cradock Avenue), Rosebank Mall',
        city: 'Johannesburg',
        phone: '066 540 3481'
      },
      {
        name: 'Bree Street, Cape Town',
        address: '133 Bree Street (Flagship store)',
        city: 'Cape Town',
        phone: 'WhatsApp: +27 79 286 5272'
      }
    ]
  },
  'diesel': {
    locations: [
      {
        name: 'Sandton City',
        address: 'Shop L73, Sandton City Mall',
        city: 'Sandton',
        phone: '087 365 3887'
      },
      {
        name: 'V&A Waterfront, Cape Town',
        address: 'Shop 6267, Upper Level, Victoria Wharf Shopping Centre',
        city: 'Cape Town',
        phone: '+27 87 365 3926 / 021 425 5780'
      }
    ]
  },
  'goodman-gallery': {
    locations: [
      {
        name: 'Cape Town',
        address: '37A Somerset Road, De Waterkant',
        city: 'Cape Town',
        phone: ''
      },
      {
        name: 'Johannesburg',
        address: '163 Jan Smuts Avenue, Parkwood',
        city: 'Johannesburg',
        phone: ''
      }
    ]
  },
  'story': {
    locations: [
      {
        name: 'Cape Town',
        address: '166 Buitengracht Street, Cape Town City Centre',
        city: 'Cape Town',
        phone: ''
      }
    ]
  },
  'thobela-cars': {
    locations: [
      {
        name: 'The Leonardo, Sandton',
        address: '75 Maude Street, The Leonardo (Legacy Hotels)',
        city: 'Sandton',
        phone: '+27 61 451 7308'
      }
    ]
  },
  'amiri': {
    locations: [
      {
        name: 'Sandton City, Diamond Walk',
        address: 'Shop U20, Diamond Walk, Sandton City Mall, 83 Rivonia Road',
        city: 'Sandton',
        phone: '083 493 4068'
      },
      {
        name: 'V&A Waterfront',
        address: 'Diamond Walk Court, Victoria Wharf',
        city: 'V&A Waterfront, Cape Town',
        phone: ''
      }
    ]
  },
  'yawa-africa': {
    locations: [
      {
        name: 'Sandton City Pop-up',
        address: 'Diamond Walk Court, Sandton City',
        city: 'Sandton',
        phone: '084 248 4602'
      },
      {
        name: 'V&A Waterfront',
        address: 'Victoria Wharf',
        city: 'V&A Waterfront, Cape Town',
        phone: ''
      }
    ]
  },
  'watch-channel': {
    locations: [
      {
        name: 'Sandton',
        address: '1st Floor Bowmans Building, 11 Alice Lane',
        city: 'Sandton 2196',
        phone: '010 010 0395 / 064 907 0700'
      }
    ]
  },
  'superspar-royal-ascot': {
    locations: [
      {
        name: 'Royal Ascot SuperSpar, Milnerton',
        address: '1 Racecourse Road, The Paddocks Shopping Centre',
        city: 'Milnerton',
        phone: '021 555 2698'
      },
      {
        name: 'Topps @ Royal Ascot (Liquor Store)',
        address: 'The Paddocks Shopping Centre, Race Course Way',
        city: 'Milnerton',
        phone: '021 555 2698'
      }
    ]
  },
  'luxity': {
    locations: [
      {
        name: 'Sandton City',
        address: 'Shop U57, Level 6, Sandton City Shopping Centre, 83 Rivonia Road, Sandhurst',
        city: 'Sandton 2196',
        phone: '010 020 6171'
      },
      {
        name: 'V&A Waterfront',
        address: 'Shop 6201 (formerly Journey), Upper Level, Victoria Wharf Shopping Centre',
        city: 'Cape Town',
        phone: '+27 10 020 6171'
      }
    ]
  },
  'ritual': {
    locations: [
      {
        name: 'V&A Waterfront',
        address: 'Victoria Wharf',
        city: 'V&A Waterfront, Cape Town',
        phone: ''
      },
      {
        name: 'Sandton City',
        address: 'Sandton City',
        city: 'Sandton',
        phone: ''
      }
    ]
  }
};
