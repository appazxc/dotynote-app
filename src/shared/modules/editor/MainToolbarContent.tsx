import { BlockquoteButton } from 'shared/components/TiptapUi/BlockquoteButton';
import { CodeBlockButton } from 'shared/components/TiptapUi/CodeBlockButton';
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
} from 'shared/components/TiptapUi/ColorHighlightPopover';
import { HeadingDropdownMenu } from 'shared/components/TiptapUi/HeadingDropdownMenu';
// import { ImageUploadButton } from 'shared/components/TiptapUi/ImageUploadButton';
import {
  LinkButton,
  LinkPopover,
} from 'shared/components/TiptapUi/LinkPopover';
import { ListDropdownMenu } from 'shared/components/TiptapUi/ListDropdownMenu';
import { MarkButton } from 'shared/components/TiptapUi/MarkButton';
import { TextAlignButton } from 'shared/components/TiptapUi/TextAlignButton';
// import { ThemeToggle } from 'shared/components/TiptapUi/ThemeToggle';
import { UndoRedoButton } from 'shared/components/TiptapUi/UndoRedoButton';
import { Spacer } from 'shared/components/TiptapUiPrimitive/Spacer';
import {
  ToolbarGroup,
  ToolbarSeparator,
} from 'shared/components/TiptapUiPrimitive/Toolbar';

export const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu
          types={['bulletList', 'orderedList', 'taskList']}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover autoOpenOnLinkActive={false} /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      {/* <ToolbarSeparator /> */}

      {/* <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup> */}

      <Spacer />

      {/* {isMobile && <ToolbarSeparator />} */}

      {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
    </>
  );
};