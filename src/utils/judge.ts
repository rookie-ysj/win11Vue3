interface isSomeType<T> {
  (value: unknown): value is T
}

export const isUndefined: isSomeType<undefined> = (value: unknown) => value === undefined
