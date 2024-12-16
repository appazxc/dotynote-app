import React from 'react';

export const useFileImageUrl = (file: File) => {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return url;
};