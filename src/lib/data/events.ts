export interface EventVideo {
  videoId: string;
  title: string;
}

export interface TimezoneEntry {
  city: string;
  timezone: string;
  localTime: string;
  date: string;
}

export interface EventData {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  status: "upcoming" | "past";
  registrationUrl?: string;
  talkProposalUrl?: string;
  talkProposalDeadline?: string;
  contactName: string;
  contactEmail: string;
  contactHandle: string;
  introHtml: string;
  videos: EventVideo[];
  timezones: TimezoneEntry[];
  license: string;
}

export const eventsData: EventData[] = [
  {
    slug: "4th-user-meeting",
    title: "4th PyPSA User Meeting",
    date: "2026-06-29",
    time: "4:00 pm – 6:30 pm (CEST)",
    location: "Online",
    isOnline: true,
    status: "upcoming",
    registrationUrl: "https://tu-berlin.zoom-x.de/meeting/register/n0OZHUmUSe2krwInnPOJ-Q",
    talkProposalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdpE_niRgc3Kb_hJYgaLqxNgaNcMQ_pE0Z52LXHaKeNmVUy9Q/viewform?usp=publish-editor",
    talkProposalDeadline: "June 7, 2026",
    contactName: "Lukas Trippe",
    contactEmail: "l.trippe@tu-berlin.de",
    contactHandle: "@lkstrp",
    introHtml:
      'Do you sometimes wonder how others are using PyPSA and which problems they solve? Want to share what you\'ve been building with the community? Then come and join us at the 4th PyPSA User Meeting! Expect lightning talks, live Q&amp;A, and breakout discussions. Open to all.',
    videos: [
      { videoId: "fmwDxNpSMM4", title: "1st PyPSA User Meeting - October 21, 2022" },
      { videoId: "43DK6_kFfN0", title: "2nd PyPSA User Meeting - May 27, 2024" },
      {
        videoId: "oZdw-51tVGk",
        title:
          "Risk and Reward of Transitioning from a National to a Zonal Electricity Market in Great Britain",
      },
      {
        videoId: "cTEaI3qr0t8",
        title:
          "PyPSA-RSA-Sec: Open Source Modelling of Defossilisation and Power-to-X for South Africa",
      },
      {
        videoId: "TZWoY5i861w",
        title: "Assess Space-Based Solar Power for European-Scale Power System Decarbonization",
      },
      { videoId: "EcKnEjtXQmQ", title: "Open TYNDP with PyPSA" },
      {
        videoId: "o_Gv1BDSszU",
        title:
          "A PyPSA-PH Case Study: Will Hydrogen ever have a role on Grid and Off-grid Island Electrification?",
      },
      { videoId: "rY2lVD7E3-w", title: "PyPSA meets BZR data" },
      {
        videoId: "IHl25FULNV4",
        title:
          "Nodal and Quasi-Zonal Approaches to Modelling the Australian National Electricity Market",
      },
    ],
    timezones: [
      { city: "Pago Pago", timezone: "UTC-11", localTime: "03:00", date: "29 Jun 2026" },
      { city: "Honolulu", timezone: "UTC-10", localTime: "04:00", date: "29 Jun 2026" },
      { city: "Anchorage", timezone: "UTC-8", localTime: "06:00", date: "29 Jun 2026" },
      { city: "Vancouver", timezone: "UTC-7", localTime: "07:00", date: "29 Jun 2026" },
      { city: "Los Angeles", timezone: "UTC-7", localTime: "07:00", date: "29 Jun 2026" },
      { city: "San Francisco", timezone: "UTC-7", localTime: "07:00", date: "29 Jun 2026" },
      { city: "Tijuana", timezone: "UTC-7", localTime: "07:00", date: "29 Jun 2026" },
      { city: "Phoenix", timezone: "UTC-7", localTime: "07:00", date: "29 Jun 2026" },
      { city: "Denver", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "Edmonton", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "Mexico City", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "Guatemala City", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "San Salvador", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "Tegucigalpa", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "Managua", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "San José CR", timezone: "UTC-6", localTime: "08:00", date: "29 Jun 2026" },
      { city: "Chicago", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "Houston", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "Dallas", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "Kingston", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "Bogotá", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "Lima", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "Quito", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "Panamá", timezone: "UTC-5", localTime: "09:00", date: "29 Jun 2026" },
      { city: "New York", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Toronto", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Miami", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Washington DC", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Atlanta", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Havana", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Santiago", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Caracas", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "Santo Domingo", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "San Juan PR", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "La Paz", timezone: "UTC-4", localTime: "10:00", date: "29 Jun 2026" },
      { city: "São Paulo", timezone: "UTC-3", localTime: "11:00", date: "29 Jun 2026" },
      { city: "Buenos Aires", timezone: "UTC-3", localTime: "11:00", date: "29 Jun 2026" },
      { city: "Rio de Janeiro", timezone: "UTC-3", localTime: "11:00", date: "29 Jun 2026" },
      { city: "Montevideo", timezone: "UTC-3", localTime: "11:00", date: "29 Jun 2026" },
      { city: "Asunción", timezone: "UTC-3", localTime: "11:00", date: "29 Jun 2026" },
      { city: "Reykjavik", timezone: "UTC+0", localTime: "14:00", date: "29 Jun 2026" },
      { city: "Azores", timezone: "UTC+0", localTime: "14:00", date: "29 Jun 2026" },
      { city: "Dakar", timezone: "UTC+0", localTime: "14:00", date: "29 Jun 2026" },
      { city: "Accra", timezone: "UTC+0", localTime: "14:00", date: "29 Jun 2026" },
      { city: "Monrovia", timezone: "UTC+0", localTime: "14:00", date: "29 Jun 2026" },
      { city: "Lisbon", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "London", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Dublin", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Casablanca", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Lagos", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Kinshasa", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Luanda", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Algiers", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Tunis", timezone: "UTC+1", localTime: "15:00", date: "29 Jun 2026" },
      { city: "Berlin", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Paris", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Madrid", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Barcelona", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Rome", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Milan", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Amsterdam", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Brussels", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Zurich", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Vienna", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Prague", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Budapest", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Warsaw", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Stockholm", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Oslo", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Copenhagen", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Belgrade", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Johannesburg", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Cape Town", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Harare", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Maputo", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Tripoli", timezone: "UTC+2", localTime: "16:00", date: "29 Jun 2026" },
      { city: "Helsinki", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Tallinn", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Riga", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Athens", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Bucharest", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Sofia", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Cairo", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Nairobi", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Addis Ababa", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Dar es Salaam", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Kampala", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Mogadishu", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Moscow", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Istanbul", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Kyiv", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Ankara", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Riyadh", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Baghdad", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Doha", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Kuwait City", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Amman", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Beirut", timezone: "UTC+3", localTime: "17:00", date: "29 Jun 2026" },
      { city: "Tehran", timezone: "UTC+3.5", localTime: "17:30", date: "29 Jun 2026" },
      { city: "Dubai", timezone: "UTC+4", localTime: "18:00", date: "29 Jun 2026" },
      { city: "Abu Dhabi", timezone: "UTC+4", localTime: "18:00", date: "29 Jun 2026" },
      { city: "Muscat", timezone: "UTC+4", localTime: "18:00", date: "29 Jun 2026" },
      { city: "Baku", timezone: "UTC+4", localTime: "18:00", date: "29 Jun 2026" },
      { city: "Tbilisi", timezone: "UTC+4", localTime: "18:00", date: "29 Jun 2026" },
      { city: "Yerevan", timezone: "UTC+4", localTime: "18:00", date: "29 Jun 2026" },
      { city: "Kabul", timezone: "UTC+4.5", localTime: "18:30", date: "29 Jun 2026" },
      { city: "Karachi", timezone: "UTC+5", localTime: "19:00", date: "29 Jun 2026" },
      { city: "Lahore", timezone: "UTC+5", localTime: "19:00", date: "29 Jun 2026" },
      { city: "Islamabad", timezone: "UTC+5", localTime: "19:00", date: "29 Jun 2026" },
      { city: "Tashkent", timezone: "UTC+5", localTime: "19:00", date: "29 Jun 2026" },
      { city: "Almaty", timezone: "UTC+5", localTime: "19:00", date: "29 Jun 2026" },
      { city: "Mumbai", timezone: "UTC+5.5", localTime: "19:30", date: "29 Jun 2026" },
      { city: "New Delhi", timezone: "UTC+5.5", localTime: "19:30", date: "29 Jun 2026" },
      { city: "Bangalore", timezone: "UTC+5.5", localTime: "19:30", date: "29 Jun 2026" },
      { city: "Chennai", timezone: "UTC+5.5", localTime: "19:30", date: "29 Jun 2026" },
      { city: "Hyderabad", timezone: "UTC+5.5", localTime: "19:30", date: "29 Jun 2026" },
      { city: "Colombo", timezone: "UTC+5.5", localTime: "19:30", date: "29 Jun 2026" },
      { city: "Kathmandu", timezone: "UTC+5.75", localTime: "19:45", date: "29 Jun 2026" },
      { city: "Dhaka", timezone: "UTC+6", localTime: "20:00", date: "29 Jun 2026" },
      { city: "Yangon", timezone: "UTC+6.5", localTime: "20:30", date: "29 Jun 2026" },
      { city: "Bangkok", timezone: "UTC+7", localTime: "21:00", date: "29 Jun 2026" },
      { city: "Ho Chi Minh", timezone: "UTC+7", localTime: "21:00", date: "29 Jun 2026" },
      { city: "Hanoi", timezone: "UTC+7", localTime: "21:00", date: "29 Jun 2026" },
      { city: "Jakarta", timezone: "UTC+7", localTime: "21:00", date: "29 Jun 2026" },
      { city: "Phnom Penh", timezone: "UTC+7", localTime: "21:00", date: "29 Jun 2026" },
      { city: "Singapore", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Kuala Lumpur", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Beijing", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Shanghai", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Shenzhen", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Hong Kong", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Taipei", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Manila", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Perth", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Ulaanbaatar", timezone: "UTC+8", localTime: "22:00", date: "29 Jun 2026" },
      { city: "Tokyo", timezone: "UTC+9", localTime: "23:00", date: "29 Jun 2026" },
      { city: "Seoul", timezone: "UTC+9", localTime: "23:00", date: "29 Jun 2026" },
      { city: "Pyongyang", timezone: "UTC+9", localTime: "23:00", date: "29 Jun 2026" },
      { city: "Darwin", timezone: "UTC+9.5", localTime: "23:30", date: "29 Jun 2026" },
      { city: "Adelaide", timezone: "UTC+9.5", localTime: "23:30", date: "29 Jun 2026" },
      { city: "Brisbane", timezone: "UTC+10", localTime: "00:00", date: "30 Jun 2026" },
      { city: "Melbourne", timezone: "UTC+10", localTime: "00:00", date: "30 Jun 2026" },
      { city: "Sydney", timezone: "UTC+10", localTime: "00:00", date: "30 Jun 2026" },
      { city: "Guam", timezone: "UTC+10", localTime: "00:00", date: "30 Jun 2026" },
      { city: "Port Moresby", timezone: "UTC+10", localTime: "00:00", date: "30 Jun 2026" },
      { city: "Vladivostok", timezone: "UTC+10", localTime: "00:00", date: "30 Jun 2026" },
      { city: "Noumea", timezone: "UTC+11", localTime: "01:00", date: "30 Jun 2026" },
      { city: "Wellington", timezone: "UTC+12", localTime: "02:00", date: "30 Jun 2026" },
      { city: "Auckland", timezone: "UTC+12", localTime: "02:00", date: "30 Jun 2026" },
      { city: "Fiji", timezone: "UTC+12", localTime: "02:00", date: "30 Jun 2026" },
      { city: "Tonga", timezone: "UTC+13", localTime: "03:00", date: "30 Jun 2026" },
      { city: "Samoa", timezone: "UTC+13", localTime: "03:00", date: "30 Jun 2026" },
    ],
    license: "CC BY 4.0",
  },
];
