import { QueryFnData } from 'shared/types/query';

export const restorePagesStructure = (pages: QueryFnData[], pageSize: number) => {
  if (pages.length <= 1) {
    return pages;
  }

  const flatPages = pages.map(({ items }) => items).reverse().flat();

  const result: { items: QueryFnData['items'] }[] = [];

  for (let i = 0; i < flatPages.length; i++) {
    const newPageIndex = Math.floor(i / pageSize);
    if (!result[newPageIndex]) {
      result[newPageIndex] = {
        items: [],
      };
    }
    result[newPageIndex].items.push(flatPages[i]);
  }

  result.reverse();
  
  return result
    .filter(({ items }) => !!items.length)
    .map(((data, index) => {
      const isFirst = index === 0;
      const isLast = result.length - 1 === index;
      const isOnlyOnePage = result.length === 1;

      if (isOnlyOnePage) {
        return {
          items: data.items,
          hasNextPage: pages[pages.length - 1].hasNextPage,
          hasPrevPage: pages[0].hasPrevPage,
        };
      }

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