import React from "react";
import { Auth0Feature } from "./auth0-feature";

export const Auth0Features: React.FC = () => {
  const featuresList = [
    {
      title: "Jobs!!!",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum nisi aspernatur labore delectus cumque minus animi. Culpa voluptate mollitia quam, modi eum optio. A porro animi itaque asperiores perferendis.",
      resourceUrl: "/",
      icon: "https://cdn.auth0.com/blog/hello-auth0/identity-providers-logo.svg",
    },
    {
      title: "Profit!!!",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum nisi aspernatur labore delectus cumque minus animi. Culpa voluptate mollitia quam, modi eum optio. A porro animi itaque asperiores perferendis.",
      resourceUrl: "/",
      icon: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
    },
    {
      title: "More jobs!!!",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum nisi aspernatur labore delectus cumque minus animi. Culpa voluptate mollitia quam, modi eum optio. A porro animi itaque asperiores perferendis.",
      resourceUrl: "/",
      icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    },
    {
      title: "Did we mention more jobs!!!",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eum nisi aspernatur labore delectus cumque minus animi. Culpa voluptate mollitia quam, modi eum optio. A porro animi itaque asperiores perferendis.",
      resourceUrl: "/",
      icon: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
    },
  ];

  return (
    <div className="auth0-features">
      <h2 className="auth0-features__title">Explore Features</h2>
      <div className="auth0-features__grid">
        {featuresList.map((feature) => (
          <Auth0Feature
            key={feature.resourceUrl}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon={feature.icon}
          />
        ))}
      </div>
    </div>
  );
};
