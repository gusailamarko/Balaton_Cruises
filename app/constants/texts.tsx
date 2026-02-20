const heroTexts = {
    title: "Discover Lake Balaton in One Perfect Day",
    subtitle: "A premium one-day cruise combining nature, culture, gastronomy and scenic sailing – departing from Balatonkenese."
}

const CTAButtonText = {
    buttonText: "👉Book Your Balaton Cruise NOW!"
}

const GlanceCardContents = [
    {
        img: "/images/BoatGlance.jpeg",
        alt: "Picture of a premium boat",
        caption: "Brand new, fully electric premium boat"
    },
    {
        img: "/images/EcoFriendly_Boat.jpeg",
        alt: "Valami",
        caption: "Silent, eco-friendly sailing"
    },
    {
        img: "/images/Route.gif",
        alt: "Picture of a map showing Lake Balaton",
        caption: "Carefully selected route around Lake Balaton"
    },
    {
        img: "/images/WineFood.jpg",
        alt: "Picture of wine and food on a table",
        caption: "Local gastronomy & wine experiences"
    },
    {
        img: "/images/Landscape.jpg",
        alt: "Picture of Balaton from historic town (Tihany)",
        caption: "Iconic towns & landscapes"
    },
    {
        img: "/images/Relaxed_Group.jpg",
        alt: "Valami",
        caption: "Small groups for a relaxed atmosphere"
    }
]

const StopInfos = [
    {
        stopName: "Tihany Peninsula",
        desc: "Tihany is the heart of Balaton’s history and natural beauty and it explains *why* Lake Balaton looks the way it does today.",
        toDos: ["Panoramic views from the lake", "Historical insights and stories", "Nature, lavender fields and volcanic landscapes"]
    },
    {
        stopName: "Siófok",
        desc: "Siófok shows the modern, vibrant side of the lake.",
        toDos: ["Short lakeside walk", "Insight into Balaton tourism and lifestyle", "Time to relax and enjoy the atmosphere"]
    },
    {
        stopName: "Balatonfüred",
        desc: "Elegant, cultural and gastronomic – Balatonfüred is the soul of the north shore.",
        toDos: ["Guided walk along the famous promenade", "Local cheese & wine tasting", "Stories about Balaton’s wine regions and traditions"]
    }
]

const ItineraryTexts = [
    {
        timeAndActivity: "🛥️ Full-Day Cruise Schedule",
        details: ["07:00 – Private transfer from Budapest in a comfortable, well-equipped vehicle", "08:30 – Arrival in Balatonkenese Welcome drink, short briefing, and boarding the boat", "09:00 – Departure by boat from Balatonkenese to Tihany", "09:45 – Arrival in Tihany, followed by free time from 09:30 to 11:15", "11:15–12:00 – Boat trip to Siófok", "12:00– Arrival in Siófok, followed by free time from 12:00 to 15:00, Perfect time for lunch and sightseeing", "15:30 – Arrival in Balatonfüred, followed by free time from 15:30 to 17:00, Enjoy some free time to discover the city at your own pace", "17:00 – Departure from Balatonfüred; from 17:00 to 19:00, grand circular sightseeing cruise on Lake Balaton with a slow, panoramic sailing experience. Stroll along the famous Tagore Promenade and enjoy the beautiful lakeside atmosphere", "19:00 – Docking in Balatonkenese", "19:30–21:00 – Return to Budapest"],
        background: "/images/Sunrise.webp",
        when: "Available on Mondays and Saturdays for couples; on Tuesdays and Thursdays for individual groups; and on Wednesdays and Fridays for groups and couples"
    },
    {
        timeAndActivity: "☀️ Brunch Cruise Schedule",
        details: ["07:00 – Private transfer from Budapest in a comfortable, well-equipped vehicle", "08:30 – Arrival in Balatonkenese. Welcome drink, short briefing, and boarding the boat", "09:15 – Departure by boat from Balatonkenese to Tihany", "09:30 – Arrival in Tihany, followed by free time from 09:30 to 10:45", "10:45–11:30 – Boat trip to Siófok", "11:30 – Arrival in Siófok, followed by free time from 11:30 to 13:00", "13:00–13:45 – Boat trip to Balatonfüred", "13:45 – Arrival in Balatonfüred, followed by free time from 13:45 to 15:15", "15:15 – Departure from Balatonfüred", "15:45 – Docking in Balatonkenese, end of the program", "16:00: Transfer back to Budapest"],
        background: "/images/Hekk.jpg",
        when: "On Sundays in even-numbered weeks."
    },
    {
        timeAndActivity: "🌅 Sunset Cruise Schedule",
        details: ["12:30 - Private transfer from Budapest in a comfortable, well-equipped vehicle", "14:00 – Arrival in Balatonkenese. Welcome drink, short briefing, and boarding the boat", "14:30 – Departure by boat from Balatonkenese to Tihany", "15:15 – Arrival in Tihany, followed by free time from 15:15 to 16:15", "16:15–17:00 – Boat trip to Siófok", "17:00 – Arrival in Siófok, followed by free time from 17:00 to 18:15", "18:15–18:45 – Boat trip to Balatonfüred", "18:45 – Arrival in Balatonfüred, followed by free time from 18:45 to 19:45", "19:45 – Departure from Balatonfüred. Enjoy the breathtaking sunset over Lake Balaton", "20:15 – Docking in Balatonkenese; end of the program", "20:30- Transfer back to Budapest"],
        background: "/images/Sunset.jpg",
        when: "On Sundays in odd-numbered weeks"
    }
]

