"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <>
      <Authenticated>
        <UserButton />
        <div className="flex items-center justify-center min-h-svh flex-col">
          <h1 className="text-2xl font-bold">Hello apps/web</h1>
          <Button onClick={() => addUser()}>Add</Button>
          {users?.map((currentUser) => (
            <p key={currentUser._id}>{JSON.stringify(currentUser)}</p>
          ))}
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Mustbe signed in!</p>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}
