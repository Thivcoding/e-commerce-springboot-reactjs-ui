import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const BOT_TOKEN = "8936879306:AAFwHQ5D3VsdNaU2lEJAN88cyOE_kmqaFcY";
  const CHAT_ID = "7967113611";

  const contactInfo = [
    {
      id: 1,
      icon: <FaPhoneAlt />,
      title: "Phone Number",
      value: "+855 97 892 2013",
    },
    {
      id: 2,
      icon: <FaEnvelope />,
      title: "Email Address",
      value: "vanthiv17032005@gmail.com",
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt />,
      title: "Office Location",
      value: "Phnom Penh, Cambodia",
    },
    {
      id: 4,
      icon: <FaClock />,
      title: "Working Hours",
      value: "Mon - Sun : 8:00 AM - 10:00 PM",
    },
  ];

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT TO TELEGRAM BOT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = `
🛒 New Contact Message

👤 Name: ${formData.fullName}
📧 Email: ${formData.email}
📌 Subject: ${formData.subject}

💬 Message:
${formData.message}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text,
          }),
        }
      );

      if (response.ok) {
        alert("Message sent successfully!");

        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* HERO */}
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-yellow-400 uppercase tracking-[4px] font-semibold">
            Contact Us
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Get In Touch
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-8">
            Have questions about products, orders, or support?
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-14">
        {/* LEFT */}
        <div>
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-5 bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 text-xl">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SOCIAL */}
          <div className="mt-10 flex gap-4">
            <a
              href="https://web.facebook.com/thiv.slot.5/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.instagram.com/van.thiv1703"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center"
            >
              <FaInstagram />
            </a>

            <a
              href="https://t.me/hokvanthiv"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>

        {/* RIGHT - FORM */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Contact Form
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* NAME */}
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            {/* SUBJECT */}
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            {/* MESSAGE */}
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              required
            ></textarea>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl font-bold transition-all duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
       <div className=" h-[450px] md:h-[450px] rounded-xl overflow-hidden shadow-md w-full max-w-7xl mx-auto  mb-20">
             <iframe
               className="w-full h-full border-0"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3537.310611954279!2d104.88570117604539!3d11.562217214939473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951adb4d4041d%3A0x8a90e729f62ad800!2sETEC%20Center!5e1!3m2!1sen!2skh!4v1779616346582!5m2!1sen!2skh"
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
             />
        </div>
    </div>
  );
};

export default Contact;