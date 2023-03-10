export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const linearizeCollection = <K extends string | number, T>(
  collection: CollectionModel<K, T>
): T[] => collection.order.map((el) => collection.entities[el]);

export const normalizeCollection = <K extends string | number, T>(
  items: T[],
  getKeyForElement: (element: T) => K
): CollectionModel<K, T> => {
  const collection: CollectionModel<K, T> = getInitialCollectionModel();

  items.forEach((item) => {
    const id = getKeyForElement(item);
    collection.order.push(id);
    collection.entities[id] = item;
  });

  return collection;
};

export const joinCollections = <K extends string | number, T>(
  currentCollection: CollectionModel<K, T>,
  additionalCollection: CollectionModel<K, T>
): CollectionModel<K, T> => {
  const newOrder: K[] = currentCollection.order.concat(
    additionalCollection.order
  );
  const newEntities: Record<K, T> = currentCollection.entities;
  additionalCollection.order.map(
    (el) => (newEntities[el] = additionalCollection.entities[el])
  );

  const newCollection: CollectionModel<K, T> = {
    order: newOrder,
    entities: newEntities,
  };

  return newCollection;
};

export const getLength = <K extends string | number, T>(
  list: CollectionModel<K, T>
): number => list.order.length;
