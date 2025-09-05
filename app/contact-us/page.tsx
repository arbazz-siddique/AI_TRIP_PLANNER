// app/components/Contact.tsx
"use client";

import React, { useState } from "react";
// import Image from "next/image"; // <-- unused, removed
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  phone: "",
};

const ContactUs: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createContact = useMutation(
    api.CreateContactMessage.CreateContactMessage
  );

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter an email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.subject.trim()) e.subject = "Please enter a subject";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Please enter a message (min 10 chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange =
    (k: keyof FormState) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [k]: ev.target.value }));

  const submitForm = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);
    if (!validate()) return;

    setLoading(true);
    try {
      // Build a sanitized payload and reuse it for both the DB and email
      const payload: {
        name: string;
        email: string;
        subject: string;
        message: string;
        phone?: string;
      } = {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      };
      if (form.phone?.trim()) payload.phone = form.phone.trim();

      // 1) Save to Convex
      await createContact(payload);

      // 2) Send email via API route (send the same payload)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Optionally read response text for more info
        const text = await res.text().catch(() => "");
        throw new Error(text || "Email sending failed");
      }

      setSuccessMsg(
        "Thanks — your message has been sent. We'll get back to you soon!"
      );
      setForm(initialState);
      setTimeout(() => setSuccessMsg(null), 10000);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Unable to send message right now. We saved your message and will follow up."
      );
      setTimeout(() => setErrorMsg(null), 10000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: contact form */}
          <div className="lg:col-span-7 bg-gradient-to-b from-white to-orange-50 dark:from-neutral-900 dark:to-neutral-950 rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-100 dark:bg-orange-900/30">
                <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Get in touch</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 max-w-xl">
                  Have a question, feedback, or want a custom travel plan? Send
                  us a message — we’ll reply within 24 hours.
                </p>
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={submitForm} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Full name</span>
                  <input
                    value={form.name}
                    onChange={handleChange("name")}
                    className={`rounded-lg border px-3 py-2 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-200 focus:ring-orange-300"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    className={`rounded-lg border px-3 py-2 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-200 focus:ring-orange-300"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.email}
                    </span>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">
                    Phone (optional)
                  </span>
                  <input
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="rounded-lg border border-gray-200 px-3 py-2 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    placeholder="+1 555 555 5555"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium mb-1">Subject</span>
                  <input
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className={`rounded-lg border px-3 py-2 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 ${
                      errors.subject
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-200 focus:ring-orange-300"
                    }`}
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <span className="text-xs text-red-500 mt-1">
                      {errors.subject}
                    </span>
                  )}
                </label>
              </div>

              <label className="flex flex-col">
                <span className="text-sm font-medium mb-1">Message</span>
                <textarea
                  value={form.message}
                  onChange={handleChange("message")}
                  rows={6}
                  className={`rounded-lg border px-3 py-2 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 resize-y ${
                    errors.message
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-200 focus:ring-orange-300"
                  }`}
                  placeholder="Tell us what you need — the more detail, the better."
                />
                {errors.message && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.message}
                  </span>
                )}
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Prefer other channels?{" "}
                    <a
                      href="mailto:arbazzsiddique104@gmail.com"
                      className="text-primary underline"
                    >
                      arbazzsiddique104@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setForm(initialState)}
                    className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {(successMsg || errorMsg) && (
                <div className="mt-2">
                  {successMsg && (
                    <div className="text-sm text-green-600">{successMsg}</div>
                  )}
                  {errorMsg && (
                    <div className="text-sm text-red-500">{errorMsg}</div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right: contact info & socials */}
          <aside className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl p-6 bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-50 dark:bg-green-900/20">
                  <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Office
                  </p>
                  <p className="font-semibold">AI Trip Planner </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Not Yet Company.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-50 dark:bg-yellow-900/20">
                    <Phone className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Phone
                    </p>
                    <a
                      href="tel:+918217809832"
                      className="font-medium text-primary"
                    >
                      +91 8217809832
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-50 dark:bg-orange-900/20">
                    <Mail className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Email
                    </p>
                    <a
                      href="mailto:arbazzsiddique104@gmail.com"
                      className="font-medium text-primary"
                    >
                      arbazzsiddique104@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social + small newsletter */}
            <div className="rounded-2xl p-6 bg-gray-50 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 flex flex-col gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Follow us
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-sky-400">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-500">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-700">
                  <FaLinkedin size={20} />
                </a>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Newsletter
                </p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formEl = e.currentTarget;
                    const emailInput = formEl.querySelector(
                      "input[type='email']"
                    ) as HTMLInputElement;
                    const email = emailInput.value;

                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                      });

                      if (!res.ok) throw new Error("Failed to subscribe");

                      setSuccessMsg("✅ Subscribed successfully!");
                      emailInput.value = "";

                      setTimeout(() => setSuccessMsg(null), 5000);
                    } catch (err) {
                      setErrorMsg("❌ Subscription failed. Try again.");
                      setTimeout(() => setErrorMsg(null), 5000);
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>

            {/* small map placeholder */}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
