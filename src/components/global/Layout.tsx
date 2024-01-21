import Image from "next/image";
import footerImage from "../../../public/footer-content.jpg";

const Layout = ({ children }: any) => {
  return (
    <div className="grid h-screen" style={{ gridTemplateRows: "90% 10%" }}>
      <div className="flex items-center justify-center w-full">{children}</div>
      <div className="flex justify-center items-end px-4 pb-3">
        <footer>
          <Image src={footerImage} alt="footer content" />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
