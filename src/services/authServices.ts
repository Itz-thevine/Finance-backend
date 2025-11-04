import { Account, Client } from "appwrite";

export const createPublicClient = () => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!);
  return new Account(client);
};

export const registerUser = async (email: string, password: string, name: string) => {
  const account = createPublicClient();
  const user = await account.create('unique()', email, password, name);
  const session = await account.createEmailPasswordSession(email, password)

  return {
    session,
    user,
  };
};

export const loginUser = async (email: string, password: string) => {
  const account = createPublicClient();
  const session = await account.createEmailPasswordSession(email, password);

  return {
    session
  };
};

export const getCurrentUser = async (jwt: string) => {
  const account = createPublicClient();
  account.client.setJWT(jwt);
  return await account.get();
};

export const logoutUser = async (jwt: string) => {
  const account = createPublicClient();
  account.client.setJWT(jwt);
  return await account.deleteSessions();
};
