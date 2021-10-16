import { useCallback, useState } from "react"
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

export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    const [retry, setRetry] = useState(() => ()=> {
    })

    const setData = useCallback((data: D) => setState({
        data,
        stat: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => setState({
        error,
        stat: 'error',
        data: null
    }), [])

    const mountedRef = useMountRef();

    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if(!promise || !promise.then) {
            throw new Error('please input promise');
        }
        setRetry(() => () => {
            if(runConfig?.retry) {
                run(runConfig?.retry(), runConfig);
            }
        })
        setState(prevState => ({ ...state, stat: "loading" }));
        return promise
            .then(data => {
                if(mountedRef.current) setData(data);
                return data
            }).catch(err => {
                setError(err);
                return err;
            })
    }, [mountedRef, setData, state, setError])

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