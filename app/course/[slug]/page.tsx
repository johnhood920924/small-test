import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "../../../lib/courses";

type CoursePageProps = {
  params: { slug: string };
};

type Course = NonNullable<Awaited<ReturnType<typeof getCourseBySlug>>>;

export async function generateMetadata(
  { params }: CoursePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    return {
      title: "Course not found",
      description: "The course you are looking for could not be found."
    };
  }

  const title = `${course.name} | ${course.provider.name}`;
  const description = course.description;
  const url = `https://example.com/course/${course.slug}`;

  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: course.provider.name,
      locale: "en_US",
      images: [
        ...previousImages,
        {
          url: "https://example.com/og/course-default.png",
          width: 1200,
          height: 630,
          alt: course.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

function buildCourseJsonLd(course: Awaited<ReturnType<typeof getCourseBySlug>>) {
  if (!course) return null;

  const url = `https://example.com/course/${course.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: course.provider.name,
      sameAs: course.provider.url
    },
    inLanguage: course.language,
    url,
    dateModified: course.lastUpdated,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: course.rating.toFixed(1),
      reviewCount: course.ratingCount
    },
    educationalLevel: course.level,
    timeRequired: `PT${Math.round(course.durationHours)}H`
  };
}

export const revalidate = 0;

function CourseHeader({ course }: { course: Course }) {
  return (
    <header className="page-header">
      <p className="pill" aria-label={`Course level: ${course.level}`}>
        {course.level} &middot; {course.language}
      </p>
      <h1 id="course-title" className="page-title" itemProp="name">
        {course.name}
      </h1>
      <p className="page-subtitle" itemProp="description">
        {course.description}
      </p>
      <div className="course-meta" aria-label="Course quick stats">
        <div className="course-meta__item">
          <span className="course-meta__label">Provider</span>
          <span itemProp="provider" itemScope itemType="https://schema.org/Organization">
            <span itemProp="name">{course.provider.name}</span>
          </span>
        </div>
        <div className="course-meta__item">
          <span className="course-meta__label">Duration</span>
          <span>{course.durationHours} hours</span>
        </div>
        <div className="course-meta__item">
          <span className="course-meta__label">Lessons</span>
          <span>{course.lessonsCount}</span>
        </div>
        <div className="course-meta__item" aria-label={`${course.rating} out of 5 stars`}>
          <span className="course-meta__label">Rating</span>
          <span>
            {course.rating.toFixed(1)} / 5 · {course.ratingCount.toLocaleString()} reviews
          </span>
        </div>
        <div className="course-meta__item">
          <span className="course-meta__label">Last updated</span>
          <time dateTime={course.lastUpdated}>
            {new Date(course.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </time>
        </div>
      </div>
    </header>
  );
}

function CourseOverview() {
  return (
    <section aria-label="Course overview" className="course-main">
      <section className="course-section" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="course-section__title">
          What you&apos;ll build
        </h2>
        <p className="course-section__body">
          In this course, you&apos;ll learn how to create high-performance, SEO-friendly course
          detail pages using Next.js App Router. You&apos;ll implement server-side rendering,
          dynamic metadata, and JSON-LD structured data, and you&apos;ll learn how to measure and
          optimize Core Web Vitals in Lighthouse.
        </p>
      </section>

      <section className="course-section" aria-labelledby="outcomes-heading">
        <h2 id="outcomes-heading" className="course-section__title">
          Key outcomes
        </h2>
        <div className="course-stats">
          <div className="course-stats__item">
            <span className="course-stats__label">Rendering</span>
            <span className="course-stats__value">SSR + optimized payloads</span>
          </div>
          <div className="course-stats__item">
            <span className="course-stats__label">SEO</span>
            <span className="course-stats__value">Dynamic meta &amp; rich snippets</span>
          </div>
          <div className="course-stats__item">
            <span className="course-stats__label">Performance</span>
            <span className="course-stats__value">Green Core Web Vitals</span>
          </div>
        </div>
      </section>
    </section>
  );
}

function CourseSidebar({ course }: { course: Course }) {
  return (
    <aside className="course-sidebar" aria-label="Course purchase information">
      <section className="course-sidebar__card">
        <p className="course-sidebar__price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: course.currency
          }).format(course.price)}
        </p>
        <p className="course-sidebar__price-note">
          One-time payment · Lifetime access · 30-day satisfaction guarantee
        </p>
        <button type="button" className="button button--primary" aria-label="Enroll now">
          Enroll now
        </button>
        <ul className="course-sidebar__meta">
          <li>Instant access to all lessons</li>
          <li>Downloadable code examples</li>
          <li>Hands-on performance audits</li>
        </ul>
      </section>
    </aside>
  );
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const course = await getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const jsonLd = buildCourseJsonLd(course);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <article
        aria-labelledby="course-title"
        className="container"
        itemScope
        itemType="https://schema.org/Course"
      >
        <CourseHeader course={course} />

        <div className="course-layout">
          <CourseOverview />
          <CourseSidebar course={course} />
        </div>
      </article>
    </>
  );
}

