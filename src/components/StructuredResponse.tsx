import React from 'react';
import { CheckCircle, FileText, Users, Lightbulb, ArrowRight } from 'lucide-react';

interface StructuredResponseData {
  answer?: {
    title: string;
    value: string;
  };
  next_steps?: {
    title: string;
    value: string;
  };
  documents?: {
    title: string;
    value: string;
  };
  resources?: {
    title: string;
    value: string;
  };
  alternatives?: {
    title: string;
    value: string;
  };
}

interface StructuredResponseProps {
  data: StructuredResponseData;
}

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'answer':
      return <CheckCircle size={20} className="text-green-400" />;
    case 'next_steps':
      return <ArrowRight size={20} className="text-blue-400" />;
    case 'documents':
      return <FileText size={20} className="text-purple-400" />;
    case 'resources':
      return <Users size={20} className="text-orange-400" />;
    case 'alternatives':
      return <Lightbulb size={20} className="text-yellow-400" />;
    default:
      return <CheckCircle size={20} className="text-gray-400" />;
  }
};

const getColorForCategory = (category: string) => {
  switch (category) {
    case 'answer':
      return 'border-green-400/30 bg-green-400/10';
    case 'next_steps':
      return 'border-blue-400/30 bg-blue-400/10';
    case 'documents':
      return 'border-purple-400/30 bg-purple-400/10';
    case 'resources':
      return 'border-orange-400/30 bg-orange-400/10';
    case 'alternatives':
      return 'border-yellow-400/30 bg-yellow-400/10';
    default:
      return 'border-gray-400/30 bg-gray-400/10';
  }
};

export const StructuredResponse: React.FC<StructuredResponseProps> = ({ data }) => {
  const categories = Object.entries(data).filter(([_, value]) => value && value.title && value.value);

  return (
    <div className="space-y-3">
      {categories.map(([category, item]) => (
        <div
          key={category}
          className={`p-4 rounded-xl border backdrop-blur-sm ${getColorForCategory(category)} hover:scale-[1.02] transition-all duration-200`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIconForCategory(category)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white mb-2 text-sm">
                {item.title}
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {item.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};