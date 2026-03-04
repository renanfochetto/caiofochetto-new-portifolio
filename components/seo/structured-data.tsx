"use client";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Caio Fochetto",
    "jobTitle": "Digital Content Director, Influencer Marketing & Talent",
    "description": "Líder em Creator Economy & Performance Marketing. 15+ anos de experiência em marketing de influência, estratégia de marca e performance digital.",
    "url": "https://caiofochetto.com",
    "image": "https://caiofochetto.com/images/foto_caio.avif",
    "sameAs": [
      "https://www.linkedin.com/in/caiofochetto/",
      "https://www.youtube.com/@caiofochetto"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "FGV - Fundação Getulio Vargas"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Digital Marketing Director",
      "occupationLocation": {
        "@type": "City",
        "name": "São Paulo"
      },
      "skills": [
        "Influencer Marketing",
        "Creator Economy",
        "Performance Marketing",
        "Brand Strategy",
        "Digital Content",
        "Community Management",
        "Social Media Marketing"
      ]
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Octagon",
        "startDate": "2023-04",
        "endDate": "2026-02"
      },
      {
        "@type": "Organization",
        "name": "Jellysmack",
        "startDate": "2021-11",
        "endDate": "2023-04"
      },
      {
        "@type": "Organization",
        "name": "A+E Networks",
        "startDate": "2012-02",
        "endDate": "2019-10"
      }
    ],
    "knowsAbout": [
      "Influencer Marketing",
      "Creator Economy",
      "Performance Marketing",
      "Brand Strategy",
      "Digital Platforms",
      "Social Media",
      "Community Management",
      "Content Strategy",
      "Marketing de Influência",
      "Economia Criadora"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PortfolioWebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Caio Fochetto",
      "url": "https://caiofochetto.com"
    },
    "name": "Caio Fochetto - Portfolio",
    "description": "Portfolio profissional de Caio Fochetto - Especialista em Creator Economy e Performance Marketing",
    "url": "https://caiofochetto.com",
    "inLanguage": ["pt-BR", "en-US", "es-ES"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface CaseSchemaProps {
  title: string;
  description: string;
  brand: string | string[];
  company: string;
  year: string;
  url: string;
  image?: string;
}

export function CaseStudySchema({
                                  title,
                                  description,
                                  brand,
                                  company,
                                  year,
                                  url,
                                  image
                                }: CaseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": title,
    "description": description,
    "creator": {
      "@type": "Person",
      "name": "Caio Fochetto"
    },
    "datePublished": year,
    "url": url,
    "image": image,
    "about": {
      "@type": "Thing",
      "name": Array.isArray(brand) ? brand.join(", ") : brand
    },
    "publisher": {
      "@type": "Organization",
      "name": company
    },
    "keywords": [
      "Influencer Marketing",
      "Performance Marketing",
      "Brand Strategy",
      "Digital Marketing",
      "Creator Economy",
      Array.isArray(brand) ? brand.join(", ") : brand
    ].join(", ")
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
