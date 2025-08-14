import "./globals.css";
import NavBar from "@/components/general/NavBarComponent/NavBar";
import Footer from "@/components/general/FooterComponent/FooterComponent";

export const metadata = {
  title: {
    default: 'Jornadas Interhospitalarias de la Ciudad a las Sierras',
    template: '%s | Jornadas Interhospitalarias',
  },
  description: "Encuentro anual de profesionales de la salud pediátrica para compartir conocimientos, investigaciones y experiencias clínicas.",
  icons: {
    icon: 'imgs/logos/navLogo.png',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="5XxYTljI-V7ytErFMbV1yrAL6QzawUMcHoEZhvU7iHg"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Jornadas Interhospitalarias de Pediatría",
              description:
                "Encuentro anual de profesionales de la salud pediátrica para compartir conocimientos, investigaciones y experiencias clínicas.",
              startDate: "2025-11-4T09:00",
              endDate: "2025-11-7T18:00", 
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: "Hospital de Niños Dr. Debilio Blanco Villegas",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Leandro Alem 1300",
                  addressLocality: "Tandil",
                  postalCode: "B7000",
                  addressRegion: "Buenos Aires",
                  addressCountry: "AR",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Jornadas Hospitalarias de Pediatría - Tandil",
                url: "https://proyecto-jornadas-interhospitalaria.vercel.app/", 
                email: "jornadas_pediatricas@sisptandil.gob.ar",
                telephone: "+54 249 442-5749",
                logo: "https://proyecto-jornadas-interhospitalaria.vercel.app/imgs/logos/logo-title.png", 
              },
              image: [
                "https://proyecto-jornadas-interhospitalaria.vercel.app/imgs/logos/logo-title.png",
              ],
            }),
          }}
        />
      </head>
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
