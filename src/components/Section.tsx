import React from 'react';
import type { ContentElement, SectionContentBlock } from '../types/section';

interface SectionProps {
  headerTitle: string;
  content: SectionContentBlock[];
}

const Section: React.FC<SectionProps> = ({ headerTitle, content }) => {
  const renderContent = (element: ContentElement, elementIndex: number) => {
    switch (element.type) {
      case "text":
        return React.createElement(
          element.tag || 'p',
          { style: element.style, key: `${elementIndex}-text` },
          element.value
        );
      case "list":
        return React.createElement(
          element.listType || 'ul',
          { key: `${elementIndex}-list` },
          element.items.map((item, index) => (
            <li key={`${elementIndex}-item-${index}`}>{item.value}</li>
          ))
        );
      case "break":
        return <br key={`${elementIndex}-break`} />;
      case "horizontalRule":
        return <hr key={`${elementIndex}-hr`} />;
      default:
        return null;
    }
  };

  return (
    <div className="section">
      <h1 className="header_title">{headerTitle}</h1>
      <hr className="header_title_divider" />

      {content &&
        content.map((section, sectionIndex) => (
          <div key={sectionIndex} className="section_content">
            <h3 className="item_title">{section.sectionTitle}</h3>
            <div style={{ padding: "1.5em" }}>
              {section.content &&
                section.content.map((element, elementIndex) =>
                  renderContent(element, elementIndex)
                )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Section;
