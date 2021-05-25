import { categories } from './categoriesList'

export const KEYS = categories.reduce(function (result, item) {
    result[item] = item.trim().replace(/ +/g, '_').replace(/:/g, '-').toUpperCase()

    return result
}, {})