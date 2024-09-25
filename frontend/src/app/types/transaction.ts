export default interface Transaction {
    id?: number,
    virtualAccountId: number,
    amount: number,
    description: string
}