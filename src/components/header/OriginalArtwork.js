import Link from "next/link";
import Image from "next/image";
import "./original-artwork.css";

const OriginalArtwork = () => {
  return (
    <div className="original-artwork">
      <div className="container">
        <div className="artwork-image">
          <Link href="/collections">
            <Image
              src="/images/artworks.png"
              alt="Modern Art"
              width={1920}
              height={200}
              quality={70}
              layout="responsive"
              loading="lazy"
            />
            <h2>Original Artworks</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OriginalArtwork;
