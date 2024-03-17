export interface Message {
    text: string;
    sender: string;
    timestamp: Date;
    isSent: boolean;
    isRead?: boolean;
    attachment?: string;
    type: MessageType;
}

export enum MessageType {
    sent, received, info
}