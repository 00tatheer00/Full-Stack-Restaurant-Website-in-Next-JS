import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
];

export function GalleryStrip() {
  return (
    <section className="papzi-shell mt-12 pb-14">
      <div className="papzi-section-head">
        <h2>Follow @pandabite</h2>
      </div>
      <div className="papzi-gallery-grid">
        {images.map((image) => (
          <div key={image} className="papzi-gallery-item">
            <Image src={image} alt="Food gallery" fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
