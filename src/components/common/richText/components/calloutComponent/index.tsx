import React, { useState, useRef, useEffect, JSX } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

import InfoIcon from '@mui/icons-material/InfoOutline';
import LightbulbIcon from '@mui/icons-material/LightbulbOutline';
import WarningIcon from '@mui/icons-material/WarningOutlined';
import PriorityHighIcon from '@mui/icons-material/PriorityHighOutlined';
import ReportProblemIcon from '@mui/icons-material/ReportProblemOutlined';

const icons: Record<string, JSX.Element> = {
  note: <InfoIcon color='primary' />,
  tip: <LightbulbIcon color='success' />,
  warning: <WarningIcon color='warning' />,
  important: <PriorityHighIcon color='error' />,
  caution: <ReportProblemIcon color='error' />,
};

const CALLOUT_TYPES = [
  { type: 'note', label: 'Ghi chú', icon: icons.note },
  { type: 'tip', label: 'Mẹo', icon: icons.tip },
  { type: 'warning', label: 'Cảnh báo', icon: icons.warning },
  { type: 'important', label: 'Quan trọng', icon: icons.important },
  { type: 'caution', label: 'Thận trọng', icon: icons.caution },
];

const CalloutComponent = ({ node, updateAttributes }: any) => {
  const type = node.attrs.type || 'note';
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔒 đóng dropdown khi click ngoài
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (newType: string) => {
    updateAttributes({ type: newType });
    setOpen(false);
  };

  return (
    <NodeViewWrapper className={`callout callout-${type}`}>
      {/* ICON */}
      <span className='callout-icon' onClick={() => setOpen((v) => !v)} contentEditable={false}>
        {icons[type]}
      </span>

      {/* DROPDOWN */}
      {open && (
        <div className='callout-dropdown' ref={dropdownRef} contentEditable={false}>
          {CALLOUT_TYPES.map((item) => (
            <div
              key={item.type}
              className={`callout-dropdown-item ${item.type === type ? 'active' : ''}`}
              onClick={() => handleSelect(item.type)}
            >
              <span className='icon'>{item.icon}</span>
              <span className='label'>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <NodeViewContent className='callout-content' />
    </NodeViewWrapper>
  );
};

export default CalloutComponent;
