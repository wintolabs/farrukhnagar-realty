import { db } from "./firebase";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import type {
  Property,
  NewPropertyInput,
  UpdatePropertyInput,
} from "@/types/property";
import { Lead, LeadStatus, NewLeadInput } from "@/types/lead";
import { ContactLead, ContactLeadStatus } from "@/types/contactLead";

// ---------------------------------------------------property------------------------------------------------------------------------

export async function addProperty(data: NewPropertyInput): Promise<string> {
  const docRef = await addDoc(collection(db, "properties"), {
    ...data,
    isDeleted: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProperty(id: string, data: UpdatePropertyInput) {
  const docRef = doc(db, "properties", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// 🔄 Soft delete: just mark isDeleted = true
export async function deleteProperty(id: string) {
  const docRef = doc(db, "properties", id);
  await updateDoc(docRef, {
    isDeleted: true,
    updatedAt: serverTimestamp(),
  });
}

// 🧾 Fetch only properties that are NOT deleted
export async function getAllProperties(): Promise<Property[]> {
  const q = query(
    collection(db, "properties"),
    where("isDeleted", "==", false)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      price: data.price,
      location: data.location,
      area: data.area,
      type: data.type,
      status: data.status,
      tags: data.tags || [],
      description: data.description,
      images: data.images || [],
      isSold: data.isSold ?? data.status === "Sold",
      isDeleted: data.isDeleted ?? false,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
      updatedAt:
        data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : null,
    };
  });
}

// 🧍 Fetch property only if it's not deleted
export async function getPropertyById(id: string): Promise<Property | null> {
  const docRef = doc(db, "properties", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();

  // Exclude deleted properties
  if (data.isDeleted) return null;

  return {
    id: docSnap.id,
    title: data.title,
    price: data.price,
    location: data.location,
    area: data.area,
    type: data.type,
    status: data.status,
    tags: data.tags || [],
    description: data.description,
    images: data.images || [],
    isSold: data.isSold ?? data.status === "Sold",
    isDeleted: data.isDeleted ?? false,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : new Date().toISOString(),
    updatedAt:
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate().toISOString()
        : null,
  };
}

export async function markPropertyAsSold(id: string) {
  const docRef = doc(db, "properties", id);
  await updateDoc(docRef, {
    status: "Sold",
    isSold: true,
    updatedAt: serverTimestamp(),
  });
}

// ---------------------------------------------------leads------------------------------------------------------------------------

export async function addLead(lead: NewLeadInput) {
  return await addDoc(collection(db, "leads"), {
    ...lead,
    status: "New",
    createdAt: serverTimestamp(),
  });
}

export async function getLeads(): Promise<Lead[]> {
  const snapshot = await getDocs(
    query(collection(db, "leads"), orderBy("createdAt", "desc"))
  );

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      message: data.message ?? "",
      propertyId: data.propertyId ?? "",
      propertyTitle: data.propertyTitle ?? "",
      budgetRange: data.budgetRange ?? "",
      preferredContactMethod: data.preferredContactMethod ?? "",
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : null,
      status: (data.status as LeadStatus) ?? "New",
    };
  }) as Lead[];
}

export async function getLeadsByPropertyId(
  propertyId: string
): Promise<Lead[]> {
  const q = query(
    collection(db, "leads"),
    where("propertyId", "==", propertyId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      message: data.message ?? "",
      propertyId: data.propertyId ?? "",
      propertyTitle: data.propertyTitle ?? "",
      budgetRange: data.budgetRange ?? "",
      preferredContactMethod: data.preferredContactMethod ?? "",
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : null,
      status: (data.status as LeadStatus) ?? "New",
    };
  }) as Lead[];
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const leadRef = doc(db, "leads", leadId);
  await updateDoc(leadRef, { status });
}

// ----------------------------------------------------------contactLeads-------------------------------------------------------------------

// Add a contact us lead
export async function addContactLead(
  lead: Omit<ContactLead, "id" | "createdAt" | "status">
) {
  return await addDoc(collection(db, "contactLeads"), {
    ...lead,
    status: "New",
    createdAt: serverTimestamp(),
  });
}

// Get all contact us leads (most recent first)
export async function getContactLeads(): Promise<ContactLead[]> {
  const snapshot = await getDocs(
    query(collection(db, "contactLeads"), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      message: data.message ?? "",
      school: data.school ?? "",
      grade: data.grade ?? "",
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : null,
      status: (data.status as ContactLeadStatus) ?? "New",
    };
  });
}

// Update status (Responded/Converted)
export async function updateContactLeadStatus(
  leadId: string,
  status: ContactLeadStatus
) {
  const leadRef = doc(db, "contactLeads", leadId);
  await updateDoc(leadRef, { status });
}
