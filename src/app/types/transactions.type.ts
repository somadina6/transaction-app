export interface Sender {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  IDNumber: string;
}

export interface Recipient {
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  bank: String;
}

export interface TransactionDataType {
  id: string;
  date: string;
  sender: Sender;
  recipient: Recipient;
  Amount: number;
  CurrencyCd: string;
  Comments: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'REJECTED' | 'PENDING';
}
