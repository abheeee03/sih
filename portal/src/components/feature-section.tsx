import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/components/ui/minimal-card"

const cards = [
  {
    title: "Secured Digital ID",
    description:
      "Securely store passport, visa, vaccination records, and travel insurance with tamper-proof blockchain verification. Easily validated via QR scans worldwide.",
    img: "/pass.png"
  },
  {
    title: "Instant Emergency Alerts & Panic Button",
    description:
      "With a single tap, alert authorities, share live location, and activate digital witness support for safety.",
    img: "/sos.png"
    },
  {
    title: "Smart Geo-Fencing Notifications",
    description:
      "Get notified when entering risky zones and receive safety tips even without internet.",
    img: "/map.png"
    },
  {
    title: "Verified Safe Places",
    description:
      "Quickly find trusted hotels, hospitals, police stations, and embassies nearby.",
    img: "/taj.png"
    },
  {
    title: "AI-Powered Smart Response Detection",
    description:
      "AI instantly detects risks, sends alerts, and activates the right emergency response protocol.",
    img: "/ai.png"
    },
  {
    title: "Travel Insurance Integration",
    description:
      "Easily link and verify your travel insurance within the app. In case of emergencies, details are instantly accessible to hospitals and authorities.",
    img: "/travel.png"
    }
]

export default function FeatureSection() {
  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px] p-4  flex flex-col space-y-4">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <MinimalCard>
              <MinimalCardImage alt={card.title} src={`${card.img}`} />
              <MinimalCardTitle>
                {card.title}
                
                </MinimalCardTitle>
              <div className="my-3"></div>
              <MinimalCardDescription>
                {card.description}
              </MinimalCardDescription>
            </MinimalCard>
          ))}
        </div>
      </div>
    </div>
  )
}