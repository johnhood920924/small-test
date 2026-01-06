export type Course = {
  slug: string;
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  level: "Beginner" | "Intermediate" | "Advanced";
  durationHours: number;
  lessonsCount: number;
  rating: number;
  ratingCount: number;
  price: number;
  currency: "USD" | "EUR";
  language: string;
  lastUpdated: string;
};

const mockCourses: Record<string, Course> = {
  "nextjs-seo-mastery": {
    slug: "nextjs-seo-mastery",
    name: "Next.js SEO Mastery: High-Performance Course Detail Pages",
    description:
      "Learn how to build high-performance, SEO-optimized course detail pages with Next.js, including SSR, dynamic metadata, and structured data that search engines love.",
    provider: {
      name: "Course Platform",
      url: "https://example.com"
    },
    level: "Intermediate",
    durationHours: 6,
    lessonsCount: 38,
    rating: 4.8,
    ratingCount: 1273,
    price: 129,
    currency: "USD",
    language: "English",
    lastUpdated: "2025-11-15"
  }
};

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return Promise.resolve(mockCourses[slug] ?? null);
}


