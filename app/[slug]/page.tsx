import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLanding } from "@/components/ServiceLanding";
import { getLanding, landings } from "@/lib/landings";
import "./landing.css";

type LandingPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => landings.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const landing = getLanding((await params).slug);
  return landing ? { title: landing.metaTitle, description: landing.metaDescription } : {};
}

export default async function LandingPage({ params }: LandingPageProps) {
  const landing = getLanding((await params).slug);
  if (!landing) notFound();
  return <ServiceLanding landing={landing} />;
}
