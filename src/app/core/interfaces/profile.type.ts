export interface ProfileResponse{
 success: boolean;
 data: {
 id: string;
 firstName: string;
 lastName: string;
 email: string;
 phone: string;
 role: string;
 createdAt: string;
 updatedAt: string;
 };
}