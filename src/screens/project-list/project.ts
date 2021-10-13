import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import { Project } from "./list";

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();

// const [isLoading, setIsLoading] = useState(false);

// const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        run(client("projects", { data: cleanObject(param || {}) }))
    }, [param]);

    return result;
}