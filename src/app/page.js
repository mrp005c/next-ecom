import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto bg-gray-400 ">
      {/* Hero Section  */}
      <section id=" " className="flex-center min-h-[calc(100vh-40px)]  bg-gray-400 bg-linear-65 from-purple-500 to-pink-500">
        <div className="min-h-[600px] flex-center gap-2 flex-col md:flex-row w-screen container mx-auto">
          {/* right side */}
          <div className="flex-1 box-border px-3 flex-col flex gap-4">
            <h1 className="text-start text-5xl text-shadow-lg text-shadow-blue-600 font-bold w-2/3 sm:w-1/2 ">
              Welcome To Our Next-Ecom Website
            </h1>
            <p className="text-sm w-2/3 sm:w-1/3 ">
              Boost sales, enhance customer experience, and streamline
              operations with our cutting-edge AI technology.
            </p>
            {/* subsctibe  */}
            <h3 className="text-lg font-bold text-gray-200">Get Promotional Email</h3>
            <div className="flex gap-3 flex-col sm:flex-row">
              <Input
                type="email"
                name="email"
                id="subemail"
                className=" bg-gray-300 placeholder:text-gray-500 "
                placeholder="Enter Email"
              />
              <button className="w-fit primary-btn text-white" type="submit">
                Subscribe
              </button>
            </div>
          </div>

          {/* left side */}
          <div className="flex-1 bg-gray-600 p-3">
            <img className="rounded-lg object-cover object-center" src="https://img.freepik.com/premium-vector/hero-header-landing-page-ecommerce_176048-9.jpg?w=2000" alt="" />
          </div>
        </div>
      </section>

      {/* about section  */}
      <section id="about-us" className="min-h-[500px] pt-16">
        <h2 className="w-fit mx-auto py-3 text-2xl font-bold">About Us</h2>
      </section>
      {/* about section  */}
      <section id="contact" className="min-h-[500px] pt-16 bg-green-500">
        <h2 className="w-fit mx-auto py-3 text-2xl font-bold">Contact Us</h2>
      </section>
      {/* about section  */}
      <section id="services" className="min-h-[500px] pt-16">
        <h2 className="w-fit mx-auto py-3 text-2xl font-bold">Services</h2>
      </section>
    </div>
  );
}
