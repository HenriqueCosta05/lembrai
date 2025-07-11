export enum ReminderType {
    MAINTENANCE = 'Manutenção',
    INSPECTION = 'Inspeção',
    DOCUMENT = 'Documentação',
    INSURANCE = 'Seguro',
    OTHER = 'Outro'
}

export enum ReminderStatus {
    PENDING = 'Pendente',
    COMPLETED = 'Completo',
    OVERDUE = 'Atrasado'
}

export interface ReminderDTO {
    id: string;
    vehicleId: string;
    userId: string;
    title: string;
    description?: string;
    type: ReminderType;
    dueDate: Date;
    antecedenceDays?: number;
    status: ReminderStatus;
    isRecurring: boolean;
}
