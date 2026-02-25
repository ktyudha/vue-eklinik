export function withSubComponents<
    T extends object,
    S extends Record<string, unknown>
>(component: T, sub: S): T & S {
    return Object.assign(component, sub)
}