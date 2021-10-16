import { useCallback, useReducer, useState } from "react"
import { useMountRef } from "utils"

interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null, 
    error: null
}

const useSafeDispatch = <T>(dispath: (...args: T[]) => void) => {
    const mountedRef = useMountRef();

    return useCallback((...args:T[]) => (mountedRef.current ? dispath(...args) : void 0), [dispath, mountedRef])
} 

export const useAsync = <D>(initialState?: State<D>) => {
    const [state, dispatch] = useReducer((state: State<D>, action:Partial<State<D>>) => ({ ...state, ...action }) ,{
        ...defaultInitialState,
        ...initialState
    })

    const safeDiaptch = useSafeDispatch(dispatch)

    const [retry, setRetry] = useState(() => ()=> {
    })

    const setData = (data: D) => safeDiaptch({
        data,
        stat: 'success',
        error: null
    })

    const setError = (error: Error) => safeDiaptch({
        error,
        stat: 'error',
        data: null
    })

    

    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if(!promise || !promise.then) {
            throw new Error('please input promise');
        }
        setRetry(() => () => {
            if(runConfig?.retry) {
                run(runConfig?.retry(), runConfig);
            }
        })
        safeDiaptch({ stat: "loading" });
        return promise
            .then(data => {
                setData(data);
                return data
            }).catch(err => {
                setError(err);
                return err;
            })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        retry,
        ...state
    }
}