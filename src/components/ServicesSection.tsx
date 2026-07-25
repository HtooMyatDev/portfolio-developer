import Header from "@/components/Header";
import Service from "@/components/Service";

const services = [
  {
    title: "01 / Internal tools",
    subtitle: "Internal tools & dashboards",
    description:
      "Replace scattered spreadsheets with a single system your team actually wants to use. Role-based access built in from day one — the right people see the right things, nothing more.",
  },
  {
    title: "02 / approval-workflows",
    subtitle: "Approval workflows",
    description:
      "Multi-stage sign-off chains — request, review, approve — that route automatically instead of living in email threads and getting lost.",
  },
  {
    title: "03 / forms-and-data",
    subtitle: "Custom forms & data intake",
    description:
      "Forms that validate, store, and report cleanly. No more copy-pasting from paper, chasing missing fields, or fixing bad data by hand.",
  },
  {
    title: "04 / notifications",
    subtitle: "Automated notifications",
    description:
      "Your team knows the moment something needs their attention — alerts wired directly into the workflow, not a status page nobody checks.",
  },
];

const ServicesSection = () => (
  <div
    id="services"
    className="mt-24 mb-24 pb-6 flex flex-col gap-8 scroll-mt-32"
  >
    <Header title="What i can build for you" subtitle="for business owners" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {services.map((service) => (
        <Service key={service.title} {...service} />
      ))}
    </div>
  </div>
);

export default ServicesSection;
