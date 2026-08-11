import React, { useState } from 'react';
import { VisualBoundingBox } from '../types';
import { Scan, Eye, Layers } from 'lucide-react';

interface Props {
  imageUrl: string;
  boxes: VisualBoundingBox[];
  title: string;
}

export const BoundingBoxCanvas: React.FC<Props> = ({ imageUrl, boxes, title }) => {
  const [showOverlays, setShowOverlays] = useState(true);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
      
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* AI Bounding Box Overlays */}
      {showOverlays && (
        <div className="absolute inset-0 pointer-events-none">
          {boxes.map((item, idx) => {
            const [ymin, xmin, ymax, xmax] = item.box;
            const isSelected = selectedBoxIndex === idx || selectedBoxIndex === null;

            return (
              <div
                key={idx}
                className="absolute transition-all duration-300 pointer-events-auto"
                style={{
                  top: `${ymin * 100}%`,
                  left: `${xmin * 100}%`,
                  width: `${(xmax - xmin) * 100}%`,
                  height: `${(ymax - ymin) * 100}%`,
                  border: `2px dashed ${item.color}`,
                  backgroundColor: `${item.color}15`,
                  opacity: isSelected ? 1 : 0.4
                }}
                onMouseEnter={() => setSelectedBoxIndex(idx)}
                onMouseLeave={() => setSelectedBoxIndex(null)}
              >
                {/* Confidence Label Tag */}
                <span
                  className="absolute -top-3 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md flex items-center gap-1"
                  style={{ backgroundColor: item.color }}
                >
                  <Scan className="w-3 h-3" />
                  {item.label} ({Math.round(item.confidence * 100)}%)
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Toolbar Overlay */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
        <div className="px-3 py-1.5 rounded-xl bg-dak-navy-950/85 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-slate-200 flex items-center gap-2">
          <Scan className="w-4 h-4 text-dak-saffron-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{boxes.length} AI Vision Layers Active</span>
        </div>

        <button
          onClick={() => setShowOverlays(!showOverlays)}
          className="px-3 py-1.5 rounded-xl bg-dak-navy-950/85 backdrop-blur-md border border-slate-700/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
        >
          <Eye className="w-3.5 h-3.5 text-dak-saffron-400" />
          <span>{showOverlays ? 'Hide Boxes' : 'Show Boxes'}</span>
        </button>
      </div>

    </div>
  );
};
