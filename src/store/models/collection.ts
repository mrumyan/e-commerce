export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

export const linearizeCollection = <K extends string | number, T>(
  elements: CollectionModel<K, T>
): T[] => elements.order.map((el) => elements.entities[el]);

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

export const addToCollection = <K extends string | number, T>(
  items: T[],
  getKeyForElement: (element: T) => K,
  previousCollection: CollectionModel<K, T>
): CollectionModel<K, T> => {
  items.forEach((item) => {
    const id = getKeyForElement(item);
    if (!previousCollection.order.includes(id)) {
      previousCollection.order.push(id);
      previousCollection.entities[id] = item;
    }
  });
  return previousCollection;
};
