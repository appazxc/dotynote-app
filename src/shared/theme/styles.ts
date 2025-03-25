export const getEditorStyles = () => {
  return {
    '&': {
      minHeight: '100%',
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
    },
    '& p.is-editor-empty:first-of-type::before': {
      content: 'attr(data-placeholder)',
      color: 'gray.500',
      float: 'left',
      pointerEvents: 'none',
      height: 0,
    },
    '&:focus': {
      outline: 'none',
    },
    '& h1': {
      fontSize: '1.25rem',
    },
    '& h2': {
      fontSize: '1.15rem',
    },
    '& h3': {
      fontSize: '1rem',
    },
    '& h1, h2, h3, h4, h5, h6 ': {
      lineHeight: '1.1',
      fontWeight: '700',
    },
    '& p:empty::before': {
      content: '"\\A"',
    },
    '& em': {
      fontStyle: 'italic',
    },
    // p: {
    //   marginBlockStart: '1em',
    //   marginBlockEnd: '1em',
    // },
    '& ul li, ol li': {
      marginBottom: '.25em',
    },
    '& ul li::marker, ol li::marker': {
      color: 'var(--chakra-colors-fg)',
    },
    '& ul, ol': {
      padding: '0 1rem',
      margin: '0 1rem 0 .4rem',
    },
    '& ul': {
      listStyle: 'disc',
    },
    '& ol': {
      listStyle: 'decimal',
    },
    '& a': {
      color: 'editorLink',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& code': {
      bg: '#6161611a',
      color: '#616161',
    },
    '& pre': {
      fontFamily: "JetBrainsMono, 'Courier New', Courier, monospace",
      background: 'gray.900',
      color: 'white',
      padding: '0.75rem 1rem',
      rounded: 'lg',
      whiteSpace: 'pre-wrap',
      margin: '10px 0',
      code: {
        color: 'inherit',
        p: 0,
        background: 'none',
        fontSize: '0.8em',
      },
  
      '& .hljs-comment, .hljs-quote': {
        color: '#616161',
      },
  
      // eslint-disable-next-line max-len
      '& .hljs-variable, .hljs-template-variable,  .hljs-attribute, .hljs-tag, .hljs-name, .hljs-regexp, .hljs-link, .hljs-name, .hljs-selector-id, .hljs-selector-class':
        {
          color: '#F98181',
        },
  
      '& .hljs-number,  .hljs-meta, .hljs-built_in, .hljs-builtin-name, .hljs-literal,  .hljs-type, .hljs-params': {
        color: '#FBBC88',
      },
  
      '& .hljs-string, .hljs-symbol, .hljs-bullet': {
        color: '#B9F18D',
      },
  
      '& .hljs-title, .hljs-section': {
        color: '#FAF594',
      },
  
      '& .hljs-keyword, .hljs-selector-tag': {
        color: '#70CFF8',
      },
  
      '& .hljs-emphasis': {
        fontStyle: 'italic',
      },
  
      '& .hljs-strong': {
        fontWeight: 700,
      },
    },
    '& blockquote': {
      pl: 4,
      borderLeft: '2px solid rgba(13, 13, 13, 0.1)',
    },
    '& span[data-spoiler]': {
      bg: 'gray.900',
      _hover: {
        bg: 'transparent',
      },
      // @apply dark:bg-gray-100 bg-gray-900 dark:hover:bg-transparent hover:bg-transparent;
    },
    '& img': {
      maxW: 'full',
      h: 'auto',
    },
    '& mark': {
      bg: '#FAF594',
    },
    '& hr': {
      border: 'none',
      borderTop: '2px solid rgba(#0D0D0D, 0.1)',
      margin: '2rem 0',
    },
  };
}; 
