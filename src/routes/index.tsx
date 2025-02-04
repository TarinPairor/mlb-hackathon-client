import { motion } from "framer-motion";
import Wave from "react-wavify";
import { createFileRoute, Link } from "@tanstack/react-router";
import BaseballIcon from "../assets/baseball-svgrepo-com.svg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center"
      >
        <img
          src={BaseballIcon}
          alt="Baseball Icon"
          className=" w-1/2 h-1/2 opacity-10 animate-bounce"
        />
        {/* Hero Content */}
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center space-y-8 px-4"
        >
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            BBBrainRot
          </h1>
          <blockquote className="text-blue-200 text-xl italic border-l-4 border-blue-400 pl-4">
            "Scrollable, bite-sized, all-you-can-watch baseball!"
          </blockquote>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Link
              to="/feed"
              className=" inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-black">Jump to Feed →</div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="For You"
            description="Endless stream of baseball's most exciting moments"
            to="/feed"
            bgColor="from-blue-600 to-blue-800"
          />
          <FeatureCard
            title="Guess The Speed"
            description="Test your eye - how fast was that hit?"
            bgColor="from-purple-600 to-purple-800"
            to="/feed"
          />
          <FeatureCard
            title="LLM Integration"
            description="Let the AI do the work!"
            bgColor="from-indigo-600 to-indigo-800"
          />
        </div>
      </div>

      {/* Stats Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gray-800 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatsCounter number="1M+" label="Hours Wasted" />
            <StatsCounter number="50K+" label="Possible Active Users" />
            <StatsCounter number="1K+" label="MLB Games Played" />
          </div>
        </div>
      </motion.div>

      {/* Footer Wave */}
      <div className="relative h-40 bg-gray-900">
        <Wave
          color="rgba(59, 130, 246, 0.1)"
          style={{ height: "100%" }}
          amplitude={10}
          speed={0.2}
        />
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <Wave
            fill="#f79902"
            paused={false}
            style={{ display: "flex" }}
            options={{
              height: 10,
              amplitude: 20,
              speed: 0.15,
              points: 3,
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  to?: string;
  bgColor: string;
}

function FeatureCard({ title, description, to, bgColor }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-xl overflow-hidden`}
    >
      <Link
        to={to}
        className={`block p-6 bg-gradient-to-br ${bgColor} hover:shadow-xl transition-shadow duration-300`}
      >
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-blue-100">{description}</p>
      </Link>
    </motion.div>
  );
}

interface StatsCounterProps {
  number: string;
  label: string;
}

function StatsCounter({ number, label }: StatsCounterProps) {
  return (
    <motion.div
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="text-4xl font-bold text-blue-400">{number}</div>
      <div className="text-blue-200">{label}</div>
    </motion.div>
  );
}

export default Index;
