export const toEntity = <T, S>(dto: T, entity: S) => {
  Object.keys(dto).forEach((key) => {
    entity[key] = dto[key];
  });
};
