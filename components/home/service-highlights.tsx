const highlights = [
  { title: "Fast Delivery", desc: "Hot meals delivered quickly across your city.", icon: "FD" },
  { title: "Fresh Ingredients", desc: "Curated quality ingredients in every recipe.", icon: "FI" },
  { title: "24/7 Support", desc: "Reliable support for your orders and account.", icon: "CS" },
  { title: "Secure Payments", desc: "Protected checkout with card and COD options.", icon: "SP" },
];

export function ServiceHighlights() {
  return (
    <section className="papzi-shell mt-12">
      <div className="papzi-service-grid">
        {highlights.map((item) => (
          <article key={item.title} className="papzi-service-item">
            <span>{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
