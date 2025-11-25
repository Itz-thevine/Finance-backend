import { ID, Query } from "node-appwrite";
import { account, browserClient, } from "../config/appWriteClient";
import { hashPassword } from "../utils/hash";


export const registerUser = async (email: string, password: string, name: string) => {
  const user = await account.create('unique()', email, password, name);
  if (!user) return

  const session = await account.createEmailPasswordSession(email, password);
  const { databases } = await browserClient(session.secret)
  
  const passwordHash = await hashPassword(password);
  const result = await databases.createDocument(
    process.env.DB_ID!,
    process.env.COLLECTION_USER!,
    ID.unique(),
    {
      userId: user.targets[0].userId,
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1],
      email: user.email,
      passwordHash: passwordHash,
      phoneNumber: user.phone,
      isActive: user.status,
    }
  );

  return {
    "userId": result.userId,
    "firstName": result.firstName,
    "lastName": result.lastName,
    "email": result.email,
    "phoneNumber": result.phoneNumber,
    "isActive": result.isActive,
    "createdAt": result.$createdAt,
    "updatedAt": result.$updatedAt,
    session: session.secret
  };
};

export const loginUser = async (email: string, password: string) => {
  const session = await account.createEmailPasswordSession(email, password);

  const {databases} = await browserClient(session.secret);
  const userList = await databases.listDocuments(
    process.env.DB_ID!,
    process.env.COLLECTION_USER!,
    [
      Query.equal('userId', [`${session.userId}`])
    ]
  );

  if (userList.documents.length === 0) {
    throw new Error('User not found');
  }

  const user = userList.documents[0];
  return {
    "userId": user.userId,
    "firstName": user.firstName,
    "lastName": user.lastName,
    "email": user.email,
    "phoneNumber": user.phoneNumber,
    "isActive": user.isActive,
    "createdAt": user.$createdAt,
    "updatedAt": user.$updatedAt,
    session: session.secret
  };
};

export const getCurrentUser = async (session: string) => {
  const { account, databases } = await browserClient(session);

  const currentUser = await account.get();
  const userList = await databases.listDocuments(
    process.env.DB_ID!,
    process.env.COLLECTION_USER!,
    [
      Query.equal('userId', [`${currentUser.$id}`])
    ]
  );

  if (userList.documents.length === 0) {
    throw new Error('User not found');
  }

  const user = userList.documents[0];
  
  return {
    "userId": user.userId,
    "firstName": user.firstName,
    "lastName": user.lastName,
    "email": user.email,
    "phoneNumber": user.phoneNumber,
    "isActive": user.isActive,
    "createdAt": user.$createdAt,
    "updatedAt": user.$updatedAt
  };
};

export const logoutUser = async (session: string) => {
  const {account} = await browserClient(session);
  return await account.deleteSession('current');
};
