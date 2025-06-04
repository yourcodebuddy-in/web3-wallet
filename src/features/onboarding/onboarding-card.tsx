import React from "react";

interface Props {
  title: string;
  dsecription: React.ReactNode;
  children: React.ReactNode;
  icon: React.ReactNode;
}

function OnboardingCard({ title, dsecription, children, icon }: Props) {
  return (
    <div className="card">
      <section className="w-full p-5 sm:p-8 sm:px-10">
        <div className="flex flex-col gap-5">
          <div className="mx-auto w-fit rounded-lg bg-secondary p-4">
            {React.cloneElement(icon as React.ReactElement<HTMLElement>, {
              className: "xs:size-10 size-7",
            })}
          </div>
          <div>
            <h1 className="text-center font-bold text-foreground xs:text-2xl">{title}</h1>
            <p>{dsecription}</p>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

export default OnboardingCard;
