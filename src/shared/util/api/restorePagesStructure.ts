import { QueryFnData } from 'shared/types/query';

export const restorePagesStructure = (pages: QueryFnData[], pageSize: number) => {
  if (pages.length <= 1) {
    return pages;
  }

  const result: { items: QueryFnData['items'] }[] = [];

  for (let i = 0; i < length; i++) {
    const data = pages[i];
    const { items } = data;
    const lastData = result[result.length - 1];

    if (!lastData || lastData.items.length === pageSize) {
      result.push(data);
      continue;
    }

    const lastDataLength = lastData.items.length;
    const dataLength = items.length;

    if (lastDataLength + dataLength <= pageSize) { 
      result[result.length - 1] = {
        items: [...items, ...lastData.items],
      };
      continue;
    }

    const lengthToFill = pageSize - lastDataLength;

    lastData.items = [...items.slice(-lengthToFill), ...lastData.items];

    result.push({
      items: items.slice(0, items.length - lengthToFill),
    });
  }

  return result
    .filter(({ items }) => !!items.length)
    .map(((data, index) => {
      const isFirst = index === 0;
      const isLast = result.length - 1 === index;

      if (isFirst) {
        const hasNextPage = pages[0].hasNextPage;
        const hasPrevPage = pages[0].hasPrevPage;

        return {
          items: data.items,
          hasNextPage, 
          hasPrevPage,
        };
      }

      if (isLast) {
        const hasNextPage = pages[pages.length - 1].hasNextPage;
        const hasPrevPage = pages[pages.length - 1].hasPrevPage;

        return {
          items: data.items,
          hasNextPage, 
          hasPrevPage,
        };
      }

      return {
        items: data.items,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }));
};