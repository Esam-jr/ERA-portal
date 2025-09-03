import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main>
      <section className="bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Ethiopian Revenues Authority — Customer Feedback Portal
            </h1>
            <p className="mt-3 text-gray-600">
              Help us improve tax services by sharing your experience. Your feedback directly informs service standards and transparency.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/submit"
                className="px-5 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Submit your feedback
              </Link>
              <a
                href="#learn-more"
                className="px-5 py-3 rounded-lg border bg-white hover:bg-gray-50"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl border bg-white shadow-sm flex items-center justify-center text-gray-400">
              <span className="text-sm">Service Quality • Transparency • Fairness</span>
            </div>
          </div>
        </div>
      </section>

      <section id="learn-more" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ul className="mt-3 grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <li className="rounded-xl border p-4 bg-white">1. Fill the 4-step survey aligned to ERA service standards.</li>
          <li className="rounded-xl border p-4 bg-white">2. Your responses are stored securely. No account required.</li>
          <li className="rounded-xl border p-4 bg-white">3. Admin reviews feedback and tracks improvements.</li>
        </ul>
      </section>
    </main>
  );
}
