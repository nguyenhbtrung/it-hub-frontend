import { JSX } from 'react';
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

interface CalloutComponentProps {
  attrs: { type?: string };
}

const CalloutComponent = ({ attrs }: CalloutComponentProps) => {
  const { type = 'note' } = attrs;
  return (
    <NodeViewWrapper className={`callout callout-${type}`}>
      {/* ICON */}
      <span className='callout-icon'>{icons[type]}</span>

      {/* CONTENT */}
      <NodeViewContent className='callout-content' />
    </NodeViewWrapper>
  );
};

export default CalloutComponent;
