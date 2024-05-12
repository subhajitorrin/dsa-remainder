import React from "react";

function Footer() {
  return (
    <div className="text-black py-10 mt-40 mb-10">
      <div className="pl-40 pr-40 mx-auto flex flex-wrap justify-between items-start">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Logo</h1>
          <p className="text-black">
            Your tagline or brief description can go here.
          </p>
        </div>
        <div className="flex mb-8 gap-10">
          <div className="mr-8">
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <ul className="text-black">
              <li>Home</li>
              <li>Contact Us</li>
              <li>Support</li>
              <li>FAQ</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="mr-8">
            <h4 className="text-xl font-semibold mb-4">Terms</h4>
            <ul className="text-black">
              <li>Privacy</li>
              <li>Services</li>
              <li>Products</li>
              <li>Features</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Testimonials</h4>
            <ul className="text-black">
              <li>Clients</li>
              <li>Partners</li>
              <li>Investors</li>
              <li>Careers</li>
              <li>News</li>
            </ul>
          </div>
        </div>
        <div className="mb-8 ">
          <h1 className="text-2xl font-bold mb-4">Subscribe</h1>
          <p className="text-black mb-4">
            Join our community to receive updates and exclusive offers.
          </p>
          <div className="flex">
            <input
              type="email"
              className="py-2 px-4 mr-2 rounded-md border border-stone-400 outline-none"
              placeholder="Your email address"
            />
            <button className="py-2 px-4 rounded-md bg-black text-white transition duration-300">
              Join
            </button>
          </div>
          <p className="text-black mt-2">
            By joining, you agree to our{" "}
            <span className="underline">Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
