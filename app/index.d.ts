declare interface HeroProps {
    title: string,
    subtitle: string
}

declare interface GlanceCardProps {
    img: string,
    alt: string,
    caption: string
}

declare interface ItineraryCardProps {
    timeAndActivity: string,
    details: Array,
    background: string,
    when: string
}

declare interface BoatProps {
    title: string,
    subtitle: string,
    details: Array,
    motto: string
}

declare interface PracticalInfoProps {
    title: string,
    content: Array
}

declare interface PriceCardProps {
    packageName: string,
    condition: string | null,
    seasons: string | Array,
    mainSeasonPrices: string | Array,
    offSeasonPrices: string | Array,
    packageDesc: string
}

declare interface AlertProps {
  open: boolean
  type: "success" | "failure" | "empty"
  message: string
  duration?: number
  onClose: () => void
}

declare interface AlertState {
  open: boolean
  type: 'success' | 'failure' | 'empty'
  message: string
}