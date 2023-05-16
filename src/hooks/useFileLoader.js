import { useState } from 'react';

// maxSizePerFile는 바이트 코드로 전달
export const useUpLoader = (maxSizePerFile) => {
  const [attachmentsFormData, setAttachmentsFormData] = useState(new FormData());
  const [totalSizeInBytes, setTotalSizeInBytes] = useState(0);

  let preFileUnit = 0
  let sizeUnit = ""


  // input 엘리먼트의 onChange의 콜백함수로 바이너리를 attachmentsFormData에 할당한다.
  const setChangeFileInputHandler = (e) => {
    const newFilesList = [...e.target.files];
    let fileSize = 0;

    const newFormData = new FormData();
    const filesArray = Array.from(attachmentsFormData.getAll("files"));

    attachmentsFormData.forEach((value, key) => {
      newFormData.append(key, value);
    });

    // 업로드 파일들을 조건에 따라 할당한다.
    newFilesList.forEach((file) => {
      fileSize = file.size;

      // 업로드 파일의 중복을 배제한다.
      if (filesArray.some((prevFile) => prevFile.name === file.name)) {
        return;
      }

      // 용량이 초과된 파일을 배제한다.
      if (fileSize > maxSizePerFile) return;

      newFormData.append("files", file);
    });

    // state에 newFormData 할당
    setAttachmentsFormData(newFormData)

    // alert 메시지 조건부 처리
    if (maxSizePerFile < 1048576) {
      preFileUnit = maxSizePerFile / 1024
      sizeUnit = "KB"
    } else {
      preFileUnit = maxSizePerFile / (1024 * 1024)
      sizeUnit = "MB"
    }

    // 용량 초과로 하여 할당되지 않는 파일에 대한 메시지를 띄워준다.
    newFilesList.forEach((file) => {
      if (file.size > maxSizePerFile) {
        alert(`파일 ${file.name}의 크기는 ${preFileUnit.toFixed(2)} ${sizeUnit} 이하 입니다.`);
      }
    });
  };


  // 개별 파일 삭제
  const setPerFileRemoveButtonHandler = (filesItem) => {
    const updatedFormData = new FormData();
    console.log(filesItem.size);
    setTotalSizeInBytes(totalSizeInBytes - filesItem.size);

    attachmentsFormData.forEach((file, name) => {
      if (name === "files" && file.name === filesItem.name) {
        return;
      }
      updatedFormData.append(name, file);
    });

    setAttachmentsFormData(updatedFormData);
  };


  // 전체 파일 삭제
  const setAllFileRemoveButtonHandler = () => {
    setAttachmentsFormData(new FormData());
  }

  return [attachmentsFormData, setChangeFileInputHandler, setPerFileRemoveButtonHandler, setAllFileRemoveButtonHandler]
};
