import React from "react";

import { TabLayout } from "desktop/modules/space/components/TabLayout";
import { NoteTabContent } from "./NoteTabContent";
import { NoteSidebar } from "./containers/NoteSidebar";

export const NoteTab = () => {
  return (
    <TabLayout leftSide={<NoteSidebar />}>
      <NoteTabContent />
    </TabLayout>
  );
};
