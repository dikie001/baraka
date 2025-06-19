import React, { useState } from "react";
import { Send, Lightbulb, Star, Users, Zap, CheckCircle } from "lucide-react";
import BottomNav from "../components/MobileNav";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RequestFeature() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    email: "",
    useCase: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const categories = [
    { value: "ui-ux", label: "UI/UX Improvement", icon: "🎨" },
    { value: "performance", label: "Performance", icon: "⚡" },
    { value: "integration", label: "Integration", icon: "🔗" },
    { value: "security", label: "Security", icon: "🔒" },
    { value: "mobile", label: "Mobile Experience", icon: "📱" },
    { value: "accessibility", label: "Accessibility", icon: "♿" },
    { value: "other", label: "Other", icon: "💡" },
  ];

  const priorities = [
    { value: "low", label: "Nice to Have", color: "text-blue-400" },
    { value: "medium", label: "Important", color: "text-yellow-400" },
    { value: "high", label: "Critical", color: "text-red-400" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Feature title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.priority) newErrors.priority = "Please select a priority";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await fetch("https://formspree.io/f/mgvvgozj", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        console.log(result);

        if (res.ok) {
          toast.success("Request sent successfully");
          setIsSubmitted(true);
        }else{
          toast.error("Message not sent!")
        }
      } catch (e) {}

      console.log("Feature request submitted:", formData);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "",
      email: "",
      useCase: "",
    });
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className=" p-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <BottomNav />
          <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Request Submitted!
            </h2>
            <p className="text-purple-100 mb-6 leading-relaxed">
              Thank you for your feature request. I will review it and
              get back to you soon.
            </p>
            <button
              onClick={resetForm}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-purple-800 p-4">
      <div className="max-w-4xl mx-auto mb-5">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/30 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mb-6 shadow-lg">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold  mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Request a Feature
          </h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed">
            Have an idea that could make this app better? I'd love to hear from
            you!
          </p>
        </div>

        {/* Commented feature Block */}
        <div>
          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Users className="w-8 h-8 text-purple-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">2.5K+</div>
              <div className="text-purple-200 text-sm">Features Requested</div>
            </div>
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">847</div>
              <div className="text-purple-200 text-sm">
                Features Implemented
              </div>
            </div>
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Zap className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">72h</div>
              <div className="text-purple-200 text-sm">Avg Response Time</div>
            </div>
          </div> */}
        </div>

        {/* Form */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature Title */}
              <div className="md:col-span-2">
                <label className="block text-purple-100 font-semibold mb-2">
                  Feature Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Brief, descriptive title for your feature"
                  className={`w-full bg-white/5 border ${
                    errors.title ? "border-red-400" : "border-white/30"
                  } rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300`}
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-purple-100 font-semibold mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${
                    errors.category ? "border-red-400" : "border-white/30"
                  } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.value}
                      value={cat.value}
                      className="bg-slate-800"
                    >
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-purple-100 font-semibold mb-2">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className={`w-full bg-white/5 border ${
                    errors.priority ? "border-red-400" : "border-white/30"
                  } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300`}
                >
                  <option value="">Select priority</option>
                  {priorities.map((priority) => (
                    <option
                      key={priority.value}
                      value={priority.value}
                      className="bg-slate-800"
                    >
                      {priority.label}
                    </option>
                  ))}
                </select>
                {errors.priority && (
                  <p className="text-red-400 text-sm mt-1">{errors.priority}</p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-purple-100 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={`w-full bg-white/5 border ${
                    errors.email ? "border-red-400" : "border-white/30"
                  } rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-purple-100 font-semibold mb-2">
                  Feature Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your feature idea in detail. What problem does it solve? How should it work?"
                  className={`w-full bg-white/5 border ${
                    errors.description ? "border-red-400" : "border-white/30"
                  } rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none`}
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Use Case */}
              <div className="md:col-span-2">
                <label className="block text-purple-100 font-semibold mb-2">
                  Use Case (Optional)
                </label>
                <textarea
                  name="useCase"
                  value={formData.useCase}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Describe a specific scenario where this feature would be useful"
                  className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Feature Request</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-purple-200 text-sm">
            Your feedback drives my development. Thank you for helping me
            improve! 💜
          </p>
        </div>
      </div>
    </div>
  );
}
