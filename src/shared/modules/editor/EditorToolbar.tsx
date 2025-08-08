import React from 'react';

import { Toolbar } from 'shared/components/TiptapUiPrimitive/Toolbar';
import { MainToolbarContent } from 'shared/modules/editor/MainToolbarContent';
import { MobileToolbarContent } from 'shared/modules/editor/MobileToolbarContent';

export const EditorToolbar = ({ isMobile = false }: { isMobile?: boolean }) => {
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const [mobileView, setMobileView] = React.useState<
  'main' | 'highlighter' | 'link'
  >('main');
  
  React.useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main');
    }
  }, [isMobile, mobileView]);

  return (
    <Toolbar ref={toolbarRef}>
      {mobileView === 'main' ? (
        <MainToolbarContent
          isMobile={isMobile}
          onHighlighterClick={() => setMobileView('highlighter')}
          onLinkClick={() => setMobileView('link')}
        />
      ) : (
        <MobileToolbarContent
          type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
          onBack={() => setMobileView('main')}
        />
      )}
    </Toolbar>
  );
};