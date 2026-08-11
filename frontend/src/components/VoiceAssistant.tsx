import React, { useEffect } from 'react';
import { Volume2, Sparkles, X } from 'lucide-react';
import { useExport } from '../store/exportStore';
import { translations } from '../utils/translations';

const STEP_VOICE_SCRIPTS = {
  en: {
    1: "Step 1: Please position your handcrafted product in front of the camera or upload a clear photo. AI will detect the craft type and materials.",
    2: "Step 2: AI has identified your artisan craft and suggested the best ITC-HS codes with RoDTEP export rebate rates.",
    3: "Step 3: Document OCR. Upload your Commercial Invoice and IEC code. Our OCR will extract all export fields automatically.",
    4: "Step 4: Compliance audit. Checking 10 mandatory export regulations, destination customs rules, and safety checks.",
    5: "Step 5: Smart Packaging Advisor. Review carton dimensions, volumetric weight, and cushioning materials for safe international transit.",
    6: "Step 6: India Post Shipping Estimator. Compare International EMS Speed Post and Air Parcel tariffs with real-time currency conversion.",
    7: "Step 7: Congratulations! Your export readiness score is computed. Generate your official Postal Bill of Export docket and barcode sticker."
  },
  hi: {
    1: "चरण 1: कृपया अपने हस्तशिल्प उत्पाद को कैमरे के सामने रखें या फोटो अपलोड करें। एआई शिल्प के प्रकार और सामग्री की पहचान करेगा।",
    2: "चरण 2: एआई ने आपके उत्पाद की पहचान कर ली है और 2.5% RoDTEP निर्यात छूट के साथ सही एचएस कोड का सुझाव दिया है।",
    3: "चरण 3: दस्तावेज़ ओसीआर। अपना वाणिज्यिक चालान और आईईसी कोड अपलोड करें। सभी विवरण स्वतः दर्ज हो जाएंगे।",
    4: "चरण 4: अनुपालन जांच। 10 प्रमुख निर्यात नियमों और अंतरराष्ट्रीय सीमा शुल्क नियमों की स्वचालित जांच हो रही है।",
    5: "चरण 5: स्मार्ट पैकेजिंग सलाहकार। अंतरराष्ट्रीय पार्सल के लिए कार्टन आकार, आयतनात्मक वजन और सुरक्षा पैकिंग देखें।",
    6: "चरण 6: भारतीय डाक शिपिंग शुल्क। इंटरनेशनल ईएमएस स्पीड पोस्ट और एयर पार्सल की दरों और समय की तुलना करें।",
    7: "चरण 7: बधाई हो! आपका निर्यात स्कोर तैयार है। अपना आधिकारिक पोस्टल बिल ऑफ एक्सपोर्ट डॉकेट और बारकोड तैयार करें।"
  }
};

export const VoiceAssistant: React.FC = () => {
  const { currentStep, language, isVoiceActive, setIsVoiceActive, speakVoicePrompt } = useExport();

  const script = STEP_VOICE_SCRIPTS[language][currentStep];

  useEffect(() => {
    if (isVoiceActive) {
      speakVoicePrompt(script);
    }
  }, [currentStep, isVoiceActive, language]);

  if (!isVoiceActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-md w-full px-4 animate-float">
      <div className="glass-panel-glow p-4 rounded-2xl border border-dak-saffron-500/50 shadow-2xl bg-dak-navy-900/95 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          
          {/* Avatar Icon with Animated Audio Ring */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-dak-saffron-500 to-amber-400 flex items-center justify-center shadow-lg shadow-dak-saffron-500/30">
              <Volume2 className="w-5 h-5 text-white animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dak-saffron-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-dak-saffron-500"></span>
            </span>
          </div>

          {/* Transcript & Controls */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-dak-saffron-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'hi' ? 'डाकसेतु एआई ध्वनि सहायक' : 'DakSetu AI Voice Narrator'}
              </span>
              <button
                onClick={() => setIsVoiceActive(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-1 text-xs text-slate-200 font-medium leading-relaxed">
              "{script}"
            </p>

            <div className="mt-2.5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-3.5 bg-dak-saffron-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-2.5 bg-dak-saffron-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="w-1.5 h-4 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
              </div>

              <button
                onClick={() => speakVoicePrompt(script)}
                className="text-[11px] font-bold text-dak-saffron-400 hover:text-dak-saffron-300 underline"
              >
                {language === 'hi' ? 'पुनः सुनें (Replay)' : 'Replay Voice'}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
