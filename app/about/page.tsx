// app/components/About.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Globe2,
  MapPin,
  Clock,
  Heart,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const features = [
  {
    title: "Personalized Itineraries",
    desc: "AI-crafted day-by-day plans tailored to your interests, budget and group.",
    icon: Globe2,
    color: "from-orange-100 to-orange-50",
  },
  {
    title: "Local Insights",
    desc: "Hidden gems, local tips and the best times to visit — from our travel knowledge base.",
    icon: MapPin,
    color: "from-green-100 to-green-50",
  },
  {
    title: "Fast Responses",
    desc: "Prototype itineraries delivered quickly with optional premium upgrades.",
    icon: Clock,
    color: "from-yellow-100 to-yellow-50",
  },
];

const team = [
  {
    name: "Arbazz Siddique",
    role: "Founder & Product",
    bio: "Traveler, builder and AI enthusiast. Focused on building delightful travel experiences.",
    img: "/placeholder.jpg",
  },
  {
    name: "Sara Williams",
    role: "Head of Experience",
    bio: "Designs itineraries that balance adventure and comfort for each traveler.",
    img: "/placeholder.jpg",
  },
  {
    name: "Dev Team",
    role: "Engineering",
    bio: "Building reliable, fast and secure backend services.",
    img: "/placeholder.jpg",
  },
];

const stats = [
  { label: "Trips created", value: "4.8k", icon: Star },
  { label: "Happy users", value: "12k+", icon: Heart },
  { label: "Avg response", value: "under 1 min", icon: Clock },
];

const About: React.FC = () => {
  const [openMember, setOpenMember] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-sm font-medium w-max">
              <CheckCircle className="w-4 h-4" />
              Trusted travel planning
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Plan better trips with AI — fast, personal, and practical.
            </h1>
            <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
              AI Trip Planner blends smart automation and local knowledge to design
              travel plans that match your preferences. From hotel picks to
              day-by-day activities, we help you get from idea → itinerary in
              minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link href="/create-new-trip">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  Create your first trip
                </Button>
              </Link>

              <a
                href="#how"
                className="text-sm inline-flex items-center gap-2 text-primary hover:underline"
              >
                Learn how it works
              </a>
            </div>

            {/* stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900/30"
                >
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-neutral-800">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {s.label}
                    </div>
                    <div className="font-semibold text-lg">{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.jpg"
                width={800}
                height={600}
                alt="Travel hero"
                className="object-cover w-full h-64 sm:h-80 md:h-96"
                priority
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white rounded-md px-3 py-2 text-sm">
                Hand-crafted suggestions • Dynamic prices
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div id="how" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-neutral-800 bg-gradient-to-br ${f.color}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/80 dark:bg-neutral-900/40">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* HOW IT WORKS (stepper) */}
        <div className="rounded-2xl p-6 bg-gray-50 dark:bg-neutral-900/50 border border-gray-100 dark:border-neutral-800">
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <ol className="space-y-4 md:space-y-0 md:flex md:gap-6">
            <li className="md:flex-1">
              <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <div className="text-xl font-bold text-primary">1</div>
                  <div>
                    <h4 className="font-semibold">Tell us where to go</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Give starting point, destination & preferences.
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li className="md:flex-1">
              <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <div className="text-xl font-bold text-primary">2</div>
                  <div>
                    <h4 className="font-semibold">We plan & suggest</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      AI produces hotel options, activities and timings.
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li className="md:flex-1">
              <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <div className="text-xl font-bold text-primary">3</div>
                  <div>
                    <h4 className="font-semibold">Refine & book</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Edit the plan, choose hotels and save or export the itinerary.
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li className="md:flex-1">
              <div className="p-4 rounded-lg bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <div className="text-xl font-bold text-primary">4</div>
                  <div>
                    <h4 className="font-semibold">Enjoy your trip</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      Use the itinerary on the go. Add last-minute changes anytime.
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ol>
        </div>

        {/* TEAM & TESTIMONIALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl p-6 bg-white dark:bg-neutral-900/30 border border-gray-100 dark:border-neutral-800">
            <h3 className="text-2xl font-semibold mb-4">Meet the team</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {team.map((m, idx) => (
                <article
                  key={idx}
                  className="rounded-xl border border-gray-100 dark:border-neutral-800 p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={m.img}
                        alt={m.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {m.role}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                    {openMember === idx ? m.bio : `${m.bio.substring(0, 60)}...`}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() =>
                        setOpenMember((s) => (s === idx ? null : idx))
                      }
                      className="text-sm text-primary hover:underline"
                    >
                      {openMember === idx ? "Hide" : "Read more"}
                    </button>
                    <div className="ml-auto flex gap-2">
                      <a aria-label={`${m.name} instagram`} href="#" className="text-gray-600 hover:text-pink-500">
                        <FaInstagram />
                      </a>
                      <a aria-label={`${m.name} twitter`} href="#" className="text-gray-600 hover:text-sky-400">
                        <FaTwitter />
                      </a>
                      <a aria-label={`${m.name} linkedin`} href="#" className="text-gray-600 hover:text-blue-700">
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl p-6 bg-gray-50 dark:bg-neutral-900/40 border border-gray-100 dark:border-neutral-800">
            <h3 className="text-xl font-semibold">What people say</h3>
            <blockquote className="mt-4 text-sm text-neutral-700 dark:text-neutral-300">
              “AI Trip Planner turned a vague idea into a full, walkable itinerary
              in under 2 minutes. The hotel picks were perfect for our budget.”
              <cite className="block mt-3 text-xs text-neutral-500">— Sam R.</cite>
            </blockquote>

            <hr className="my-4" />

            <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Ready to try?
            </h4>
            <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-300">
              Start a trip and let AI do the heavy lifting — tweak as you go.
            </p>
            <Link href="/create-new-trip">
              <Button className="mt-4 w-full bg-primary/90 text-white hover:bg-primary">
                Create a Trip
              </Button>
            </Link>
          </aside>
        </div>

        {/* FOOTER CTA */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-orange-50 to-white dark:from-neutral-900/40 border border-gray-100 dark:border-neutral-800 text-center">
          <h4 className="text-xl font-semibold">Have special requirements?</h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2">
            We can handle accessibility needs, dietary preferences, or group
            bookings. Contact us and we’ll help plan it.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/contact-us">
              <Button className="bg-primary text-white">Contact us</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">See pricing</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
