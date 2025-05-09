import { createContext, useContext } from "react";
import { Container, type ServiceIdentifier } from 'inversify';


type Props = {
    container: Container;
    children: React.ReactNode
}

const DIContext = createContext<Container | null>(null);

export const DIProvider: React.FC<Props> = ({ children, container }) => {
    return (
        <DIContext.Provider value={container}>
            {children}
        </DIContext.Provider>
    )
}

export function useInjection<T>(identifier: ServiceIdentifier<T>): T {
    const container = useContext(DIContext);

    if (!container) {
        throw new Error("DIProvider missing in component tree");
    }

    return container.get<T>(identifier);
}
