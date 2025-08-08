export const getEditorStyles = () => {
  return {
    'p': {
      fontSize: '1rem',
      lineHeight: '1.6',
      fontWeight: '400',
      marginTop: '0.5rem',
    },
    'p:first-of-type': {
      marginTop: 0,
    },

    a: {
      color: 'var(--purple)',
      cursor: 'pointer',

      '&:hover': {
        color: 'var(--purple-contrast)',
      },
    },

    /* List styles */
    ul: {
      listStyle: 'disc',
      padding: '0 1rem',
      margin: '1.25rem 1rem 1.25rem 0.4rem',

      'li p': {
        marginTop: '0.25em',
        marginBottom: '0.25em',
      },
    },

    ol: {
      listStyle: 'decimal',
      padding: '0 1rem',
      margin: '1.25rem 1rem 1.25rem 0.4rem',

      'li p': {
        marginTop: '0.25em',
        marginBottom: '0.25em',
      },
    },

    /* Heading styles */
    h1: {
      lineHeight: 1.1,
      marginTop: '3.5rem',
      marginBottom: '1.5rem',
      fontSize: '1.4rem',
      textWrap: 'pretty',
      fontWeight: '700',
    },

    h2: {
      lineHeight: 1.1,
      marginTop: '3.5rem',
      marginBottom: '1.5rem',
      fontSize: '1.2rem',
      textWrap: 'pretty',
      fontWeight: '700',
    },

    h3: {
      lineHeight: 1.1,
      marginTop: '2.5rem',
      fontSize: '1.1rem',
      textWrap: 'pretty',
      fontWeight: '600',
    },

    h4: {
      lineHeight: 1.1,
      marginTop: '2.5rem',
      fontSize: '1rem',
      textWrap: 'pretty',
      fontWeight: '600',
    },

    h5: {
      lineHeight: 1.1,
      marginTop: '2.5rem',
      fontSize: '1rem',
      textWrap: 'pretty',
      fontWeight: '600',
    },

    h6: {
      lineHeight: 1.1,
      marginTop: '2.5rem',
      fontSize: '1rem',
      textWrap: 'pretty',
      fontWeight: '600',
    },

    /* Code and preformatted text styles */
    code: {
      backgroundColor: 'var(--purple-light)',
      borderRadius: '0.4rem',
      color: 'var(--black)',
      fontSize: '0.85rem',
      padding: '0.25em 0.3em',
    },

    '.code-block': {
      position: 'relative',
    },

    blockquote: {
      borderLeft: '3px solid var(--gray-3)',
      margin: '1.5rem 0',
      paddingLeft: '1rem',
    },

    hr: {
      border: 'none',
      borderTop: '1px solid var(--gray-2)',
      margin: '2rem 0',
    },

    /* Table-specific styling */
    table: {
      borderCollapse: 'collapse',
      margin: 0,
      overflow: 'hidden',
      tableLayout: 'fixed',
      width: '100%',

      'td, th': {
        border: '1px solid var(--gray-3)',
        boxSizing: 'border-box',
        minWidth: '1em',
        padding: '6px 8px',
        position: 'relative',
        verticalAlign: 'top',

        '> *': {
          marginBottom: 0,
        },
      },

      th: {
        backgroundColor: 'var(--gray-1)',
        fontWeight: 'bold',
        textAlign: 'left',
      },

      '.selectedCell:after': {
        background: 'var(--gray-2)',
        content: '""',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 2,
      },

      '.columnResizeHandle': {
        backgroundColor: 'var(--purple)',
        bottom: '-2px',
        pointerEvents: 'none',
        position: 'absolute',
        right: '-2px',
        top: 0,
        width: '4px',
      },
    },

    '.tableWrapper': {
      margin: '1.5rem 0',
      overflowX: 'auto',
    },

    '.resize-cursor': {
      cursor: 'col-resize',
    },
  };
};

export const getEditorCss = () => ({
});

export const getPostEditorCss = () => ({
  '--heading-size-h1': 'var(--paragraph-font-size)',
  '--heading-size-h2': 'var(--paragraph-font-size)',
  '--heading-size-h3': 'var(--paragraph-font-size)',
  '--heading-size-h4': 'var(--paragraph-font-size)',
  '--heading-margin-top-h1': 'var(--paragraph-margin-top)',
  '--heading-margin-top-h2': 'var(--paragraph-margin-top)',
  '--heading-margin-top-h3': 'var(--paragraph-margin-top)',
  '--heading-margin-top-h4': 'var(--paragraph-margin-top)',
  '--heading-weight-h1': 'var(--paragraph-font-weight)',
  '--heading-weight-h2': 'var(--paragraph-font-weight)',
  '--heading-weight-h3': 'var(--paragraph-font-weight)',
  '--heading-weight-h4': 'var(--paragraph-font-weight)',
});

export const getEditorStylesWithAmpersand = <T extends object>(styles: T) => {
  const result: Record<string, any> = {};
  
  Object.keys(styles).forEach(key => {
    result[`& ${key}`] = styles[key as keyof typeof styles];
  });
  
  return result;
}; 
