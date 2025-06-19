import { Loader, Mail, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook, FaGithub } from "react-icons/fa";
import BottomNav from "../components/MobileNav";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submited, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("Form submitted:", form);
    try {
      const res = await fetch("https://formspree.io/f/mgvvgozj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Message sent successfully");
        setTimeout(() => {
          setSubmitted(true);
        }, 1000);
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Message not sent. Please try again.");
      }
    } catch (err) {
      toast.error("Network Error! Try again.");

      console.log(err);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

  };
  if(submited){
    return(
      <div className=" flex items-center justify-center p-4">
        <BottomNav />
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-700 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
           Message sent!
          </h2>
          <p className="text-purple-100 mb-6">
            Message received. I appreciate you reaching out - I will be back to you soon
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-700 to-pink-700  text-white font-semibold py-3 rounded-xl"
          >
            Back to Homepage
          </button>
        </div>
      </div>

    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 mb-4 backdrop-blur-md border border-purple-800 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/30 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
       
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Contact
        </h1>
        <p className="text-purple-200 text-center mb-8">
          Let's connect and build something amazing
        </p>

        <div className="flex justify-center gap-4 mb-8">
          {[
            { Icon: FaGithub, href: "https://github.com/dikie001" },
            { Icon: BsWhatsapp, href: "https://wa.me/+254716957179?text=Hello%20there!" },
            { Icon: FaFacebook, href: "#" },
            { Icon: Mail, href: "mailto:omondidickens255@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Icon className="w-5 h-5 text-white" />
            </a>
          ))}
        </div>

        <div className="space-y-4">
          {[
            { key: "name", placeholder: "Your Name", type: "text" },
            { key: "email", placeholder: "Your Email", type: "email" },
            { key: "message", placeholder: "Your Message", type: "textarea" },
          ].map(({ key, placeholder, type }) => (
            <div key={key}>
              {type === "textarea" ? (
                <textarea
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full p-3 bg-white/7 border border-purple-300/30 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none h-24"
                />
              ) : (
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full p-3 bg-white/7 border border-purple-300/30 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-700 to-pink-700 text-white p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2 font-medium"
          >
            {!isLoading ? (
              <>
                <Send size={20} />
                <p>Send Message</p>
              </>
            ) : (
              <>
                <Loader size={20} className="animate-spin" />
                <p>Sending Message</p>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
