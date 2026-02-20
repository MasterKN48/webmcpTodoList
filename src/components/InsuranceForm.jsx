import { useState } from "react";
import { Shield, ArrowLeft, Send } from "lucide-react";

export default function InsuranceForm({ onNavigateBack }) {
  const [formData, setFormData] = useState({
    regNo: "",
    mobileNo: "",
    policyEndDate: "",
    ncb: "0",
    isComprehensive: false,
    panNo: "",
    captchaInput: "",
  });

  const generateCaptchaValue = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captcha, setCaptcha] = useState(generateCaptchaValue);
  const [submitted, setSubmitted] = useState(false);

  const generateCaptcha = () => {
    setCaptcha(generateCaptchaValue());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.captchaInput.toUpperCase() !== captcha) {
      alert("Invalid captcha! Please try again.");
      generateCaptcha();
      return;
    }
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Requirement Submitted!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Our agents will contact you shortly with the best quotes for your
          vehicle.
        </p>
        <button
          onClick={onNavigateBack}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 dark:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
      <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">Car Insurance</h1>
        </div>
        <button
          onClick={onNavigateBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          title="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 space-y-6"
        toolname="buy_car_insurance"
        tooldescription="Form to buy car insurance. Requires registration number, mobile, policy details, and PAN for KYC."
        toolautosubmit
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Registration Number
            </label>
            <input
              required
              type="text"
              name="regNo"
              toolparamtitle="registration_number"
              toolparamdescription="The vehicle registration number (e.g., MH01AB1234) as per RC."
              placeholder="e.g. MH01AB1234"
              value={formData.regNo}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Mobile Number
            </label>
            <input
              required
              type="tel"
              name="mobileNo"
              toolparamtitle="mobile_number"
              toolparamdescription="10-digit mobile number for communication and policy delivery."
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              Prev. Policy End Date
            </label>
            <input
              required
              type="date"
              name="policyEndDate"
              toolparamtitle="policy_end_date"
              toolparamdescription="The exact end date of your existing vehicle insurance policy."
              value={formData.policyEndDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
              No Claim Bonus (NCB) %
            </label>
            <select
              name="ncb"
              toolparamtitle="ncb_percentage"
              toolparamdescription="The No Claim Bonus earned from your previous policy year."
              value={formData.ncb}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none"
            >
              <option value="0">0%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="35">35%</option>
              <option value="45">45%</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
          <input
            type="checkbox"
            id="isComprehensive"
            name="isComprehensive"
            toolparamtitle="is_comprehensive_policy"
            toolparamdescription="Check if your previous policy provided comprehensive coverage."
            checked={formData.isComprehensive}
            onChange={handleChange}
            className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors"
          />
          <label
            htmlFor="isComprehensive"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
          >
            My previous policy was Comprehensive (Package Policy)
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
            PAN Number for KYC
          </label>
          <input
            required
            type="text"
            name="panNo"
            toolparamtitle="pan_number"
            toolparamdescription="Permanent Account Number (PAN) required for KYC verification."
            placeholder="ABCDE1234F"
            // pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            value={formData.panNo}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none uppercase"
          />
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Security Verification
            </span>
            <button
              type="button"
              onClick={generateCaptcha}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Refresh Captcha
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-2xl font-mono tracking-widest text-gray-800 dark:text-gray-200 select-none shadow-inner">
              {captcha}
            </div>
            <input
              required
              type="text"
              name="captchaInput"
              toolparamtitle="captcha_code"
              toolparamdescription="Verification code displayed in the image above."
              placeholder="Enter code above"
              value={formData.captchaInput}
              onChange={handleChange}
              className="flex-1 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="group relative w-full flex items-center justify-center gap-3 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-indigo-200 dark:shadow-none"
        >
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          Get Instant Quotes
        </button>
      </form>
    </div>
  );
}
