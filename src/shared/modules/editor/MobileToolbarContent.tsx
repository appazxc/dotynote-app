import { ArrowLeftIcon } from 'shared/components/TiptapIcons/ArrowLeftIcon';
import { HighlighterIcon } from 'shared/components/TiptapIcons/HighlighterIcon';
import { LinkIcon } from 'shared/components/TiptapIcons/LinkIcon';
import {
  ColorHighlightPopoverContent,
} from 'shared/components/TiptapUi/ColorHighlightPopover';
import {
  LinkContent,
} from 'shared/components/TiptapUi/LinkPopover';
import { Button } from 'shared/components/TiptapUiPrimitive/Button';
import {
  ToolbarGroup,
  ToolbarSeparator,
} from 'shared/components/TiptapUiPrimitive/Toolbar';

export const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: 'highlighter' | 'link'
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);