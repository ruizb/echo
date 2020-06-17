import { sum, tail } from './utils'

export type DestructuredCsvRow = string[]
export type DestructuredCsv = DestructuredCsvRow[]

export const generateCsv = (csv: DestructuredCsv): string =>
  // sounds list are joined on ',' character, so we chose a different one for the CSV separator
  csv.map(columns => columns.join(',')).join('\n')

export const mergeDestructuredCsvs = (
  destructuredCsvs: DestructuredCsv[]
): DestructuredCsv => {
  const nbColsPerCsv = destructuredCsvs.reduce(
    (acc, csv) => [...acc, csv[0].length],
    [] as number[]
  )
  return [
    destructuredCsvs.reduce((acc, csv) => [...acc, ...csv[0]], [] as string[]),
    ...destructuredCsvs.map(tail).reduce((acc, csv, i) => {
      const fillBefore = sum(nbColsPerCsv.slice(0, i))
      const fillAfter = sum(nbColsPerCsv.slice(i + 1))
      return [
        ...acc,
        ...csv.map(
          row =>
            [
              ...new Array(fillBefore).fill(''),
              ...row,
              ...new Array(fillAfter).fill('')
            ] as DestructuredCsvRow
        )
      ]
    }, [])
  ]
}
