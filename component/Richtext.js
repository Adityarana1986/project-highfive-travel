import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

function RichTextComponent({ content }) {
  return <div>{documentToReactComponents(content)}</div>;
}

export default RichTextComponent;