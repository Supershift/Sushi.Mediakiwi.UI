export interface ICompany {
    id: number;
    name: string | null;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    logo?: string;
    description?: string | null;
}