import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_SECTIONS = [
  {
    title: 'Product Information',
    items: [
      { q: 'What is included with the product?', a: 'As standard your sign comes with a 12v plug and wall mounting screws. Other accessories can be added such as a dimmer.' },
      { q: 'What are your neon signs made from?', a: 'The "neon" light is made using Ultra Glow LED technology, giving the most realistic neon glow, night or day! The main structure is made from clear acrylic, ensuring durability and a seamless blend into the wall behind.' },
      { q: 'How bright are Neon Lab by Yash signs?', a: 'Bright enough to fill your room with a neon glow. The optional Remote dimmer is highly recommended — easily increase or decrease the brightness depending on your mood.' },
      { q: 'Does my sign come with a remote dimmer as standard?', a: 'Not as standard, but this can be added as an optional extra when choosing to add a Remote dimmer. This allows you to adjust brightness and turn your sign on/off remotely.' },
      { q: 'How long is the cable?', a: '2m (black) cable from the power adaptor.' },
      { q: 'What plug/power adaptor do the signs use?', a: 'The signs are run from a 12v plug.' },
      { q: 'Can your signs be used outdoors?', a: 'We can make signs splash proof, but not waterproof. They are great for occasional outside use, or outside use undercover.' },
      { q: 'Do you offer colour-changing neon signs?', a: 'Yes, we offer colour-changing neon signs with an RGB option that allows you to change colours and effects with a remote control.' },
    ],
  },
  {
    title: 'Ordering & Custom Designs',
    items: [
      { q: 'How do I order a custom neon sign?', a: 'Use our online Customiser tool to type your text, choose your font, colour, and size, then add to cart. For logo uploads, visit our Logo Upload page.' },
      { q: 'Can I upload my own logo or design?', a: 'Yes! Visit our Logo Upload page to send us your design. Our team will create a digital mockup for your approval before production.' },
      { q: 'What is the maximum text length?', a: 'Up to 30 characters per line. For longer text or multi-line designs, please contact us for a custom quote.' },
      { q: 'Can I see a preview before ordering?', a: 'Absolutely. The Customiser shows a live preview of your sign as you design it. For logo uploads, we send a digital mockup before production.' },
    ],
  },
  {
    title: 'Shipping & Returns',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery is 7-14 business days. Custom signs take 10-21 business days as they are made to order.' },
      { q: 'Do you ship worldwide?', a: 'Yes, we offer free worldwide shipping on orders over £75. For orders under £75, shipping is calculated at checkout.' },
      { q: 'What is your return policy?', a: 'As custom signs are made to order, they are non-returnable unless faulty. Pre-designed signs can be returned within 30 days in original condition.' },
    ],
  },
  {
    title: 'Warranty & Care',
    items: [
      { q: 'What warranty do you offer?', a: 'All our signs come with a 24-month warranty covering manufacturing defects. LED lifespan is rated at 50,000+ hours.' },
      { q: 'How do I clean my neon sign?', a: 'Use a soft dry cloth to gently wipe the acrylic surface. Do not use water or cleaning chemicals directly on the sign.' },
      { q: 'Are your signs energy efficient?', a: 'Yes. Our LED neon signs consume significantly less power than traditional glass neon — typically 12v and very low running costs.' },
    ],
  },
];

export function FaqPage() {
  const [open, setOpen] = useState<string | null>(`${FAQ_SECTIONS[0].title}-0`);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-white">FAQ</h1>
        <p className="text-gray-400 mt-3">Everything you need to know about our neon signs</p>
      </div>

      <div className="space-y-10">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item, i) => {
                const key = `${section.title}-${i}`;
                const isOpen = open === key;
                return (
                  <div key={i} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <button onClick={() => setOpen(isOpen ? null : key)} className="w-full flex items-center justify-between p-4 text-left">
                      <span className="text-white font-medium text-sm lg:text-base">{item.q}</span>
                      <ChevronDown size={20} className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
