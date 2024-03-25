const block = {
  type: 'box',
  styles: {
    padding: '2',
  },
  blocks: [
    {
      type: 'box',
      blocks: [
        {
          type: 'date',
          variant: 1,
          styles: {
            color: ['red', 'green'],
          },
        },
      ],
    },
  ],
};

export type Types = 
  | 'box'
  | 'title'
  | 'description'
  | 'userAvatar'
  | 'noteAvatar'
  | 'doty'
  | 'dots'
  | 'content'
  | 'file'
  | 'excalidraw'
  | 'video'
  | 'stream'
  | 'music'
  | 'audio'
  | 'record'
  | 'date'
  | 'box'
  | 'box'

export { block };