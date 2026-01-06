export default function HomePage() {
  return (
    <section aria-labelledby="home-heading">
      <div className="container">
        <header className="page-header">
          <h1 id="home-heading" className="page-title">
            Welcome to Course Platform
          </h1>
          <p className="page-subtitle">
            Explore our curated catalog of high-quality courses, taught by leading experts.
          </p>
        </header>

        <section aria-labelledby="featured-course-heading" className="card">
          <div className="card__body">
            <h2 id="featured-course-heading" className="card__title">
              Featured course
            </h2>
            <p className="card__text">
              Check out our detailed course page example, including SEO optimization and structured data.
            </p>
            <a className="button button--primary" href="/course/nextjs-seo-mastery">
              View course detail example
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}


