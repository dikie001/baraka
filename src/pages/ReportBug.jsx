import React, { useState } from "react";
import { Bug, Send, CheckCircle, AlertTriangle } from "lucide-react";
import BottomNav from "../components/MobileNav";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ReportBug() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: "",
    email: "",
    severity: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    if (
      !formData.title &&
      !formData.description &&
      !formData.email &&
      !formData.severity
    ) {
      toast.error("Kindly fill in all details.");
    }
try{

    const res = await fetch("https://formspree.io/f/mgvvgozj", {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
         Accept: "application/json"
      },
      body: JSON.stringify(formData)
    });
    const result = await res.json()
    console.log(result)
    if(res.ok){
      toast.success("Message sent successfully")
      setFormData({title: '', description:'', email:'', severity:'', steps:''})
      setSubmitted(true)
    }else{
      toast.error("Message not sent.")
    }
  }catch(e){
    toast.error("Network error")
  }
  };

  const severityLevels = [
    { value: "low", label: "Low - Minor issue", color: "text-green-400" },
    {
      value: "medium",
      label: "Medium - Affects workflow",
      color: "text-yellow-400",
    },
    {
      value: "high",
      label: "High - Blocks functionality",
      color: "text-red-400",
    },
    {
      value: "critical",
      label: "Critical - App crashes",
      color: "text-red-500",
    },
  ];

  if (submitted) {
    return (
      <div className=" flex items-center justify-center p-4">
        <BottomNav />
        <div className="backdrop-blur-xl bg-white/5 border border-white/20 rounded-3xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Bug Report Submitted!
          </h2>
          <p className="text-purple-100 mb-6">
            Thanks for reporting the issue. I will investigate it.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Report Another Bug
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center p-3">
      <div className="w-full max-w-lg">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700/30 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bug className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold  mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Report a Bug
          </h1>
          <p className="text-purple-100">
            Help me fix issues and improve the app
          </p>
        </div>

        {/* Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4">
          <div>
            <label className="block text-purple-100 font-medium mb-2">
              Bug Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of the bug"
              className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-purple-100 font-medium mb-2">
              Severity Level
            </label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="" className="bg-slate-800">
                Select severity
              </option>
              {severityLevels.map((level) => (
                <option
                  key={level.value}
                  value={level.value}
                  className="bg-slate-800"
                >
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-purple-100 font-medium mb-2">
              What happened?
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the bug in detail..."
              className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-purple-100 font-medium mb-2">
              Steps to Reproduce{" "}
              <span className="text-sm text-gray-400">(optional)</span>
            </label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows={3}
              placeholder="1. Go to... 2. Click on... 3. Bug occurs..."
              className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-purple-100 font-medium mb-2">
              Email <span className="text-sm text-gray-400">(optional)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* <div className="flex items-center space-x-2 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <p className="text-yellow-200 text-sm">
              Include screenshots or screen recordings if possible to help us
              understand the issue better.
            </p>
          </div> */}

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mt-6"
          >
            <Send className="w-5 h-5" />
            <span>Submit Bug Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}
