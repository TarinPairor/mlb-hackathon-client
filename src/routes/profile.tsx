import { createFileRoute } from "@tanstack/react-router";
import { useGetContentLogFromEmail } from "../apis/content-log";
import { useUser } from "@clerk/clerk-react";
import { ContentLog } from "../types/types";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { user } = useUser();
  const [, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const { data: contentLogs } = useGetContentLogFromEmail(
    user?.primaryEmailAddress?.emailAddress || ""
  );

  const summarizeContentLogs = async (
    contentLogs: ContentLog[] | undefined
  ) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const APIBody = {
      model: "gpt-4-0824",
      messages: [
        {
          role: "system",
          content: `
            You are a helpful assistant tasked with describing what content this user likes giving what team they like, what players they may like, and what type of content they like? If its hard to gauge then just say i dont know
          `,
        },
        {
          role: "user",
          content: JSON.stringify(contentLogs),
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify(APIBody),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error summarizing content logs:", error);
      return "Error summarizing content logs.";
    }
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    setShowSummary(false);
    const result = await summarizeContentLogs(contentLogs);
    setSummary(result);
    setIsLoading(false);
    setShowSummary(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Profile Overview</h1>
            {/* <p className="text-gray-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p> */}
          </motion.div>
        </div>

        {/* Content Analysis Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Content Analysis</h2>

          <button
            onClick={handleSummarize}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg text-lg font-medium transition-all duration-200 text-black
              ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3 ">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin " />
                Analyzing your content...
              </div>
            ) : (
              "Analyze My Content Preferences"
            )}
          </button>

          {/* Summary Display */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showSummary ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">
                Your Content Summary
              </h3>
              <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                "Based on the content activity, this user appears to have an
                interest in baseball, particularly content related to standings
                projections and news about the New York Yankees. They seem to be
                keen on keeping up with player transactions and team strategies,
                as indicated by their engagement with an article about the
                Yankees bringing back a player. While specific players they may
                like are not clear from this data, the interest in the Yankees
                suggests they might favor players on that team. Overall, this
                user seems to enjoy news and analytical articles related to
                baseball and the Yankees."
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Log Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          {/* <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {contentLogs?.slice(0, 5).map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gray-700 rounded p-4"
              >
                <p className="text-sm text-gray-300">
                  Viewed content at: {new Date(log.).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}
