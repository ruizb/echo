export const groupBy = <A>(items: A[], discriminant: (item: A) => string) =>
  items.reduce(
    (acc, item) => ({
      ...acc,
      [discriminant(item)]: [...(acc[discriminant(item)] ?? []), item]
    }),
    {} as { [index: string]: A[] }
  )

export const sum = (items: number[]): number =>
  items.reduce((acc, n) => acc + n, 0)

export const tail = <A>(list: A[]): A[] => list.slice(1)

export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return new Array(length)
    .fill('')
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('')
}
