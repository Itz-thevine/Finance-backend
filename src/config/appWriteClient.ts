import { Client, Databases, Account, Messaging } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

const serverClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT!)
  .setProject(process.env.APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(serverClient);
const account = new Account(serverClient);
const messaging = new Messaging(serverClient);


const browserClient = async (session: string) => {
  const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setSession(session);

  return {
      get account() {
          return new Account(client);
      },

      get databases() {
          return new Databases(client);
      },
  };
};


export { serverClient, browserClient, databases, account, messaging };