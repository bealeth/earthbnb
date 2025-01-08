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
> & {
  createdAt: string; // Convertir a string
  updatedAt: string; // Convertir a string
  emailVerified: string | null; // Convertir a string o null
  role: string; // Asegurarse de incluir el rol

};

export type SafeUser2 = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string; // Convertir a string
  updatedAt: string; // Convertir a string
  emailVerified: string | null; // Convertir a string o null
  role: string; 
  name: string;
  bio: string;
  listings: Array<{ id: string; title: string }>; // Define los listings
};



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