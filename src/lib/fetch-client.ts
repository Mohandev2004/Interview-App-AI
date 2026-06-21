import { BASE_URL } from "@/lib/constants";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export class FetchError extends Error {
  response?: { status: number; data: unknown };

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "FetchError";
    if (status !== undefined) {
      this.response = { status, data };
    }
  }
}

export function isFetchError(error: unknown): error is FetchError {
  return error instanceof FetchError;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text.length ? text : null;
}

async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<{ data: T }> {
  const { body, headers, ...rest } = options;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const isFormData = body instanceof FormData;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: isFormData
      ? body
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  const data = await parseResponseBody(response);

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      const isAuthApi = path.startsWith("/api/auth/");
      const isPublicPage = ["/", "/signin", "/signup"].includes(
        window.location.pathname
      );

      // Avoid reload loops: profile/login 401 is expected on public auth pages.
      if (!isAuthApi && !isPublicPage) {
        window.location.href = "/signin";
      }
    } else if (response.status === 500) {
      console.error("Server error. Please try again later.");
    }

    throw new FetchError("Request failed", response.status, data);
  }

  return { data: data as T };
}

const fetchClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">
  ) => request<T>(path, { ...options, method: "POST", body }),

  delete: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
};

export default fetchClient;
