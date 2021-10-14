import { useSearchParams } from "react-router-dom"

/**
 * return param in url
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams();
    return [
        keys.reduce((prev: {}, key: K) => {
            return { [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }),
        setSearchParam
    ] as const
}
