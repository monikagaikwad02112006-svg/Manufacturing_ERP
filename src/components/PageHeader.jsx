
import React from "react";
import "./PageHeader.css";

function PageHeader({
  title,
  subtitle,
  breadcrumb = [],
  actions = null,
}) {
  return (
    <div className="page-header">
      <div className="page-header-left">
        {breadcrumb.length > 0 && (
          <div className="page-header-breadcrumb">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "breadcrumb-current"
                      : "breadcrumb-item"
                  }
                >
                  {item}
                </span>

                {index < breadcrumb.length - 1 && (
                  <span className="breadcrumb-separator">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <h1 className="page-header-title">{title}</h1>

        {subtitle && (
          <p className="page-header-subtitle">{subtitle}</p>
        )}
      </div>

      {actions && (
        <div className="page-header-actions">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;

