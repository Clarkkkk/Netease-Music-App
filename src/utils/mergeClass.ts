export type VueClass = string | Array<string | Record<string, boolean>>

export function mergeClass(firstClass: VueClass, secondClass?: VueClass): VueClass {
    if (!secondClass) return firstClass
    return [firstClass, secondClass].flat()
}
