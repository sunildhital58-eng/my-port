import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Hi, I&apos;m a <span className="text-yellow-300">Full Stack Developer</span>
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                I create amazing web experiences that help businesses succeed online. Let&apos;s build something great together!
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
              >
                View My Work
                <ArrowRight size={20} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition border-2 border-white"
              >
                Get In Touch
              </a>
            </div>

            <div className="flex gap-8 pt-6">
              <div>
                <p className="text-3xl font-bold text-yellow-300">50+</p>
                <p className="text-blue-100">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-300">100%</p>
                <p className="text-blue-100">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-300">5+</p>
                <p className="text-blue-100">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block">
            <div className="w-full h-96 bg-blue-500 rounded-lg flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
