import React, { ReactNode } from 'react';

type PropsWithChildren<P> = P & {
  children?: ReactNode;
};

type ChildrenProps = {
  user: any;
};

export default function DashboardHero(props: PropsWithChildren<ChildrenProps>) {
  return (
    <div className="it-hero-wrapper it-overlay it-dark it-bottom-overlapping-content">
      <div className="img-responsive-wrapper">
        <div className="img-responsive">
          <div className="img-wrapper">
            <img
              src="https://animals.sandiegozoo.org/sites/default/files/2016-08/animals_hero_mountains.jpg"
              title="image title"
              alt="imagealt"
            />
          </div>
        </div>
      </div>

      <div className="it-hero-text-wrapper bg-dark">
        <h3>Bentornato, {props.user.user.name}</h3>
      </div>
    </div>
  );
}
