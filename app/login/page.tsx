import { LoginForm } from "@/components/login-form";

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/";
  return (
    <div className="section-shell py-12">
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
