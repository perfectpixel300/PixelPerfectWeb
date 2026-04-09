import React from 'react'
import PageHeading from '../components/PageHeading'

const AboutUs = () => {
  return (
    <div className="pt-16 md:pt-12 px-6 md:px-16 lg:px-32">
      {/* Page Heading */}
      <PageHeading 
        title="About Us" 
        nav="Home" 
        link="/" 
        desc="Discover Pixel Perfect Studio & Stationery – where creativity meets quality. Learn more about our mission, services, and team."
      />

      {/* About Section */}
      <section className="mt-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700 mb-4">
            Pixel Perfect Studio & Stationery is a creative hub located in Kathmandu, dedicated to providing top-notch printing, design, and stationery solutions. 
            Our mission is to help businesses and individuals bring their ideas to life with high-quality products and personalized services.
          </p>
          <p className="text-gray-700">
            Whether you need custom printing, branded stationery, or design consultancy, our team of experts ensures every project is executed with precision and care.
          </p>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1581091870627-0dc44a8d0bb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" 
            alt="Pixel Perfect Studio" 
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">High-Quality Printing</h3>
            <p className="text-gray-600">State-of-the-art printing services ensuring vivid colors and crisp details for every project.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Creative Design Solutions</h3>
            <p className="text-gray-600">Expert designers bring your ideas to life with custom graphics and branding materials.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Personalized Stationery</h3>
            <p className="text-gray-600">From notebooks to business cards, we provide tailored stationery that reflects your unique style.</p>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Location</h2>
        <p className="text-center text-gray-700 mb-6">
          Visit us at Pixel Perfect Studio & Stationery in Kathmandu – we’d love to meet you!
        </p>
        <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-md">
          <iframe
            title="Pixel Perfect Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.234829984797!2d85.3261345!3d27.7172019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190f2f7eeb8f%3A0x95a46c02f158603d!2sPixel%20Perfect%20Studio%20and%20Stationery!5e0!3m2!1sen!2snp!4v1699999999999!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-6">
          Have a project in mind? Contact us today and let’s create something amazing together!
        </p>
        <a 
          href="mailto:info@pixelperfectstudio.com" 
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  )
}

export default AboutUs
