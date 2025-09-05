import React from "react";
import { Link } from "react-router-dom";
import {
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Landing() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white min-h-[500px]"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ministry of Revenue Adama Branch / በኢትዮጵያ ገቢዎች ሚኒስቴር አዳማ ቅ/ፅ/ቤት
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Help us improve tax services by sharing your experience. Your
            feedback directly informs service standards and transparency.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Submit your feedback
            </Link>
            <a
              href="#learn-more"
              className="px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section id="purpose" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          የመጠይቁ ዓላማ / Purpose
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Amharic */}
          <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
            <p className="text-gray-800 leading-relaxed">
              የዚህ መጠይቅ ዓላማ በቅርንጫፍ ፅ/ቤታችን ዘመናዊ የታክስ አስተዳደር ስርዓት በመዘርጋት ለተገልጋዮች
              ፍትሃዊ፣ ቀልጣፋና ጥራት ያለው አገልግሎት በመስጠት የተገልጋዮችን እርካታ ለማሳደግ የሚደረገው ጥረት
              የደረሰበትን ደረጃ በመገምገም እንዲበረታ እና የሚያስፈልጉትን ማስተካከያ እርምጃዎች ለመውሰድ መረጃ
              ማሰባሰብ ነው።
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>ይህ መጠይቅ በታክስ ከፋዩ ብቻ ይሞላል፣ ስምና የግል መረጃ አያስፈልግም።</li>
              <li>መልስ ቦታ ካልበቃ በተጨማሪ ወረቀት ማያያዝ ይቻላል።</li>
              <li>የሚሰጡት መልስ ከጥናቱ ዓላማ ውጪ አይጠቀምም።</li>
            </ul>
          </div>

          {/* English */}
          <div className="bg-white p-6 rounded-xl shadow-md border space-y-4">
            <p className="text-gray-800 leading-relaxed">
              The purpose of this survey is to evaluate our branch’s efforts in
              providing fair, efficient, and high-quality tax services. This
              helps us strengthen successful practices and identify areas that
              need improvement.
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                This survey is filled only by taxpayers, no personal info
                required.
              </li>
              <li>
                If space is not enough, you may attach extra sheets with
                references.
              </li>
              <li>
                Your responses are strictly used for service improvement only.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="learn-more" className="bg-gray-50 border-t py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10">
            እንዴት እየሰራ ነው? / How it Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <ClipboardDocumentListIcon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">
                መሙላት / Fill the Survey
              </h3>
              <p className="text-sm text-gray-600">
                በ4 ደረጃ የተዘጋጀውን የግብር አገልግሎት ጥያቄ ይሙሉ።
                <br />
                Complete the 4-step survey aligned with ERA service standards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <ShieldCheckIcon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">
                ደህንነት / Secure & Private
              </h3>
              <p className="text-sm text-gray-600">
                መረጃዎ በደህና ይጠበቃል፣ ስም አያስፈልግም።
                <br />
                Your responses are stored securely, no account required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <ChartBarIcon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">
                ግምገማ / Review & Improve
              </h3>
              <p className="text-sm text-gray-600">
                አስተያየቶችዎን አስተዳዳሪዎች በተከታታይ ይመርመራሉ።
                <br />
                Admins review feedback and track improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Ministry of Revenues
            </h3>
            <p className="text-sm">
              Building a modern, fair, and transparent tax system. Your feedback
              helps us improve our services.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:underline">
                  Submit Feedback
                </Link>
              </li>
              <li>
                <a href="#purpose" className="hover:underline">
                  Purpose
                </a>
              </li>
              <li>
                <a href="#learn-more" className="hover:underline">
                  How it Works
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm">Addis Ababa, Ethiopia</p>
            <p className="text-sm">Tel: +251-XXX-XXX-XXX</p>
            <p className="text-sm">Email: info@revenues.gov.et</p>
          </div>
        </div>
        <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Ministry of Revenues. All rights
          reserved.
        </div>
      </footer>
    </main>
  );
}
