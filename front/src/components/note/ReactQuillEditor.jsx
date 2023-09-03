// 引入富文本编辑器的样式文件
import 'react-quill/dist/quill.snow.css';
import { React, useState } from 'react';
import ReactQuill from 'react-quill';
import { PropTypes } from 'prop-types';

const ReactQuillEditor = ({defaultContent, onChangeRawContent}) => {
  const [value, setValue] = useState(defaultContent);

  //  delta: DeltaStatic, source: Sources, editor: ReactQuill.UnprivilegedEditor
  const handleChangeValue = (value) => {  // value: string
    onChangeRawContent(value);
    setValue(value);
  };

  return (
    <div className="react-quill-wrap">
      <div className="quill-editor-wrap">
        <ReactQuill theme="snow" value={value} onChange={handleChangeValue} />
      </div>
    </div>
  );
};

ReactQuillEditor.propTypes = {
  defaultContent: PropTypes.string.isRequired,
  onChangeRawContent: PropTypes.func.isRequired,
};

export default ReactQuillEditor;

