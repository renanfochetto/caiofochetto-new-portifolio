// components/seo/structured-data.tsx
"use client";

// ✅ IMPORTS DINÂMICOS
import {
  getWorkHistory,
  getCurrentPosition,
  getTotalYearsOfExperience
} from '@/lib/helpers/schema-helpers';

export function PersonSchema() {
  // ✅ DADOS DINÂMICOS
  const workHistory = getWorkHistory();
  const currentPosition = getCurrentPosition();
  const yearsOfExperience = getTotalYearsOfExperience();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Caio Fochetto",
    // ✅ DINÂMICO - cargo atual ou mais recente
    "jobTitle": currentPosition?.roleName || "Líder em Marketing de Influência e Performance Digital",
    // ✅ DINÂMICO - anos auto-atualizam
    "description": `${yearsOfExperience}+ anos conectando marca, cultura e performance através de estratégias de conteúdo e influência.`,
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
      "name": "Marketing de Influência e Performance Digital",
      "occupationLocation": {
        "@type": "City",
        "name": "São Paulo"
      },
      "skills": [
        "Marketing de Influência",
        "Creator Economy",
        "Performance Marketing",
        "Estratégia de Marca",
        "Conteúdo Digital",
        "Gestão de Comunidade",
        "Social Media Marketing"
      ]
    },
    // ✅ DINÂMICO - vem de experiences.ts
    "worksFor": workHistory,
    "knowsAbout": [
      "Marketing de Influência",
      "Creator Economy",
      "Performance Marketing",
      "Estratégia de Marca",
      "Plataformas Digitais",
      "Social Media",
      "Gestão de Comunidade",
      "Estratégia de Conteúdo",
      "Influencer Marketing",
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
  // ✅ DINÂMICO
  const yearsOfExperience = getTotalYearsOfExperience();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Caio Fochetto",
      "url": "https://caiofochetto.com"
    },
    "name": "Caio Fochetto | Líder em Marketing de Influência e Performance Digital",
    // ✅ DINÂMICO
    "description": `${yearsOfExperience}+ anos conectando marca, cultura e performance através de estratégias de conteúdo e influência.`,
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
