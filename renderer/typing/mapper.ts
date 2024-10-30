export interface IMapper {
    headers: string[], 
    mappers: {
        fileProp: string,
        dataBaseProp: string
    }[],
    model: string
}