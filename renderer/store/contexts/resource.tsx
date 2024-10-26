import { createContext, useState } from "react";
import { EResource } from "../../typing/resource";

interface IProps {
    setResource: (resources: TResourceData)=> void
    getResource: (resource: EResource) => string[]
}

export const resourceContext = createContext<IProps>({} as IProps)

type TResourceData = 
    {[key in EResource]: string[]}


export const ResourceProvider = ({children}) => {
    const [data, setData] = useState<TResourceData>({} as TResourceData) 
    
    function setResource(resources: TResourceData){
        setData(resources)
    }

    function getResource(resource: EResource){
        return data[resource]
    }

    const value: IProps = {
        setResource,
        getResource
    }

    return (
        <resourceContext.Provider value={value}>
            {children}
        </resourceContext.Provider>
    )
}