const BoatText = {
    title: "THE BOAT",
    subtitle: "Our boat is part of the experience",
    details: ["⚡ Fully electric – silent & eco-friendly", "❄️ Air-conditioned interior", "🛋️ Comfortable seating areas", "🌞 Open deck for panoramic views", "🍾 Space for dining, wine tasting and relaxation"],
    motto: "Designed for comfort, not crowds"
}

const InfoTexts = [
    {
        title: "WHO IS THIS CRUISE FOR?",
        content: ["International visitors staying in Budapest", "Couples looking for a special day trip", "Small groups & friends", "Travelers interested in culture, nature and gastronomy", "Guests who prefer quality over mass tourism"]
    },
    {
        title: "WHAT MAKES THIS EXPERIENCE DIFFERENT?",
        content: ["No rushing, no crowds", "Carefully curated route", "Local knowledge & storytelling", "Authentic Hungarian gastronomy", "Premium, relaxed atmosphere", "This is Lake Balaton explained and experienced, not just visited"]
    },
    {
        title: "PRACTICAL INFORMATION",
        content: ["Duration: Full day (approx. 8–10 hours)", "Language: English", "Group size: Small groups", "Departure & return: Balatonkenese", "Weather: Operates in most weather conditions"]
    }
]

const PriceCardTexts = [
    {
        packageName: "Couple Luxury Day",
        condition: "On Monday and Saturday",
        seasons: ["Main Season", "Pre & Post Season"],
        mainSeasonPrices: ["Monday: 790€ / couple", "Saturday: 890€ / couple"],
        offSeasonPrices: ["Monday: 680€ / couple", "Saturday: 760€ / couple"],
        packageDesc: "An exclusive full-day luxury experience designed for couples seeking privacy, elegance, and unforgettable moments on Lake Balaton."
    },
    {
        packageName: "Group Deluxe Day",
        condition: "Minimum 3 people booking individually on Tuesday and Thursday",
        seasons: ["Main Season", "Pre & Post Season"],
        mainSeasonPrices: "320€ / person",
        offSeasonPrices: "280€ / person",
        packageDesc: "A premium full-day cruise experience for private groups, featuring elevated comfort and enhanced onboard services."
    },
    {
        packageName: "Standard Group Package",
        condition: "Minimum 4 people, on Wednesday and Friday",
        seasons: ["Main Season", "Pre & Post Season"],
        mainSeasonPrices: "240€ / person",
        offSeasonPrices: "210€ / person",
        packageDesc: "A well-balanced full-day cruise package, perfect for groups and couples looking for a memorable Lake Balaton experience at excellent value."
    },
    {
        packageName: "Sunset & Brunch Cruise",
        condition: "Sunset cruises are on Sundays in odd-numbered weeks, and Brunch cruises are on Sundays in even-numbered weeks",
        seasons: ["Main Season", "Pre & Post Season"],
        mainSeasonPrices: "210€ / person",
        offSeasonPrices: "180€ / person",
        packageDesc: "A stylish sunset or brunch cruise, ideal for special occasions or a relaxed yet sophisticated Balaton experience."
    }
]

export { heroTexts, CTAButtonText, GlanceCardContents, StopInfos, ItineraryTexts, BoatText, InfoTexts, PriceCardTexts };