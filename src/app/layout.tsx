import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sahil Modi Portfolio",
    template: "%s | Sahil Modi",
  },
  description:
    "Data Science & Analytics Enthusiast | Full Stack Developer | Cloud & DevOps Learner. Experienced in Python, React, FastAPI, SQL, Firebase, and cloud deployment workflows. Bachelor of Vocation (B.Voc) in Software Development, Jai Hind College, Mumbai University.",
  keywords: [
    "Sahil Modi",
    "Data Science",
    "Analytics",
    "Full Stack Developer",
    "Cloud Computing",
    "DevOps",
    "Python",
    "React",
    "FastAPI",
    "SQL",
    "Firebase",
    "Vercel",
    "Docker",
    "GitHub",
    "Portfolio",
    "Jai Hind College",
    "Mumbai University",
    "Healthcare Technology",
    "AI",
    "Machine Learning",
    "Academic Projects",
    "Backend Engineering",
    "SDLC",
    "CI/CD",
    "Linux",
    "Data Analysis",
    "Project Management"
  ],
  authors: [{ name: "Sahil Modi", url: "https://sahil-modi.live" }],
  creator: "Sahil Modi",
  publisher: "Sahil Modi",
  metadataBase: new URL("https://sahil-modi.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sahil-modi.live",
    title: "Sahil Modi Portfolio",
    description:
      "Explore data science, analytics, cloud, and full stack projects by Sahil Modi. Specializing in scalable backend systems, healthcare technology, and AI-assisted solutions.",
    siteName: "Sahil Modi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Modi Portfolio",
    description:
      "Data Science & Analytics Enthusiast | Full Stack Developer | Cloud & DevOps Learner. Portfolio and academic projects.",
    creator: "@sahilmodic819",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      "google-site-verification=REPLACE_WITH_YOUR_CODE",
    yandex: "yandex-verification: REPLACE_WITH_YOUR_CODE",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme by setting data-theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('notebook-theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sahil Modi",
              url: "https://sahil-modi.live",
              jobTitle: "Data Science & Analytics Enthusiast | Full Stack Developer | Cloud & DevOps Learner",
              description:
                "Passionate software developer with strong interests in data science, analytics, cloud technologies, and scalable full-stack applications.",
              email: "sahilmodic819@gmail.com",
              sameAs: [
                "https://linkedin.com/in/sahil-modi819",
                "https://github.com/sahil-modi",
              ],
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Indian Institute of Technology Madras",
                  description: "BS in Data Science and Applications",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Jai Hind College",
                  description: "BSc in Information Technology",
                },
              ],
              knowsAbout: [
                "Machine Learning",
                "Deep Learning",
                "Natural Language Processing",
                "Computer Vision",
                "Data Science",
                "Artificial Intelligence",
                "Python",
                "TensorFlow",
                "PyTorch",
                "Data Analytics",
              ],
              hasCredential: [
                {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "degree",
                  educationalLevel: "Bachelor's Degree",
                  about: "Data Science and Applications",
                  recognizedBy: {
                    "@type": "EducationalOrganization",
                    name: "Indian Institute of Technology Madras",
                  },
                },
              ],
            }),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#667eea" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
