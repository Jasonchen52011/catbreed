

interface WhyChooseSectionProps {
  whyChooseSection: {
    title: string
    features: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  testimonialsConfig: any[]
}

export default function WhyChooseSection({ whyChooseSection, testimonialsConfig }: WhyChooseSectionProps) {
  return (
    <section className="py-10 bg-white">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 sm:mb-6 text-gray-800">
            {whyChooseSection.title}
          </h2>
        </div>
        
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {whyChooseSection.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl text-sky-400 mb-6">
                <span 
                  dangerouslySetInnerHTML={{
                    __html: `<i class="${feature.icon}" style="font-weight: 900;"></i>`
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
} 