export const excludeElementFromList = <A>(element: A, list: A[]): A[] =>
  list
    .slice(0, list.indexOf(element))
    .concat(list.slice(list.indexOf(element) + 1, list.length))

export const head = <A>(list: A[]): A | undefined => list[0]

export const tail = <A>(list: A[]): A[] => list.slice(1)

export const last = <A>(list: A[]): A | undefined => list[list.length - 1]

export const isDefined = <A>(
  value: A | undefined | null
): value is NonNullable<A> => value !== null && value !== undefined

export const noop = () => {}
