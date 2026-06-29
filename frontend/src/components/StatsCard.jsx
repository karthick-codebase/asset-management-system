import { motion } from "framer-motion";

function StatsCard({ title, value, icon, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className={`
        relative
        overflow-hidden
        rounded-2xl
        p-6
        text-white
        shadow-lg
        ${gradient}
      `}
    >
      <div className="absolute -right-5 -top-5 w-24 h-24 bg-white/10 rounded-full"></div>
      <div className="absolute -right-10 bottom-0 w-32 h-32 bg-white/5 rounded-full"></div>

      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-md font-medium text-white/80">{title}</p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-5xl opacity-80">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default StatsCard;