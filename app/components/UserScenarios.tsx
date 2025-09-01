'use client';

interface Scenario {
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface UserScenariosProps {
  title: string;
  description?: string;
  scenarios: Scenario[];
  buttonText: string;
}

export default function UserScenarios({ title, description, scenarios, buttonText }: UserScenariosProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-gray-600">{description}</p>
          )}
        </div>

        <div className="space-y-16">
          {scenarios.map((scenario, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4 items-center">
              {index % 2 === 0 ? (
                <>
                  <div>
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                      {scenario.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {scenario.description}
                    </p>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      {buttonText}
                      <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                  <div className="relative w-full max-w-md mx-auto">
                    <img
                      src={scenario.image}
                      alt={scenario.alt}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative w-full max-w-md mx-auto order-2 md:order-1">
                    <img
                      src={scenario.image}
                      alt={scenario.alt}
                      className="rounded-2xl object-cover w-full h-auto"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                      {scenario.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {scenario.description}
                    </p>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      {buttonText}
                      <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}