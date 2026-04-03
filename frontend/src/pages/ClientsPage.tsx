import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";

interface Client {
  id: number;
  first_name: string | null;
  last_name: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  email: string | null;
  phone?: string | null;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string | null;
  mmn: string | null;
  date_of_birth?: string | null;
  phone_verified: boolean;
  address_verified: boolean;
  dob_verified: boolean;
  ip_geolocation_performed: boolean;
  ip_geolocation_results: string | null;
  notes?: string | null;
}

// Matches backend ClientCreate
type ClientCreateForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  address_1: string;
  address_2?: string;
  city: string;
  province: string;
  country: string;
  account_no: number;
  expiry: number;
  cvv: number;
  IP: string;
  mmn: string;
  notes?: string;
};

const fetchClients = async (): Promise<Client[]> => {
  const { data } = await axios.get<Client[]>("/api/v1/clients/");
  return data;
};

const createClient = async (form: ClientCreateForm): Promise<Client> => {
  const payload = {
    ...form,
    phone_verified: false,
    address_verified: false,
    dob_verified: false,
    ip_geolocation_performed: false,
    ip_geolocation_results: "",
  };

  const { data } = await axios.post<Client>("/api/v1/clients/", payload);
  return data;
};

const ClientsPage: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ClientCreateForm>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      date_of_birth: "",
      address_1: "",
      address_2: "",
      city: "",
      province: "",
      country: "",
      account_no: 0,
      expiry: 0,
      cvv: 0,
      IP: "",
      mmn: "",
      notes: "",
    },
  });

  const {
    mutateAsync: addClient,
    error: createError,
  } = useMutation<Client, Error, ClientCreateForm>({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      reset();
    },
  });

  const onSubmit = async (values: ClientCreateForm) => {
    await addClient(values);
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm text-slate-400">
        Loading clients…
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-sm text-red-400">
        Failed to load clients.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Big marker so you KNOW this page is rendering */}
      <div className="mb-2 text-center text-xl font-bold text-indigo-400">
        CLIENTS PAGE
      </div>

      {/* Header */}
      <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-xs text-slate-400">
            {clients && clients.length > 0
              ? `${clients.length} client${clients.length === 1 ? "" : "s"} in the system.`
              : "No clients yet. Add your first one below."}
          </p>
        </div>
      </header>

      {/* Create form */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-100">
          Add new client
        </h2>
        <form
          className="grid gap-3 md:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* first/last */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              First name
            </label>
            <input
              {...register("first_name", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Last name
            </label>
            <input
              {...register("last_name", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* email/phone */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Phone
            </label>
            <input
              {...register("phone")}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* address */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Address line 1
            </label>
            <input
              {...register("address_1", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Address line 2
            </label>
            <input
              {...register("address_2")}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* city/province/country */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              City
            </label>
            <input
              {...register("city", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Province
            </label>
            <input
              {...register("province", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Country
            </label>
            <input
              {...register("country", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Date of birth
            </label>
            <input
              type="date"
              {...register("date_of_birth")}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* card info */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Card number
            </label>
            <input
              type="number"
              {...register("account_no", { required: true, valueAsNumber: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Expiry (e.g. 1228)
            </label>
            <input
              type="number"
              {...register("expiry", { required: true, valueAsNumber: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              CVV
            </label>
            <input
              type="number"
              {...register("cvv", { required: true, valueAsNumber: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* IP / mmn */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              IP
            </label>
            <input
              {...register("IP", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Mother&apos;s maiden name
            </label>
            <input
              {...register("mmn", { required: true })}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* notes */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Notes
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between pt-2">
            {createError && (
              <span className="text-xs text-red-400">
                Failed to create client.
              </span>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save client"}
            </button>
          </div>
        </form>
      </section>

      {/* Client list */}
      {clients && clients.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const fullName =
    [client.first_name, client.last_name].filter(Boolean).join(" ") ||
    "Unnamed client";

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm hover:shadow-lg hover:border-indigo-500/70 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold leading-tight">{fullName}</h2>
          {client.email && (
            <p className="mt-1 text-xs text-slate-400">{client.email}</p>
          )}
          {client.phone && (
            <p className="text-xs text-slate-400">{client.phone}</p>
          )}
        </div>
        <span className="text-[10px] rounded-full border border-slate-700 px-2 py-0.5 text-slate-400">
          ID {client.id}
        </span>
      </div>

      {client.address_1 && (
        <p className="mt-3 text-xs text-slate-400">
          Address Line 1:{" "}
          <span className="text-slate-100">{client.address_1}</span>
        </p>
      )}

      {client.city && (
        <p className="mt-1 text-xs text-slate-400">
          City: <span className="text-slate-100">{client.city}</span>
        </p>
      )}

      {client.province && (
        <p className="mt-1 text-xs text-slate-400">
          Province: <span className="text-slate-100">{client.province}</span>
        </p>
      )}

      {client.country && (
        <p className="mt-1 text-xs text-slate-400">
          Country: <span className="text-slate-100">{client.country}</span>
        </p>
      )}

      {client.date_of_birth && (
        <p className="mt-3 text-xs text-slate-400">
          DOB:{" "}
          <span className="text-slate-100">{client.date_of_birth}</span>
        </p>
      )}

      {client.notes && (
        <p className="mt-3 line-clamp-3 text-xs text-slate-300">
          {client.notes}
        </p>
      )}
    </div>
  );
};

export default ClientsPage;