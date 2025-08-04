export const schema = {
  content: [
    {
      id: 'blockId',
      type: 'box',
      clickAction: 'openNote',
      altClickAction: 'openNoteInNewTab',
      styles: {
        backgroundColor: 'red',
      },
      content: [
        {
          id: 'blockId',
          type: 'text',
          styles: {
            color: 'blue',
          },
          stateStyles: {
            isSelected: {
              color: 'green',
            },
            isSelecting: {
              color: 'yellow',
            },
            isPinned: {
              color: 'orange',
            },
          },
          text: 'Hello',
        },
        {
          id: 'blockId',
          type: 'images',
          props: {
            borderRadius: 'md',
          },
        },
        {
          id: 'blockId',
          type: 'nestedPosts',
        },
      ],
    },
  ],
};