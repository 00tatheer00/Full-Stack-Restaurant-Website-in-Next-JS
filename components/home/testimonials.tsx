import { papziTestimonials } from "@/lib/papzi-home-data";

export function Testimonials() {
  return (
    <section className="papzi-testimonial-bg">
      <div className="papzi-shell">
        <div className="papzi-testimonial-wrap">
          <p className="papzi-testimonial-title">Testimonials</p>
          <div className="papzi-testimonial-grid">
            {papziTestimonials.map((item) => (
              <article key={item.name} className="papzi-testimonial-card">
                <h3>&quot;</h3>
                <p>{item.quote}</p>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
