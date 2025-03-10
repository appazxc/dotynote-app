import { QueryFnData } from 'shared/types/query';

export const restorePagesStructure = (pages: QueryFnData[], pageSize: number) => {
  const length = pages.length;

  if (length <= 1) {
    return pages;
  }

  const result: QueryFnData[] = [];

  for (let i = 0; i < length; i++) {
    const data = pages[i];
    const { items, ...restDataProps } = data;
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
        ...restDataProps,
      };
      continue;
    }

    const lengthToFill = pageSize - lastDataLength;

    lastData.items = [...items.slice(-lengthToFill), ...lastData.items];

    result.push({
      ...restDataProps,
      items: items.slice(0, items.length - lengthToFill),
    });
  }

  return result;
};