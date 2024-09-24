export default interface Challenge{
    id?: number,
    userId: number,
    accountId:number,
    savedAmount:number,
    targetAmount:number,
    savingCycle: number,
    startDate: string,
    endDate: string,
    challengeName: string,
    challengeStatus: string,
    challengeDescription: string,
}