import Footer from "@/components/footer/Footer";
import Navbar_Buyer from "@/components/navbar/NavbarArtists";
import FooterAccordion from "@/components/footer/FooterAccordion";
import SectionOrderDetails from "@/components/orderDetails/SectionOrderDetails";

const OrderDetails = () => {
  return (
    <>
      <Navbar_Buyer />
      <SectionOrderDetails />
      <Footer />
      <FooterAccordion />
    </>
  );
};

export default OrderDetails;
