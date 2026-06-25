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

export interface AgendaItem {
  type?: "talk" | "special"; // default "talk"; "special" = Welcome/Break/News
  time?: string; // "16:00" — only set on the 4 anchor items
  title: string; // talk title, or label ("Welcome"/"Break"/"News from PyPSA")
  speaker?: string;
  affiliation?: string;
  image?: string; // speaker photo URL; falls back to a placeholder icon
  linkedin?: string; // speaker LinkedIn profile URL
  email?: string; // speaker contact email
  website?: string; // speaker personal website URL
  abstract?: string; // verbatim; \n\n preserved for multi-paragraph
  links?: string[]; // 0..n project URLs
  points?: string[]; // sub-bullets (used by the simple bullet-list agenda); title may contain inline HTML
}

export interface EventData {
  slug: string;
  title: string;
  date: string;
  endDate?: string; // "YYYY-MM-DD" — multi-day end; start stays in `date`
  time: string;
  location: string;
  isOnline: boolean;
  bannerImage?: string; // per-event banner path; banner renders only if set
  organizers?: { name: string; url?: string; logo?: string }[]; // overrides the default TU Berlin & PyPSA meets Earth line
  people?: { name: string; imageUrl: string; url: string }[]; // participants (avatars/links from contributors data)
  status: "upcoming" | "past";
  registrationUrl?: string;
  talkProposalUrl?: string;
  talkProposalDeadline?: string;
  contactName: string;
  contactEmail: string;
  contactHandle: string;
  contactHtml?: string; // overrides the default Contact paragraph (e.g. invite-only events)
  introHtml: string;
  agenda?: AgendaItem[];
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
    bannerImage: "/img/4th-user-meeting-banner.jpg",
    status: "upcoming",
    registrationUrl: "https://tu-berlin.zoom-x.de/meeting/register/n0OZHUmUSe2krwInnPOJ-Q",
    contactName: "Lukas Trippe",
    contactEmail: "l.trippe@tu-berlin.de",
    contactHandle: "@lkstrp",
    introHtml:
      'Do you sometimes wonder how others are using PyPSA and which problems they solve? Want to share what you\'ve been building with the community? Then come and join us at the 4th PyPSA User Meeting! Expect lightning talks, live Q&amp;A, and breakout discussions. Open to all.',
    agenda: [
      { type: "special", time: "16:00", title: "Welcome" },
      {
        time: "16:05",
        title: "Hydropower Integration in PyPSA: Lessons from Asia and Africa",
        speaker: "Priyesh Gosai",
        affiliation: "Innovate for Impact",
        image: "/img/speakers/priyesh-gosai.jpg",
        linkedin: "https://www.linkedin.com/in/gosaip",
        email: "priyesh@innovateimpact.com",
        abstract:
          "Hydropower is a critical yet often underrepresented component of energy system models. This presentation addresses practical approaches to realistically modelling hydropower integration in energy system planning tools, with an emphasis on cascaded hydro systems that require careful consideration to adequately depict real-world operation.\n\nRecent features added to PyPSA have enabled modellers to capture the complexities of hydropower operations. Case studies from Africa and Asia will demonstrate how PyPSA can be used to represent reservoir dynamics, intra-seasonal variability, and water-energy nexus constraints.",
      },
      {
        title:
          "Technology configurations for decarbonizing residential heat supply through district heating and implications for the electricity network",
        speaker: "Christian Doh Dinga",
        affiliation: "Delft University of Technology",
        image: "/img/speakers/christian-doh-dinga.jpg",
        email: "c.dohdinga@tudelft.nl",
        abstract:
          "In this presentation, we will show how we implement a modeling to generate alternative algorithm (SPORES) from Calliope into PyPSA, and how we used it to investigate diverse near-optimal pathways for decarbonizing a large district heating network in the Netherlands, while simultaneously quantifying the impacts of each pathway on the local electricity network.",
        links: ["https://doi.org/10.48550/arXiv.2603.12202"],
      },
      {
        title: "Open-TYNDP with PyPSA",
        speaker: "Measrainsey Meng",
        affiliation: "Open Energy Transition (OET)",
        image: "/img/speakers/measrainsey-meng.jpg",
        linkedin: "https://www.linkedin.com/in/measrainsey",
        abstract:
          "The Ten-Year Network Development Plan (TYNDP) is the pan-European infrastructure planning process of ENTSO-E, the association of European transmission system operators, producing scenarios and cost-benefit assessments for transmission investment decisions across Europe. Open-TYNDP is an open-source energy system model that implements the TYNDP 2024 methodology and data, using an approach consistent with that of the proprietary and open-source tools developed within the ENTSO-E TYNDP process. Built as a soft-fork of PyPSA-Eur, it covers both the Scenario Building (SB) and Cost-Benefit Analysis (CBA) workflow. Developed by Open Energy Transition (OET) in coordination with ENTSO-E, the model is fully auditable and reproducible. It enables TSOs, authorities, industry associations, researchers, and other stakeholders to understand how outcomes can be produced, verify them independently, and build trust in the results. The input data encompasses reference grids, final energy demand, capacity factors, and installed capacities, all aligned to TYNDP 2024 inputs and assumptions. The model then produces optimised supply and transmission, and marginal prices for both electricity and hydrogen. Open-TYNDP follows a structured approach to comparing its outcomes with the TYNDP 2024 results. Outputs are benchmarked systematically against TYNDP 2024 reference data for the NT scenario, to measure discrepancies, trace their causes to specific modelling choices or input differences, and demonstrate that its outcomes are directionally consistent with the established TYNDP methodology. At the CBA level, computed project indicators are compared directly against TYNDP 2024 project assessments. The model closely matches TYNDP 2024 power generation outputs, while hydrogen supply outcomes are broadly comparable; residual deviations are traceable to specific modelling choices or data availability constraints.",
        links: ["https://open-tyndp.openenergytransition.org/"],
      },
      {
        title:
          "Resilience metrics to guide back-up investments in the power system during extreme weather",
        speaker: "Aleksander Grochowicz",
        affiliation: "Technical University of Denmark",
        image: "/img/speakers/aleksander-grochowicz.jpg",
        linkedin: "https://www.linkedin.com/in/aleksander-grochowicz",
        abstract:
          "Security of supply is a common and important concern when integrating renewables in net-zero power systems. Extreme weather affects both demand and supply leading to power system stress; in Europe this stress spreads continentally beyond the meteorological root cause. We use an approach based on shadow prices to identify periods of elevated stress called system-defining events and analyse their impact on the power system. By classifying different types of system-defining events, we identify challenges to power system operation and planning. Crucially, we find the need for sufficient resilience back-up (power) capacities whose financial viability is precarious due to weather variability and weather-induced risk. Furthermore, we disentangle short- and long-term resilience challenges (from multi-day to annual scale) with distinct metrics and stress tests to incorporate both into future energy modelling assessments. Our methodology and implementation in an open energy system model (PyPSA-Eur) can be re-applied to other systems and help researchers and policymakers in building more resilient and adequate energy systems.",
        links: ["https://arxiv.org/abs/2508.05163"],
      },
      {
        title:
          "Bridging plans and energy paths: A multi-nodal prospective analysis of the Spanish electricity generation and transmission system",
        speaker: "Alicia Mortera Canga",
        affiliation: "Imdea Energy",
        image: "/img/speakers/alicia-mortera-canga.jpg",
        linkedin: "https://www.linkedin.com/in/alicia-mortera-canga-1ab004199",
        abstract:
          "National decarbonisation plans are increasingly assessed using open energy system models, yet the connection between policy targets and real deployment trajectories remains limited. In particular, renewable energy projects that are already progressing through administrative authorisation procedures are rarely incorporated into capacity expansion modelling workflows. This work presents a PyPSA-Eur-based methodology to bridge national energy plans and real-world electricity system pathways by combining policy-driven targets, authorised project-level deployment data and spatial network constraints within a myopic modelling framework.\n\nThe methodology is applied to the Spanish electricity system from 2025 to 2050. The standard PyPSA-Eur workflow is adapted by replacing the default power plant dataset with a georeferenced database built from the Spanish official administrative register and complementary national sources. A second dataset is developed from authorised power plant projects, including technology, capacity, location and expected commissioning windows, and is integrated into the model as exogenous near-term capacity additions. The workflow also incorporates a representation of concentrated solar power with thermal storage, a technology that is particularly relevant for Spain due to its existing installed capacity and the presence of plants equipped with thermal storage.\n\nThree modelling perspectives are compared: a fully cost-optimised pathway, a pathway aligned with Spain’s National Energy and Climate Plan, and a deployment-informed pathway based on authorised projects. This approach allows policy targets to be tested against spatially explicit deployment data and network constraints. The results illustrate how different assumptions on near-term capacity additions affect battery deployment, curtailment and nodal self-sufficiency, while all scenarios converge towards a highly renewable system dominated by photovoltaic generation.\n\nOverall, this work shows how PyPSA-Eur can be extended to connect long-term national planning scenarios with administratively authorised project pipelines. The proposed workflow provides a methodological basis to assess whether policy pathways are aligned with the infrastructure that is already under development.",
      },
      { type: "special", time: "17:10", title: "Break" },
      {
        time: "17:20",
        title: "Near-Term Emission Targets Need Immediate Attention in the USA",
        speaker: "Trevor Barnes",
        affiliation: "Simon Fraser University",
        image: "/img/speakers/trevor-barnes.jpg",
        linkedin: "https://www.linkedin.com/in/trevor-barnes",
        abstract:
          "Given recent changes in federal climate policy and timeframe limitations, the United States is unlikely to meet its original 2030 Paris Agreement emission target of a 50-52% reduction from 2005 levels. However, rapid near-term abatement remains achievable through targeted multi-sector energy transitions. Extending the open-source energy system model, PyPSA-USA, to perform multi-sector analysis, we evaluate the primary drivers of USA energy costs and emissions though applying global sensitivity analysis (GSA).\n\nOur results suggest that fossil fuel price volatility is the dominant driver of marginal electricity and energy costs across most of the nation, however, uncoordinated state-level renewable mandates can induce localized cost spikes due to regional bottlenecks. We find that system climate impact (CO2e) is overwhelming sensitive to fugitive methane leakage rates and global warming potential assumptions. Addressing upstream methane leaks will play a crucial role in abating climate-related damages. Finally, demand-side electrification, specifically light-duty electric vehicles and service sector heating, can act as immediate levers for carbon abatement. The results of this work suggest that many of the Inflation Reduction Act's clean energy initiatives, that have since been repealed, are effective near-term solutions to reduce exposure to fossil fuel price and mitigate future financial penalties associated with the rising social cost of carbon.",
        links: [
          "https://github.com/PyPSA/pypsa-usa",
          "https://github.com/DeltaE/pypsa-gsa",
          "https://pypsa-usa-gsa.com/",
        ],
      },
      {
        title: "PyPSA-Canada Framework",
        speaker: "Nathan de Matos",
        affiliation: "Natural Resources Canada",
        image: "/img/speakers/nathan-de-matos.jpg",
        linkedin: "https://www.linkedin.com/in/nathan-de-matos",
        abstract:
          "PyPSA-Canada is an open-source framework which builds on the PyPSA package to provide an automated workflow for modelling Canadian electricity systems at the national and regional levels. This includes a coupled capacity expansion and dispatch model, canada-specific policy constraints and post-processing functions for results analysis.",
        links: ["https://github.com/NRCan/pypsa-canada"],
      },
      {
        title: "Scenario Builder: putting PyPSA in the hands of people who don't write Python",
        speaker: "Edward Terpilowski-Gill",
        affiliation: "TransitionZero",
        image: "/img/speakers/edward-terpilowski-gill.jpg",
        linkedin: "https://www.linkedin.com/in/edward-xavier-terpilowski-gill-8a378055",
        email: "edward.tg@transitionzero.org",
        abstract:
          "PyPSA is a powerful framework, but it remains out of reach for many of the people whose decisions shape the energy transition — analysts in ministries, utility planners, and researchers without a dedicated modelling team. At TransitionZero we've spent the last few years closing that gap with Scenario Builder, a web product that compiles user-defined energy-system scenarios into PyPSA Network objects and runs them as a managed service.\n\nIn this lightning talk I'll show Scenario Builder in a live demo and share what we've learned about deploying PyPSA in a productionised environment.",
        links: ["https://www.transitionzero.org/products/scenario-builder"],
      },
      {
        title: "Python for Food Systems Analysis",
        speaker: "Koen van Greevenbroek",
        affiliation: "Stanford University",
        image: "/img/speakers/koen-van-greevenbroek.jpg",
        linkedin: "https://www.linkedin.com/in/koenvangreevenbroek",
        website: "https://koenvg.com",
        abstract:
          "We introduce GLADE, a global food systems optimisation model built using PyPSA. Encompassing spatially resolved crop and animal production, trade, emissions accounting and health impacts, the model can be used to explore counterfactual food system configurations. In an initial study on the interactions between dietary health burden and greenhouse gas emissions reduction, we show vast potential for improvement on both counts at relatively low cost. GLADE is open source and built on open data: anyone is welcome to use the model for their own research, whether it be food sovereignty, impacts of climate change, biomass potential or other food- and land-use-related questions.",
        links: ["https://github.com/Sustainable-Solutions-Lab/GLADE"],
      },
      { type: "special", time: "18:15", title: "New Features & PyPSA Roadmap" },
    ],
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
  {
    slug: "developer-meeting-2026", // <<CONFIRM>>
    title: "PyPSA Developer Meeting", // <<PROVIDE>>
    date: "2026-07-06",
    endDate: "2026-07-08",
    time: "All day", // free-form; <<PROVIDE if specific>>
    location: "Muncaster, UK",
    isOnline: false,
    organizers: [],
    status: "upcoming",
    contactName: "<<PROVIDE>>",
    contactEmail: "<<PROVIDE>>",
    contactHandle: "<<PROVIDE>>", // e.g. "@lkstrp"
    contactHtml:
      'The PyPSA Developer Meeting is currently invite only. If you would like to get involved, contact us at <a href="mailto:contact@pypsa.org" class="hover:underline" style="color: #c30944;">contact@pypsa.org</a> or reach out to the participants. And you can always engage in the <a href="https://github.com/PyPSA" target="_blank" rel="noopener noreferrer" class="hover:underline" style="color: #c30944;">open-source repositories</a>.',
    introHtml:
      'The PyPSA Developer Meeting is an in-person gathering of the project\'s core developers and maintainers. With contributors from several institutions in the same room, we can align on direction and implementation across upcoming features, breaking changes, and governance. Participants join from TU Berlin, Open Energy Transition (see task force <a href="https://www.openenergytransition.org/projects/pypsa-taskforce" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">initiative</a>), and the University of Pisa.',
    // Ordered by total contributions (desc), matching the Community page default.
    people: [
      {
        name: "Fabian Neumann",
        imageUrl: "https://avatars.githubusercontent.com/u/29101152?v=4",
        url: "https://github.com/fneum",
      },
      {
        name: "Fabian Hofmann",
        imageUrl: "https://avatars.githubusercontent.com/u/19226431?v=4",
        url: "https://github.com/FabianHofmann",
      },
      {
        name: "Lukas Trippe",
        imageUrl: "https://avatars.githubusercontent.com/u/62255395?v=4",
        url: "https://github.com/lkstrp",
      },
      {
        name: "Davide Fioriti",
        imageUrl: "https://avatars.githubusercontent.com/u/67809479?v=4",
        url: "https://github.com/davide-f",
      },
      {
        name: "Max Parzen",
        imageUrl: "https://avatars.githubusercontent.com/u/61968949?v=4",
        url: "https://github.com/pz-max",
      },
      {
        name: "Johannes Hampp",
        imageUrl: "https://avatars.githubusercontent.com/u/42553970?v=4",
        url: "https://github.com/euronion",
      },
      {
        name: "Jonas Hörsch",
        imageUrl: "https://avatars.githubusercontent.com/u/2552981?v=4",
        url: "https://github.com/coroa",
      },
      {
        name: "Iegor Riepin",
        imageUrl: "https://avatars.githubusercontent.com/u/40967402?v=4",
        url: "https://github.com/Irieo",
      },
      {
        name: "Bryn Pickering",
        imageUrl: "https://avatars.githubusercontent.com/u/17178478?v=4",
        url: "https://github.com/brynpickering",
      },
    ],
    agenda: [
      {
        title:
          'New features from the recently announced <a href="/roadmap" class="text-primary hover:underline">Roadmap</a>',
        points: [
          "Improved model scaling",
          "Custom constraint interface",
          "Problem decomposition with third-party solvers",
          "Non-uniform time resolution",
          "Dashboard",
          "and more …",
        ],
      },
      {
        title: "Prototyping &amp; general exploration",
        points: ["Component library", "Declarative, text-based model definitions", "and more …"],
      },
      {
        title: "Ecosystem health",
        points: [
          "PyPSA 2.0 and potential breaking changes",
          "Enhancing modularity",
          "Issue backlog and bug hunting",
        ],
      },
      {
        title: "Maintenance &amp; governance",
        points: [
          "Guaranteeing long-term stability",
          "Cross-institutional collaboration and project governance",
        ],
      },
    ],
    videos: [],
    timezones: [],
    license: "CC BY 4.0",
  },
];
