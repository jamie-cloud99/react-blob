import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getContacts, createContact } from "../contacts";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const [query, setQuery] = useState(q);
  useEffect(() => setQuery(q), [q]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div className="grid h-dvh grid-cols-12 gap-4">
        <div className="col-span-4 h-full">
          <div id="sidebar" className=" h-full bg-slate-50 px-4 py-5">
            <h1 className="mb-4 text-xl font-bold">React Router Contacts</h1>
            <div className="mb-4 flex items-center gap-2">
              <Form id="search-Form" role="search" className="">
                <input
                  id="q"
                  className={searching ? "loading" : ""}
                  aria-label="Search contacts"
                  placeholder="Search"
                  type="search"
                  name="q"
                  defaultValue={q}
                  value={query}
                  onChange={(event) => {
                    const isFirstSearch = q == null;
                    submit(event.currentTarget.form, {
                      replace: !isFirstSearch,
                    });
                  }}
                />
                <div id="search-spinner" aria-hidden hidden={!searching} />
                <div className="sr-only" aria-live="polite"></div>
              </Form>
              <Form method="post">
                <button
                  type="submit"
                  className="rounded-sm border border-solid border-blue-500 px-3 py-1.5"
                >
                  New
                </button>
              </Form>
            </div>
            <nav>
              {contacts.length ? (
                <ul className="space-y-2">
                  {contacts.map((contact) => (
                    <li key={contact.id}>
                      <NavLink
                        to={`/contacts/${contact.id}`}
                        className={({ isActive, isPending }) =>
                          isActive ? "active" : isPending ? "pending" : ""
                        }
                      >
                        {contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )}{" "}
                        {contact.favorite && <span>★</span>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No contacts</p>
              )}
            </nav>
          </div>
        </div>
        <div className="col-span-8 h-full">
          <div
            id="detail"
            className={`py-5 ${navigation.state === "loading" ? "loading" : ""}`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
