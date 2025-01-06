import { Listing, Reservation, User, Report, Post} from "@prisma/client";


export type SafeListing =Omit<
    Listing,
    "createdAt"    
> & {
    createdAt: string;
}

export type safeReservation = Omit<
    Reservation,
    "createdAt" | "startDate" | "endDate" | "listing"
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;

}

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> &{
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    role: string;
}

export type SafeReport = Omit<Report, "createdAt" | "title" | "reportedUser"> & {
    createdAt: string;
    title: string;
    // Mantén solamente `reportedUserId` en vez de `reportedUser`
    reportedUserId: string;
  };
  
  

export type SafePost = Omit<
    Post,
    "createdAt"  
> & {
    createdAt: string;
    
}