import { cn } from "@/lib/utils";
import { Shield, Users, Rocket } from "lucide-react";
import {
  type FeatureItem,
  PricingTable,
  PricingTableBody,
  PricingTableHeader,
  PricingTableHead,
  PricingTableRow,
  PricingTableCell,
  PricingTablePlan,
} from "@/components/ui/pricing-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-20">
      <div
        className={cn(
          "absolute inset-0 -z-10 size-full max-h-102 opacity-50",
          "mask-[radial-gradient(ellipse_at_center,var(--background),transparent)]",
        )}
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1
          className={cn(
            "text-3xl leading-tight font-bold text-balance sm:text-5xl",
          )}
        >
          {"Lighting Fast "}
          <i className="bg-linear-to-r from-violet-500 via-violet-400 to-fuchsia-400 bg-clip-text font-serif font-extrabold text-transparent drop-shadow-[0_0_18px_rgba(167,139,250,0.55)]">
            {"Design Systems"}
          </i>
          <br />
          {"with "}
          <i className="bg-linear-to-r from-violet-500 via-fuchsia-400 to-indigo-400 bg-clip-text font-serif font-extrabold text-transparent drop-shadow-[0_0_22px_rgba(167,139,250,0.75)]">
            {"Figr Identity"}
          </i>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-pretty">
          Deploy Consistent Designs Faster With Figr’s AI solutions.
        </p>
      </div>
      <Default />
    </div>
  );
}

function Default() {
  return (
    <PricingTable className="mx-auto my-5 max-w-5xl">
      <PricingTableHeader>
        <PricingTableRow>
          <th />
          <th className="p-1">
            <PricingTablePlan
              name="Starter"
              badge="For Small Clinics"
              price="₹9,999/mo"
              compareAt="₹14,999/mo"
              icon={Shield}
            >
              <Button variant="outline" className="w-full rounded-lg" size="lg">
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
          <th className="p-1">
            <PricingTablePlan
              name="Growth"
              badge="For Growing Teams"
              price="₹14,999/mo"
              compareAt="₹19,999/mo"
              icon={Users}
              className="after:pointer-events-none after:absolute after:-inset-0.5 after:rounded-[inherit] after:bg-linear-to-b after:from-violet-500/15 after:to-transparent after:blur-[2px]"
            >
              <Button
                className="w-full rounded-lg border-accent bg-accent text-white hover:bg-accent/80"
                size="lg"
              >
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
          <th className="p-1">
            <PricingTablePlan
              name="Pro"
              badge="For Large Teams"
              price="₹27,999/mo"
              compareAt="₹34,999/mo"
              icon={Rocket}
            >
              <Button variant="outline" className="w-full rounded-lg" size="lg">
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
        </PricingTableRow>
      </PricingTableHeader>
      <PricingTableBody>
        {FEATURES.map((feature, index) => (
          <PricingTableRow key={index}>
            <PricingTableHead>{feature.label}</PricingTableHead>
            {feature.values.map((value, index) => (
              <PricingTableCell key={index}>{value}</PricingTableCell>
            ))}
          </PricingTableRow>
        ))}
      </PricingTableBody>
    </PricingTable>
  );
}

export const FEATURES: FeatureItem[] = [
  {
    label: "AI Call Handling",
    values: [true, true, true],
  },
  {
    label: "Appointment Booking",
    values: [true, true, true],
  },
  {
    label: "800 Monthly Minutes",
    values: ["800 minutes", "1600 minutes", "3200 minutes"],
  },
  {
    label: "Missed Call Callback",
    values: [false, true, true],
  },
  {
    label: "Reminder via Email",
    values: [true, true, true],
  },
  {
    label: "Reminder via WhatsApp",
    values: [false, true, true],
  },
  {
    label: "Patient Reminder Call",
    values: [false, false, true],
  },
  {
    label: "Custom AI Scripts",
    values: [false, false, true],
  },
];
