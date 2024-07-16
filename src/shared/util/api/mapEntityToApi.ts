import omit from 'lodash/omit';

const omitedProps = ['id', '_isFake'];

export const mapEntityToApi = (entity: any) => {
  return omit(entity, omitedProps);
};
