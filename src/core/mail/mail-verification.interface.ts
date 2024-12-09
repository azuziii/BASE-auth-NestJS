export const IMailVerification = 'IMailVerification';
export interface IMailVerification {
  sendMail(email: string, content: string): Promise<void>;
}
