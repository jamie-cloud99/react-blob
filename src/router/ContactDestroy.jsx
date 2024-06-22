import { redirect } from "react-router-dom";
import { deleteContact } from "@/contacts";

export async function action({ params }) {
  throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
}

export function ErrorElement() {
  return <div>Oops! There was an error.</div>;
}
