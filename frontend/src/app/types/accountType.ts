export default interface MyAccount {
    id?: number,
    userId: number | undefined,
    bankName: string,
    accountNumber:string,
    accountHolder:string,
    balance: number
}