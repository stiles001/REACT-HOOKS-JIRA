export const useProjectsSearchParams = (param: { name: string, personId: number }) => {
    return { ...param, personId: Number(param.personId) || undefined };
}