interface Props {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: Props) {
  return (
    <div className="rounded-lg border bg-secondary p-3 text-left">
      <h3 className="mb-1 text-sm font-semibold text-secondary-foreground xs:text-base">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeatureCard;
