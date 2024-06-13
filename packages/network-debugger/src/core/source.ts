import { RequestDetail } from "../common";
import { getMainProcess } from "./fork";

export const loadStackSource = (detail: RequestDetail) => {
  if (!detail.initiator) return;
  const { stack } = detail.initiator;
  if (!stack) return;

  const callFrames = stack.callFrames;
  const mainProcess = getMainProcess();
  callFrames.forEach((frame) => {
    const url = frame.url;
    if (!url.startsWith("file://")) {
      return;
    }

    mainProcess.sendFile(url.slice(7))
  });
};
