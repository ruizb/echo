import { Part } from '../models/part'
import { noop } from '../utils'

export const id = `${Part.Introduction}-section`

export const section = document.getElementById(id)

export const load = noop

export const unload = noop
