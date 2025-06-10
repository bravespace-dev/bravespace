
interface FounderCardProps {
  name: string;
  description: string;
  image: string;
  delay?: number;
}

const FounderCard = ({ name, description, image, delay = 0 }: FounderCardProps) => {
  return (
    <div 
      className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-6 card-glow hover:scale-105 transition-all duration-500 fade-in-up float`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 p-1 mx-auto mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold text-center mb-2 text-gray-800 dark:text-white">
        {name}
      </h3>
      <p className="text-sm text-center text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FounderCard;
