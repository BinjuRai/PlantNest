import { Leaf, Eye } from "lucide-react";

export function MissionVision() {
  return (
    <section className="bg-green-50 dark:bg-green-950/30 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

        <Card
          icon={Leaf}
          title="Our Mission"
          text="To inspire people to live greener by providing healthy plants and expert guidance."
        />

        <Card
          icon={Eye}
          title="Our Vision"
          text="A world where every home and workspace feels alive and connected to nature."
        />
      </div>
    </section>
  );
}

const Card = ({ icon: Icon, title, text }) => (
  <div className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow">
    <Icon className="text-primary mb-4" />
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-light dark:text-muted-dark">{text}</p>
  </div>
);
