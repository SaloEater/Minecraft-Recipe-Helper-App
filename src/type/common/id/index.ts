export interface IdStoreInterface
{
    getNextId: (type: string) => number;
    updateNextId: (type: string) => void;
}