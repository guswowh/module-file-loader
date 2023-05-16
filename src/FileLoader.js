import React, { useRef } from 'react';
import { useUpLoader } from './hooks/useFileLoader';

const FileLoader = () => {
  const selectFileRef = useRef();
  const [attachmentsFormData, setChangeFileInputHandler, setPerFileRemoveButtonHandler, setAllFileRemoveButtonHandler] = useUpLoader(10485760)
  console.log(attachmentsFormData.getAll('files'))

  const handleUploadData = () => {
    // 인풋에 첨부되어 있는 파일 초기화 후 동작
    selectFileRef.current.value = "";
    selectFileRef.current.click();
  };

  return (
    <form>
      <label>첨부파일</label>
      <div>
        <input
          type="file"
          name="files"
          ref={selectFileRef}
          onChange={setChangeFileInputHandler}
          multiple
          style={{ display: "none" }}
        />
        <div>
          {
            attachmentsFormData.getAll('files').map((item, index) => (
              <div key={index}>
                <p>{item.name}</p>
                <button
                  className="removeButton"
                  type="button"
                  onClick={() => setPerFileRemoveButtonHandler(item)}
                >
                  삭제
                </button>
              </div>
            ))
          }
        </div>

        <button type="button" onClick={handleUploadData}>
          파일 선택
        </button>
        <button type="button" onClick={setAllFileRemoveButtonHandler}>
          전체 삭제
        </button>
      </div>
    </form>
  );
};

export default FileLoader;