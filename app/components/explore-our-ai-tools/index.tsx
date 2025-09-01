'use client';

// 工具类型定义
interface AiTool {
  title: string;
  description: string;
  image: string;
  link: string;
}

// 组件参数类型定义
interface ExploreOurAiToolsProps {
  toolNames: string[]; // 页面只需要传递工具标题数组
}

export default function ExploreOurAiTools({ toolNames }: ExploreOurAiToolsProps) {
  // 在组件内部维护所有工具的完整数据
  const allToolsData: Record<string, AiTool> = {
    "Dog Name Generator": {
      title: "Dog Name Generator",
      description: "Helps you find the unique name based with dog's gender and 13 themes",
      link: "/dog-name-generator",  
      image: "/images/page/dognamegenerator.webp"
    },
    "Dog Calorie Calculator": {
      title: "Dog Calorie Calculator",
      description: "Calculate your dog's daily calorie needs with our AI-powered tool.",
      link: "/dog-calorie-calculator",
      image: "/images/page/dogcalorie.webp"
    },
    "Dog Breed Identifier with AI": {
      title: "Dog Breed Identifier",
      description: "Free to tells you what kind of dog you have",
      link: "https://breed.dog/",
      image: "/images/page/breeddograndombreedhowto.webp"
    },
    "Dog Age Calculator": {
      title: "Dog Age Calculator",
      description: "Discover how old your dog is in human years!",
      link: "/dog-age-calculator",
      image: "/images/page/dog-age-calculator.webp"
    },
    "Random Dog Breed Generator": {
      title: "Random Dog Breed Generator",
      description: "Generate random dog pictures and details with just one tap.",
      link: "/random-dog-breed-generator",
      image: "/images/page/random-dog-breed-generator.webp"
    },
    "Dog Breed Quiz": {
      title: "Dog Breed Quiz",
      description: "Find the perfect dog breed for you based on your lifestyle and preferences.",
      link: "/dog-breed-quiz",
      image: "/images/page/dog-breed-quiz.webp"
    },
    "What Dog Breed Am I?": {
      title: "What Dog Breed Am I?",
      description: "Discover which dog breed matches your personality with our fun quiz.",
      link: "/what-dog-breed-am-i",
      image: "/images/page/whatdogbreedami.webp"
    },
    "Dog Weight Calculator": {
      title: "Dog Weight Calculator",
      description: "Calculate your dog's weight based on their breed and size.",
      link: "/dog-weight-calculator",
      image: "/images/page/dog-weight-hero.webp"
    },
    "Dog Translator Online": {
      title: "Dog Translator Online",
      description: "Translate any language into dog language with our free AI tool.",
      link: "/dog-translator-online",
      image: "/images/page/dogtranslation.webp"
    },
    "Dog Bite Settlement Calculator": {
      title: "Dog Bite Settlement Calculator",
      description: "Calculate your dog bite settlement with our free tool.",
      link: "/dog-bite-settlement-calculator",
      image: "/images/page/dog-bite-settlement-calculator.webp"
    },
    "Dog Chocolate Toxicity Calculator": {
      title: "Dog Chocolate Toxicity Calculator",
      description: "Check if your dog ate dangerous amounts of chocolate with our calculator.",
      link: "/dog-chocolate-toxicity-calculator",
      image: "/images/page/dog-chocolate-toxicity-calculator.webp"
    },
    "Dog Onion Toxicity Calculator": {
      title: "Dog Onion Toxicity Calculator",
      description: "Calculate onion toxicity risk for your dog based on amount consumed.",
      link: "/dog-onion-toxicity-calculator",
      image: "/images/page/dog-onion-toxicity-calculator-hero.webp"
    },
    "Dog Grape Toxicity Calculator": {
      title: "Dog Grape Toxicity Calculator",
      description: "Assess grape toxicity risk if your dog ate grapes or raisins.",
      link: "/dog-grape-toxicity-calculator",
      image: "/images/page/dog-grape-toxicity-calculator.webp"
    },
    "Dog Pregnancy Calculator": {
      title: "Dog Pregnancy Calculator",
      description: "Track your dog's pregnancy timeline and expected due date.",
      link: "/dog-pregnancy-calculator",
      image: "/images/page/dog-pregnancy-calculator.webp"
    },
    "Dog Heat Cycle Calculator": {
      title: "Dog Heat Cycle Calculator",
      description: "Predict your dog's next heat cycle and fertile periods.",
      link: "/dog-heat-cycle-calculator",
      image: "/images/page/dog-heat-cycle-calculator-how-to.webp"
    },
    "Dog Water Intake Calculator": {
      title: "Dog Water Intake Calculator",
      description: "Calculate how much water your dog needs daily for optimal health.",
      link: "/dog-water-intake-calculator",
      image: "/images/page/dog-water-intake-calculator.webp"
    },
    "Dog Food Calculator": {
      title: "Dog Food Calculator",
      description: "Determine the right amount of food for your dog's daily needs.",
      link: "/dog-food-calculator",
      image: "/images/page/dog-food-calculator.webp"
    },
    "Homemade Dog Food Calculator": {
      title: "Homemade Dog Food Calculator",
      description: "Create balanced homemade meals with proper nutrition for your dog.",
      link: "/homemade-dog-food-calculator",
      image: "/images/page/homemade-dog-food.webp"
    },
    "Raw Dog Food Calculator": {
      title: "Raw Dog Food Calculator",
      description: "Calculate raw food portions for your dog's BARF diet.",
      link: "/raw-dog-food-calculator",
      image: "/images/page/raw-dog-calculation.webp"
    },
    "Dog Lap Day Calculator": {
      title: "Dog Lap Day Calculator",
      description: "Find out special lap day celebrations with your furry friend.",
      link: "/dog-lap-day-calculator",
      image: "/images/page/dog-lap-day-calculator.webp"
    },
    "Guess the Dog Breed": {
      title: "Guess the Dog Breed",
      description: "Challenge yourself to identify dog breeds from high-quality photos.",
      link: "/guess-the-dog-breed",
      image: "/images/page/guess-the-dog-breed1.webp"
    },
    "Dog Breed Identifier": {
      title: "Dog Breed Identifier",
      description: "Identify your dog's breed online with our free AI tool.",
      link: "/dog-breed-identifier",
      image: "/images/page/dogbreedhero.webp"
    }
  };

  // 根据传入的工具名称过滤出要显示的工具
  const toolsToDisplay = toolNames.map(name => allToolsData[name]).filter(Boolean);

  return (
    <section className="max-w-7xl mx-auto mt-16 mb-10">
      <div className="bg-surface-light rounded-3xl p-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10">Explore Our AI Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {toolsToDisplay.map((tool, index) => (
            <a 
              key={index} 
              href={tool.link}
              className="bg-white/50 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 border border-primary-light/20"
            >
              <div className="relative h-40">
                <img
                  src={tool.image}
                  alt={tool.title}
                  width="320"
                  height="160"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-lg">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
