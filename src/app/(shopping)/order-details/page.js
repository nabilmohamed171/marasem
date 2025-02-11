import Footer from "@/components/footer/Footer";
import Navbar_Buyer from "@/components/all-navbars/NavbarArtists";
import FooterAccordion from "@/components/footer/FooterAccordion";
import SectionOrderDetails from "@/components/orderDetails/SectionOrderDetails";
import "./order-details.css";

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
