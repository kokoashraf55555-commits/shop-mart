import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        
        {/* Logo & Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded">
              S
            </div>
            <span className="text-xl font-bold">ShopMart</span>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            Your one-stop destination for the latest technology, fashion, and
            lifestyle products. Quality guaranteed with fast shipping and
            excellent customer service.
          </p>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              123 Shop Street, October City, DC 12345
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              (+20) 01093333333
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              support@shopmart.com
            </li>
          </ul>
        </div>

        {/* Shop */}
        <FooterCol title="SHOP">
          <FooterLink>Electronics</FooterLink>
          <FooterLink>Fashion</FooterLink>
          <FooterLink>Home & Garden</FooterLink>
          <FooterLink>Sports</FooterLink>
          <FooterLink>Deals</FooterLink>
        </FooterCol>

        {/* Customer Service */}
        <FooterCol title="CUSTOMER SERVICE">
          <FooterLink>Contact Us</FooterLink>
          <FooterLink>Help Center</FooterLink>
          <FooterLink>Track Your Order</FooterLink>
          <FooterLink>Returns & Exchanges</FooterLink>
          <FooterLink>Size Guide</FooterLink>
        </FooterCol>

        {/* About */}
        <FooterCol title="ABOUT">
          <FooterLink>About Shopmart</FooterLink>
          <FooterLink>Careers</FooterLink>
          <FooterLink>Press</FooterLink>
          <FooterLink>Investor Relations</FooterLink>
          <FooterLink>Sustainability</FooterLink>
        </FooterCol>

        {/* Policies */}
        <FooterCol title="POLICIES">
          <FooterLink>Privacy Policy</FooterLink>
          <FooterLink>Terms of Service</FooterLink>
          <FooterLink>Cookie Policy</FooterLink>
          <FooterLink>Shipping Policy</FooterLink>
          <FooterLink>Refund Policy</FooterLink>
        </FooterCol>
      </div>

      {/* Bottom */}
      <div className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopMart. All rights reserved.
      </div>
    </footer>
  );
}


function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-semibold mb-4">{title}</h4>
      <ul className="space-y-3 text-sm text-gray-600">{children}</ul>
    </div>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <Link href="#" className="hover:text-black transition">
        {children}
      </Link>
    </li>
  );
}
